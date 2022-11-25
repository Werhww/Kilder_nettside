import style from './button.module.css'

interface props {
    children:any, 
    name:string
}

export default function button({children,name}:props) {
    return <select name={name}>{children}</select>
}
