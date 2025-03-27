import { useState, useEffect } from "react";
import "cnchar-all"
export type CopyPage = Array<string>;
//字帖每一行的字数
export const RowFontCount = 10;
// 字帖一页的行数
export const PageRowCount = 13;
const fillPage = (page: CopyPage) => {
  const waitRow = PageRowCount - Math.floor(page.length / RowFontCount);
  for (let i = 0; i < RowFontCount * waitRow; i++) {
    page.push(" ");
  }
};
const useHandle = (content:string,fontStyle:string) => {
    const [copyBook, setCopyBook] = useState<Array<CopyPage>>([["天", "地"]]);

  //   常规填充
  const normalFill = (fonts: string[]) => {
    const rows = Math.ceil(fonts.length / RowFontCount);
    const pages: CopyPage[] = [];
    let page: CopyPage = [];
    pages.push(page);
    let rowCount = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < RowFontCount; x++) {
        const index = y * RowFontCount + x;
        if (index < fonts.length) {
          page.push(fonts[index]);
        } else {
          page.push(" ");
        }
      }
      rowCount += 1;
      if (rowCount == PageRowCount) {
        rowCount = 0;
        page = [];
        pages.push(page);
      }
    }
    return pages;
  };
  // 全描填充
  const allDrawFill = (fonts: string[]) => {
    const rows = Math.ceil(fonts.length / PageRowCount) * PageRowCount;

    const pages: CopyPage[] = [];
    let index = 0;
    let page: CopyPage = [];
    pages.push(page);
    let rowCount = 0;
    for (let y = 0; y < rows; y++) {
      let char = " ";
      if (index < fonts.length) {
        char = fonts[index];
      }
      for (let x = 0; x < RowFontCount; x++) {
        page.push(char);
      }
      rowCount += 1;
      if (rowCount == PageRowCount) {
        rowCount = 0;
        page = [];
        pages.push(page);
      }
      index += 1;
    }
    return pages;
  };
  // 半描填充
  const halfDrawFill = (fonts: string[]) => {
    const rows = Math.ceil(fonts.length / PageRowCount) * PageRowCount;
    const pages: CopyPage[] = [];
    let index = 0;
    let page: CopyPage = [];
    pages.push(page);
    let rowCount = 0;
    for (let y = 0; y < rows; y++) {
      let char = " ";
      if (index < fonts.length) {
        char = fonts[index];
      }
      const half = 1;
      for (let x = 0; x < RowFontCount; x++) {
        if (x < half) {
          page.push(char);
        } else {
          page.push(" ");
        }
      }
      rowCount += 1;
      if (rowCount == PageRowCount) {
        rowCount = 0;
        page = [];
        pages.push(page);
      }
      index += 1;
    }
    return pages;
  };
  // 不描填充
  const noDrawFill = (fonts: string[]) => {
    const rows = Math.ceil(fonts.length / PageRowCount) * PageRowCount;
    const pages: CopyPage[] = [];
    let index = 0;
    let page: CopyPage = [];
    pages.push(page);
    let rowCount = 0;
    for (let y = 0; y < rows; y++) {
      let char = " ";
      if (index < fonts.length) {
        char = fonts[index];
      }
      const half = RowFontCount / 2;
      for (let x = 0; x < RowFontCount; x++) {
        if (x < half) {
          page.push(char);
        } else {
          page.push(" ");
        }
      }
      rowCount += 1;
      if (rowCount == PageRowCount) {
        rowCount = 0;
        page = [];
        pages.push(page);
      }
      index += 1;
    }
    return pages;
  };

  //   隔行填充
  const spaceFill = (fonts: string[]) => {
    const rows = Math.ceil(fonts.length / RowFontCount) * 2;
    const pages: CopyPage[] = [];
    let page: CopyPage = [];
    pages.push(page);
    let rowCount = 0;
    for (let y = 0; y < rows; y++) {
      if (y % 2 == 0) {
        for (let x = 0; x < RowFontCount; x++) {
          const index = (y / 2) * RowFontCount + x;
          if (index < fonts.length) {
            page.push(fonts[index]);
          } else {
            page.push(" ");
          }
        }
      } else {
        for (let x = 0; x < RowFontCount; x++) {
          page.push(" ");
        }
      }
      rowCount += 1;
      if (rowCount == PageRowCount) {
        rowCount = 0;
        page = [];
        pages.push(page);
      }
    }
    return pages;
  };
  // 笔顺填充
  const sortCharFill = (fonts:string[]) => {
   
  
    const pages: CopyPage[] = [];
    let page: CopyPage = [];
    pages.push(page);
    let rowCount = 0;
    for (const font of fonts) {
      const chrs= font.stroke("order",'shape') as string[][];
      const fontData = [font,...chrs[0]];
      const rows = Math.ceil(fontData.length / RowFontCount)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < RowFontCount; x++) {
          const index = y * RowFontCount + x;
          if (index < fontData.length) {
            if(fontData[index].indexOf("|") > -1) {
              page.push(fontData[index].split('|')[0]);
            }else {
              page.push(fontData[index]);
            }
            
          } else {
            page.push(" ");
          }
        }
        rowCount += 1;
        if (rowCount == PageRowCount) {
          rowCount = 0;
          page = [];
          pages.push(page);
        }
      }
    }

  
    return pages;
  }
  useEffect(() => {
    if (content) {
        console.log("props",content.length)
      const fonts = content.split("");
      let pages: CopyPage[] = [];
      switch (fontStyle) {
        case "0":
          pages = allDrawFill(fonts);
          break;
        case "2":
          pages = halfDrawFill(fonts);
          break;
        case "1":
          pages = noDrawFill(fonts);
          break;
        case "4":
          pages = spaceFill(fonts);
          break;
          case "6":
            pages = sortCharFill(fonts);
            break;
        default:
          pages = normalFill(fonts);
      }
      const page = pages[pages.length - 1];
      if(page.length == 0) {
        pages.pop();
      }else {
        fillPage(page);
      }
      setCopyBook(pages);
    } else {
      const page: CopyPage = [];
      fillPage(page);
      setCopyBook([page]);
    }
  }, [content, fontStyle]);

  return {
    copyBook
  }
};

export default useHandle;

