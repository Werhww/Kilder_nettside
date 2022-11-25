import style from './button.module.css'

interface props {
    children:any, 
    onclick:()=>void
}

export default function button({children,onclick}:props) {
    return (
    <div class={style.button} onclick={onclick}>
        <p class={style.buttonText}>{children}</p>
    </div>)
}
