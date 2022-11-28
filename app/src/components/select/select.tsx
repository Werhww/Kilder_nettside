import style from './select.module.css'

interface props {
    children:any, 
    ref:any
}

export default function button({children, ref}:props) {
    return <select class={style.select} ref={ref}>
        <option value="">Choose Category</option>
        {children}
        </select>
}
