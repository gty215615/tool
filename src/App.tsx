import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Splitter,
  Upload,
  UploadProps,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Preview from "./Preview";
import localforage from "localforage";
import Print from "./Print";
import useHandle from "./hooks/useHandle";
import { renderToString } from "react-dom/server";
const backgrounds = [0, 1, 2, 3, 4, 5, 6, 7];
export interface CopySetting {
  title:string;
  bgStyle: number;
  bgColor: number;
  fontStyle: string;
  fontDepth: number;
  fontColor: number;
  fontFamily: string;
  fontColumn: number;
}
const App: React.FC = () => {
  const [form] = Form.useForm<CopySetting>();
  const [fonts, setFonts] = useState<Array<{ value: string; label: string }>>(
    []
  );
  const iframe = useRef<HTMLIFrameElement>(null);
  const printContent = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<CopySetting>({
    title:"字帖",
    bgStyle: 0,
    bgColor: 1,
    fontStyle: "0",
    fontDepth: 0,
    fontColor: 3,
    fontFamily: "Itner",
    fontColumn: 0,
  });
  const [content, setContent] = useState(`如梦令是宋代词牌名`);
  const { copyBook } = useHandle(content, config.fontStyle);
  useEffect(() => {
    readyFont();
  }, []);

  const readyFont = async () => {
    const fontFamilies: string[] | null = await localforage.getItem(
      "fontFamilies"
    );
    if (fontFamilies != null) {
      const win = iframe.current?.contentWindow;
      if (!win) {
        return;
      }
      for (const fontFamily of fontFamilies) {
        const data: ArrayBuffer | null = await localforage.getItem(fontFamily);
        if (data != null) {
          const fontFace = new FontFace(fontFamily, data);
          document.fonts.add(fontFace);
          win.document.fonts.add(fontFace);
        }
      }
    }
    document.fonts.ready.then(function () {
      const options: Array<{ value: string; label: string }> = [];
      const hash = new Set<string>();
      document.fonts.forEach((font) => {
        if (hash.has(font.family)) {
          return;
        }
        hash.add(font.family);
        options.push({
          value: font.family,
          label: font.family,
        });
      });

      setFonts(options);
    });
  };

  const onFormLayoutChange = (setting: CopySetting) => {
    setConfig({
      ...config,
      ...setting,
    });
  };

  const data = backgrounds.map((_, index) => {
    return {
      value: index,
      label: (
        <Flex gap="small" justify="center" align="center" vertical>
          <img
            src={`svg/bg${index}2.svg`}
            alt="米回格"
            title="米回格"
            width="35"
          />
        </Flex>
      ),
    };
  });
  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: "ttc,ttf,otf",
    beforeUpload: async (file) => {
      const target = await file.arrayBuffer();
      await localforage.setItem("fonts", ["1", "2"]);
      let fontFamilies: string[] | null = await localforage.getItem(
        "fontFamilies"
      );
      if (fontFamilies == null) {
        fontFamilies = [];
      }

      const names = file.name.split(".");
      names.pop();
      const fontFamily = names.join(".");
      if (fontFamilies.includes(fontFamily)) {
        return;
      }
      fontFamilies.push(fontFamily);
      localforage.setItem("fontFamilies", fontFamilies);
      localforage.setItem(fontFamily, target);
      const fontFace = new FontFace(fontFamily, target);
      const win = iframe.current?.contentWindow;
      if (win) {
        win.document.fonts.add(fontFace);
      }
      document.fonts.add(fontFace);
      setFonts([...fonts, { value: fontFamily, label: fontFamily }]);
      return false;
    },
  };

  const print = () => {
    if (iframe.current && printContent.current) {
      const win = iframe.current.contentWindow;
      if (!win) {
        return;
      }
      // const content = printContent.current.innerHTML;

      const content = renderToString(
        <Print {...config} copyBook={copyBook}></Print>
      );
      win.document.write(
        '<!DOCTYPE html><html lang="zh"><head>' +
          '<meta http-equiv="content-type" content="text/html; charset=UTF-8">' +
          '<meta charset="utf-8">' +
          '<meta name="viewport" content="width=device-width,initial-scale=1.0">' +
          "<title>字帖</title>" +
          '<link rel="stylesheet" href="/print.css" type="text/css"/>' +
          '</head><body onload="setTimeout(()=>{window.print();window.close();}, 500);">' +
          content +
          "</body>" +
          "</html>"
      );
      win.document.close();
    }
  };
  return (
    <Splitter
      style={{
        width: "100vw",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Splitter.Panel defaultSize="40%" min={600} max="70%">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          initialValues={config}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="字帖标题：" name="title">
            <Input defaultValue="字帖" />
          </Form.Item>
          <Form.Item label="背景格样式：" name="bgStyle">
            <Radio.Group options={data} />
          </Form.Item>

          <Form.Item label="背景格颜色：" name="bgColor">
            <Radio.Group
              options={[
                {
                  value: 1,
                  label: (
                    <Flex gap="small" justify="center" align="center" vertical>
                      <span style={{ color: "green" }}>绿色</span>
                    </Flex>
                  ),
                },
                {
                  value: 2,
                  label: (
                    <Flex gap="small" justify="center" align="center" vertical>
                      <span style={{ color: "black" }}>黑色</span>
                    </Flex>
                  ),
                },
                {
                  value: 3,
                  label: (
                    <Flex gap="small" justify="center" align="center" vertical>
                      <span style={{ color: "red" }}>红色</span>
                    </Flex>
                  ),
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="描字类型：" name="fontStyle">
            <Select
              options={[
                { value: "0", label: "全描" },
                { value: "1", label: "半描" },
                { value: "2", label: "不描" },
                { value: "3", label: "常规" },
                { value: "4", label: "隔行" },
              ]}
            />
          </Form.Item>
          <Form.Item label="描字颜色深浅：" name="fontDepth">
            <InputNumber style={{ width: "100%" }} min={1} max={9} />
          </Form.Item>
          <Form.Item label="文字颜色：" name="fontColor">
            <Radio.Group
              options={[
                {
                  value: 1,
                  label: (
                    <Flex gap="small" justify="center" align="center" vertical>
                      <span style={{ color: "green" }}>绿色</span>
                    </Flex>
                  ),
                },
                {
                  value: 2,
                  label: (
                    <Flex gap="small" justify="center" align="center" vertical>
                      <span style={{ color: "black" }}>黑色</span>
                    </Flex>
                  ),
                },
                {
                  value: 3,
                  label: (
                    <Flex gap="small" justify="center" align="center" vertical>
                      <span style={{ color: "red" }}>红色</span>
                    </Flex>
                  ),
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="字体：" name="fontFamily">
            <Select options={fonts} />
          </Form.Item>
          <Form.Item label="自定义字体：">
            <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽上传</p>
              <p className="ant-upload-hint">支持上传ttf、ttc,otf</p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item label="输入字帖文字：">
            <TextArea
              rows={4}
              showCount
              onBlur={(e) => {
                setContent(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="每字行数：" name="fontColumn">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button block onClick={print} type="primary">
              打印字帖
            </Button>
          </Form.Item>
        </Form>
      </Splitter.Panel>
      <Splitter.Panel min={800}>
        <Preview {...config} copyBook={copyBook} content={content}></Preview>

        <iframe ref={iframe} style={{ visibility: "hidden" }}></iframe>
        <div ref={printContent}></div>
      </Splitter.Panel>
    </Splitter>
  );
};

export default App;
