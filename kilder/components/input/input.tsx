import style from './input.module.css';


interface props{
    children:string
    inputType:string
    inputWidthRem:number
    inputCb: (inputElement:any) => any
    fontSizeRem:number
}

export default function input({children, inputType, inputWidthRem, inputCb, fontSizeRem}:props) {
    let inputElement:any

    const JSX = (<div>
        <input class={style.input} ref={inputElement}  type={inputType} placeholder={children} style={`width: ${inputWidthRem}rem; font-size:${fontSizeRem}rem;`}></input>
        <div class={style.underline}></div>
    </div>
    )

    inputCb(inputElement)

    return JSX
}