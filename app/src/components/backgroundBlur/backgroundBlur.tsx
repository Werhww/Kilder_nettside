import style from './backgroundBlur.module.css';

interface props{
    ref:any
    onclick: ()=>any
}

export default function Module({ref, onclick}:props) {
    return (
        <div class={style.body} ref={ref} onclick={onclick}>
        </div>
    )
}