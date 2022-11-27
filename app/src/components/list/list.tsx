import style from './list.module.css'

// Select
import Select from '../select/select'
import SelectItem from '../select/selectItem/selectItem'


interface props{
    children:any
    selectData:string[]
}

export default function recentList({children, selectData}:props) {
    return (
        <div class={style.list}>
            <div class={style.top}>
                <p>Category</p>
                <Select name='category' id='category'>
                    {selectData.map((item) => {
                        return <SelectItem value={item[1]}>{item[0]}</SelectItem>
                    })}
                </Select>
            </div>
            <div class={style.info}>
                <p class={style.titleInfo}>Title</p>
                <p class={style.websiteInfo}>Website</p>
                <p class={style.videoInfo}>Video</p>
            </div>
            {children}
        </div>
    )
}
  