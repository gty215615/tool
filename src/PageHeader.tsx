import { FC } from "react";
import { RowFontCount } from "./hooks/useHandle";

const PageHeader: FC<{ title: string; fontStyle: string }> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        width: `${RowFontCount * 80}px`,
        justifyContent: "space-between",
      }}
    >
      <h3
        style={{
          textAlign: "left",
          margin: "0",
          fontSize: "16px",
          height: "40px",
          lineHeight: "40px",
        }}
      >
        《{props.title}》
      </h3>
      {props.fontStyle !== "3" && (
        <h3
          style={{
            textAlign: "left",
            margin: "0",
            fontSize: "16px",
            paddingRight: "16px",
            height: "40px",
            display: "flex",
            lineHeight: "40px",
          }}
        >
          <div
            style={{ width: "40px", height: "26px",marginRight:'2px', marginLeft:'2px', borderBottom: `1px solid` }}
          ></div>
          年
          <div
            style={{ width: "40px", height: "26px",marginRight:'2px', marginLeft:'2px', borderBottom: `1px solid` }}
          ></div>
          月
          <div
            style={{ width: "40px", height: "26px",marginRight:'2px', marginLeft:'2px', borderBottom: `1px solid` }}
          ></div>
          日
        </h3>
      )}
    </div>
  );
};

export default PageHeader;
