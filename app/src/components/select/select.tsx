import style from './select.module.css'

interface props {
    children:any
    ref:any
    onChange: ()=>any
}

export default function button({children, ref, onChange}:props) {
    return <select class={style.select} ref={ref} onChange={onChange}>
        {children}
    </select>
}
