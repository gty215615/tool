import { FC } from "react";

const PageFooter:FC<{page:number}> = (props) => {
    return <div style={{textAlign:'right',fontSize:'16px', paddingRight:'10px',  height:'40px', lineHeight:'40px'}}>
        第 {props.page} 页
    </div>
}

export default PageFooter;