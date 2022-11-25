import style from './selectItem.module.css'

interface props{
    value:string
    children:string
}

export default function module({value, children}:props) {
    return <option value={value}>{children}</option>
}
  