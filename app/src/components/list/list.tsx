import style from './list.module.css'

// Select
import Select from '../select/select'
import SelectItem from '../select/selectItem/selectItem'


interface props{
    children:any
}

export default function recentList({children}:props) {
    const items = [
        {
            name: "hello"
        }, 
        {
            name: "world"
        }
    ]
    return (
        <div class={style.list}>
            <div class={style.top}>
                <p>Category</p>
                <Select name='category' id='category'>
                    {items.map((item) => {
                        return <SelectItem value={item.name}>{item.name}</SelectItem>
                    })}
                </Select>
            </div>
            {children}
        </div>
    )
}
  