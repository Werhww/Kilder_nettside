import style from './select.module.css'

interface props {
    children:any, 
    name:string
    id:string
}

export default function button({children,name, id}:props) {
    return <select class={style.select} name={name} id={id}>{children}</select>
}
