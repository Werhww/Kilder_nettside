import style from './backgroundBlur.module.css';

interface props{
    ref:any
}

export default function Module({ref}:props) {
    return (
        <div class={style.body} ref={ref}>
        </div>
    )
}