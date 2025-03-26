import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
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
import { RcFile } from "antd/es/upload";
const backgrounds = [0, 1, 2, 3, 4, 5, 6, 7];
export interface CopySetting {
  title: string;
  bgStyle: number;
  bgColor: number;
  fontStyle: string;
  fontDepth: number;
  fontColor: number;
  fontFamily: string;
  fontColumn: number;
  marginVertical: number;
  marginHorizontal: number;
}
const App: React.FC = () => {
  const [form] = Form.useForm<CopySetting>();
  const [fonts, setFonts] = useState<Array<{ value: string; label: string }>>(
    []
  );
  const iframe = useRef<HTMLIFrameElement>(null);
  const printContent = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<CopySetting>({
    title: "人民日报金句摘抄",
    bgStyle: 1,
    bgColor: 3,
    fontStyle: "3",
    fontDepth: 0,
    fontColor: 2,
    fontFamily: "",
    fontColumn: 0,
    marginVertical: 0,
    marginHorizontal: 0,
  });
  const [content, setContent] = useState(`心若向阳，则无惧悲伤。别在该努力的年纪选择安逸时光，别到时候家里人需要你的时候你一无所有。当下这一刻起，拒绝内耗，做行动的巨人。不跟生活认输，不向岁月低头。努力是一件特别需要沉下心来，长久坚持的事。每次归途，都是为了更好出发，每次停歇，都是为了积攒力量。生活没有标准答案，每个人都有自己的注脚。拥抱世界，才能拥抱明天；携手共进，才能行稳致远。心的通透，不是因为没有杂念，而在于明白取舍。当处于人生低谷，每一步都是上坡路。山再高，往上攀，总能登顶；路再长，走下去，定能到达。书痴者文必工，艺痴者技必良；有恒者不声张，功成时美名扬。文物不是静止的存在，从中可以听见鼓角铮鸣，看见波澜壮阔，感受历史与文化的脉动。心可以碎，手不能停。该干什么干什么，在崩溃中前行，才是一个成年人的素养。每错的一道题，每丢的一分，都是为了遇见对的人；而每对的一道题，每得的一分，都是为了遇见更好的自己。努力的过程本就是孤岛，但最后抵达的一定是充满生机的彼岸。泰山不让土壤，故能成其大；河海不择细流，故能就其深。有许多时刻，你惊心动魄，而世界一无所知；你翻山越岭，而大地寂静无声。昭昭若日月之明，离离如星辰之行。成年人的妥协：一半是理解，一半是算了。年华似水，匆匆流淌，所有人终将老去，但总有人正年轻。历史，在奋斗中铭刻；未来，在奋进中开拓。水到绝境是风景，人到绝境是重生。百舸争流，奋楫者先；中流击水，勇进者胜。一生很短，不过是朝暮与春秋；一生所求，不过是温暖与相伴。察势者明，趋势者智，驭势者独步天下。每个优秀的人都有一段至暗的时光，越是昏暗，火焰燃烧的光芒才越耀眼。四海升腾，这边风景多锦绣；九州激荡，乘势而上开山河。逆水行舟，一蒿不可放缓；滴水穿石，一滴不可弃滞。流量不应该是利益的代名词，更应该是正能量的扩音器。时间标注新时代的方位，实践刻录新征程的步履。向历史寻经验，向历史求规律，向历史探未来。不以规矩，不能成方圆。赶趟别人没走过的路，才能收获别样的风景；敢拓前人没垦过的荒，才能开辟新的空间。真理的波涛喷涌而出就奔流不息，理想的火焰一经点燃就不会熄灭。在机遇面前主动出击，不犹豫、不观望；在困难面前迎难而上，不推诿、不逃避；在风险面前积极应对，不畏缩、不躲闪。在你坚持不住的时候，记得告诉自己，想一千次，不如去做一次。一些看似不起眼的点滴努力，会在日后开花结果，会在某一刻，突然让你看到坚持的意义。生活是公平的，它对每一个人都是公平的。把懒惰放一边，把丧气的话收一收，把积极性提一提，把矫情的心放一放。生活目标明确的人，每一天都朝着理想迈进一步；做一天和尚撞一天钟的人，忙忙碌碌却不见成果。不想认命，就去拼命。不是所有的鲜花都盛开在春天，不是所有的河流都流向大海。人生最好的七种状态：扬在脸上的自信，长在心底的善良，丰盈在大脑里的知识，融进血里的骨气，刻进生命里的坚强，挂在嘴角的微笑，藏在心里的梦想。有人说人生就是一场场告别，但也不全然都是忧伤。平和地接纳，不屈地奋斗，坚定地前进，如一泓清泉，静水流深。择一事终一生的执着专注；干一行钻一行的精益求精；偏毫厘不敢安的一丝不苟；千万锤成一器的卓越追求。别在吃苦的年纪选择安逸，唯有努力奋斗，才能有赢的可能。记忆的坐标有多清晰，前进的脚步就有多么坚定。时间酿酒，余味成花。时间之河川流不息，每一代青年都有自己的际遇和机缘，都要在自己所处的时代条件下谋划人生、创造历史。一代人有一代人的长征，一代人有一代人的担当。勇于担苦、担难、担重、担险，在机遇面前主动出击，在困难面前迎难而上，在风险面前积极应对。心怀“国之大者”，不断增强做中国人的志气、骨气、底气。做起而行之的行动者，当攻坚克难的奋斗者，在摸爬滚打中增长才干，在艰苦历练中积累经验。前进道路上，我们要葆有愚公移山的志气、滴水穿石的毅力，不驰于空想，不骛于虚声，勇立潮头、奋勇搏击。要做艰苦奋斗、无私奉献的模范，带头站稳人民立场，脚踏实地、求真务实，吃苦在前、享受在后。奋斗精神，是“为有牺牲多壮志”，是“万水千山只等闲”，是“团结起来、振兴中华”，是“功成不必在我，功成必定有我”。正因为有奋斗精神的强大牵引，所以有了“当惊世界殊”的发展成就，有了“此生无悔入华夏”的深情告白，有了“平视世界”的从容自信。“正家而天下定矣”。家庭文明是社会文明高塔的“累土”，千千万万个家庭的家风好，社会风气才有好的基础。天地一体，乘组一心。一个人的努力是加法，一个团队的努力是乘法。老行当里流淌着传统文化的基因，传统技艺的形成与沿革，不在一朝一夕，需要铢积寸累的世代积累。无论是千磨万砺中的坚韧、一针一线里的静气，还是修修补补的勤俭、择一行终一生的匠心，都凝结着中国人的生活智慧和朴素的人生哲理。春节、清明、端午、中秋，这些中国节，很诗意很灵性很国风，一提及就会牵出国人的万千乡愁。汉语经历数千年的演变，丰富而精练，博大而精微。哪怕是一个字、一个标点，也能担起表情达意的重任。大道之行，壮阔无垠；大道如砥，行者无疆。“夯实‘绿色家底’，留下‘生态银行’”，在山海之间奏响的绿色发展乐章，正成为高质量发展的强音。“燃”起来的，不仅是山里娃的自强不息，还有无数人汇聚起来的巨大力量。“一块（桨）板，串起的是人与运动，更是人与自然”“陆冲时，把节奏交给直觉，专心感受轮子在柏油路上的震动和衣角的风”。“出门水泥路、抬脚上客车”“班车通到家门口，上学看病不用愁”。“正如中国人喜欢茶而比利时人喜爱啤酒一样，茶的含蓄内敛和酒的热烈奔放代表了品味生命、解读世界的两种不同方式。但是，茶和酒并不是不可兼容的，既可以酒逢知己千杯少，也可以品茶品味品人生”。科技成果转化在加速推进。仰望浩瀚寰宇，“嫦娥”奔月、“天问”落火、“羲和”探日，中华民族对宇宙的浪漫遥想照进现实。法与时转则治，治与世宜则有功。质量既是产出来的，也是管出来的，同时也是市场竞争出来的。春种秋收，大地流金。有人说，以农业为基础孕育的中华文明，她的底色丰富多彩，但一定少不了秋收季节的这一抹金黄。路漫漫，且徐行，友好的骑行环境离不开城市心态的转变，离不开对“慢生活”的包容。征途在星辰大海，潮涌于壮阔山河。一竿翠竹撑起一县经济，一片叶子富了一方百姓，一颗果子撑起一片产业。你贡献给世界的如此深奥，懂的人不多；你奉献给祖国的如此纯真，我们都明白。新征程上，仍然有新的“雪山”“草地”等待我们去跨越，有新的“娄山关”“腊子口”等待我们去攻克。如大潮奔涌，如细雨润泽，今天，创新要素正在中国每一寸土地上汩汩流淌。行进在大道上的中国，是一个充满生机活力的“梦工厂”。网上有个提问：“一个人最重要的能力是什么？”一个高赞回答是：“管理情绪的能力，要压得住火、沉得住气”。昨天的太阳，晒不干今天的衣服。依赖别人得到糖果或许很简单，但你得到的永远只是属于别人的糖果。一个人只有想得够深入、看得够透彻，才能走得够长远。每一个求独立求自我的女性，也有几分木兰模样，从柴米油盐到诗与远方，她们要忠于自己实现自己，也要走过一个女人她自己史诗般的远征。善良容易，难得的是，大难临头还选择善良。在任何境遇下，别轻易放弃，你拉自己一把，也就给别人机会来拉你一把。“先贤以典籍为灯，照亮文化之路；今人借典籍作舟，畅游文明之河。”面对这个问题，就让我们用册册典籍为“是以中国”作答。我不怕千万人阻挡，只怕自己投降。你如果在读书中寻出一种趣味，你将来抵抗引诱的能力比别人定要大些。劳动能传递以辛勤劳动为荣、以好逸恶劳为耻的价值观；劳以增智，劳动有助于启发思考科学原理、探索事物奥秘；劳以强体，动动手、流流汗，强健了体魄、增强了体能；劳以育美，发挥聪明才智去设计创造，本身就是在提高美育素养。榜样是看得见的哲理，典型是鲜活的价值引领。少年没有乌托邦，心有远方自明朗。路遥而不坠其志，行远而不改初衷。登高而不忘俯低，困苦或许是生命的本色，但夜色再深也有被光撕裂的那一刻。于高山之巅，方见大河奔涌；于群峰之上，便觉长风浩荡。青年如初春，如朝日，如百卉之萌动，如利刃之新发于硎，人生最可宝贵之时期也。奋斗是青春最亮丽的底色，行动是青年最有效的磨砺。不忘初心，青春朝气永在；志在千秋，百年恰是少年。青春是失败后倔强地想要再来一次的勇气，是就算看不到希望，咬紧牙关不曾放弃。`);
  const [useFontFamily, setUseFontFamily] = useState(true);
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
  const uploadFont = async (file:RcFile) => {
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
    return fontFamily;
  }
  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    accept: "ttc,ttf,otf",
    
    beforeUpload: async (_,list) => {
      
      const families = [];
      for (const file of list) {
        const fontFamily = await uploadFont(file)
        if(fontFamily) {
          families.push(fontFamily)
        }
      }
      setFonts([...fonts, ...families.map((fontFamily)=> ({ value: fontFamily, label: fontFamily }))]);
      return false;
    },
  };

  const switchBgStyleToString = (bgStyle: number) => {
    switch (bgStyle) {
      case 0:
        return "米回格";
      case 1:
        return "田字格";
      case 2:
        return "米字格";
      case 3:
        return "米回格2";
      case 4:
        return "回宫格";
      case 5:
        return "蛋格";
      case 6:
        return "九宫格";
      default:
        return "方格";
    }
  };

  const switchFontStyleToString = (fontStyle: string) => {
    switch (fontStyle) {
      case "0":
        return "全描";
      case "1":
        return "半描";
      case "2":
        return "不描";
      case "3":
        return "常规";
      case "4":
        return "隔行";
      case "6":
        return "笔顺";
      default:
        return "常规灰度";
    }
  };
  const print = () => {
    if (iframe.current && printContent.current) {
      const win = iframe.current.contentWindow;
      if (!win) {
        return;
      }
      // const content = printContent.current.innerHTML;
      const fontFamily = useFontFamily ? config.fontFamily : "";
      const documentTitle = `${fontFamily}${config.title}-${switchBgStyleToString(
        config.bgStyle
      )}-${switchFontStyleToString(config.fontStyle)}`;
      // const originTitle = document.title;

      document.title = documentTitle;
      const content = renderToString(
        <Print
          {...config}
          useFontFamily={useFontFamily}
          copyBook={copyBook}
        ></Print>
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
      // setTimeout(() => {
      //   document.title = originTitle
      // }, 2000);
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
        <Button block onClick={print} type="primary">
          打印字帖
        </Button>
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
            <Input
              addonBefore={config.fontFamily}
              defaultValue="字帖"
              addonAfter={
                <Checkbox
                  checked={useFontFamily}
                  onChange={(e) => {
                    setUseFontFamily(e.target.checked);
                  }}
                >
                  {" "}
                  是否使用字体名称{" "}
                </Checkbox>
              }
            />
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
                { value: "5", label: "常规灰度" },
                { value: "6", label: "笔顺" },
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
          <Form.Item label="上边距：" name="marginVertical">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="左边距：" name="marginHorizontal">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Splitter.Panel>
      <Splitter.Panel min={800}>
        <Preview
          {...config}
          useFontFamily={useFontFamily}
          copyBook={copyBook}
          content={content}
        ></Preview>

        <iframe ref={iframe} style={{ visibility: "hidden" }}></iframe>
        <div ref={printContent}></div>
      </Splitter.Panel>
    </Splitter>
  );
};

export default App;
