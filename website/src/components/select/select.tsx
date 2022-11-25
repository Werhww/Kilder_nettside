import style from './button.module.css'

interface props {
    children:any, 
    name:string
    id:string
}

export default function button({children,name, id}:props) {
    return <select name={name} id={id}>{children}</select>
}
