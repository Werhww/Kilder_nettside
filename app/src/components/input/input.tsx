import style from './input.module.css';


interface props{
    children:string
    inputType:string
    inputWidthRem:number
    inputCallback: (inputElement:any) => any
    fontSizeRem:number
}

export default function input({children, inputType, inputWidthRem, inputCallback, fontSizeRem}:props) {
    let inputElement:any

    const JSX = (<div>
        <input class={style.input} ref={inputElement}  type={inputType} placeholder={children} style={`width: ${inputWidthRem}rem; font-size:${fontSizeRem}rem;`}></input>
        <div class={style.underline}></div>
    </div>
    )

    inputCallback(inputElement)

    return JSX
}