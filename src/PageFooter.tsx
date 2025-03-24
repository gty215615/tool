import { FC } from "react";

const PageFooter:FC<{page:number}> = (props) => {
    return <div style={{textAlign:'center', margin:"40px 0"}}>
        第 {props.page} 页
    </div>
}

export default PageFooter;