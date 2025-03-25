import { FC } from "react";

const PageHeader:FC<{title:string}> = (props) => {
    return <h3 style={{textAlign:'left',margin:'0', fontSize:'16px', height:'40px', lineHeight:'40px'}}>
        《{props.title}》
    </h3>
}

export default PageHeader;