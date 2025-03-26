/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from "react";
import "./App.css";
import { CopySetting } from "./App";
import PageFooter from "./PageFooter";
import { FixedSizeList as List } from "react-window";
import { CopyPage, PageRowCount, RowFontCount } from "./hooks/useHandle";
import PageHeader from "./PageHeader";

const Preview: FC<
  CopySetting & {
    content: string;
    copyBook: CopyPage[];
    useFontFamily:boolean
  }
> = (props) => {
  const { copyBook } = props;
  const getColor = (index: number,force = false) => {
    let r;
    let g;

    let b;
    let p = 9;
    if (props.fontStyle === "0" || props.fontStyle === "1" || props.fontStyle === '5') {
      // 全描
      const pos = index % RowFontCount;
      p = pos == 0 ? p : 3;
      p = props.fontStyle === '5' && !force ? 3 : p;
  
      
      if (props.fontColor === 1) {
        r = Math.round(p * -23 + 255);
        g = 255;
        b = Math.round(p * -23 + 255);
      }
      if (props.fontColor === 2) {
        r = Math.round(p * -17 + 255);
        g = Math.round(p * -17 + 255);
        b = Math.round(p * -17 + 255);
      }
      if (props.fontColor === 3) {
        r = 255;
        g = Math.round(p * -20 + 255);
        b = Math.round(p * -20 + 255);
      }
      return `rgb(${r},${g},${b})`;
    } else {
      if (props.fontColor === 1) {
        r = Math.round(p * -23 + 255);
        g = 255;
        b = Math.round(p * -23 + 255);
      }
      if (props.fontColor === 2) {
        r = Math.round(p * -17 + 255);
        g = Math.round(p * -17 + 255);
        b = Math.round(p * -17 + 255);
      }
      if (props.fontColor === 3) {
        r = 255;
        g = Math.round(p * -20 + 255);
        b = Math.round(p * -20 + 255);
      }
      return `rgb(${r},${g},${b})`;
    }
  };
  return (
    <div style={{ paddingLeft: "10px" }}>
      <div
        className="right"
        style={{
          width: `${RowFontCount * 80}px`,
          margin: "0px auto",
          fontFamily: props.fontFamily,
          color:getColor(0,true)
        }}
      >
        {/* @ts-expect-error */}
        <List
          itemCount={copyBook.length}
          itemSize={PageRowCount * 80 + 80}
          height={PageRowCount * 80 + 80}
          width={RowFontCount * 80}
        >
          {({ index }) => {
            return (
              <div>
                <PageHeader fontStyle={props.fontStyle} title={props.title}></PageHeader>
                <ul key={index} style={{ paddingLeft: "2px" }}>
                  {copyBook[index].map((char, charIndex) => {
                    return (
                      <li
                        style={{
                          backgroundImage: `url(svg/bg${props.bgStyle}${props.bgColor}.svg)`,
                          color: getColor(charIndex),
                          paddingTop:`${props.marginVertical}px`,
                          paddingLeft:`${props.marginHorizontal}px`,
                        }}
                        key={charIndex}
                      >
                        {char}
                      </li>
                    );
                  })}
                </ul>
                <PageFooter page={index + 1}></PageFooter>
              </div>
            );
          }}
        </List>
      </div>
    </div>
  );
};

export default Preview;
