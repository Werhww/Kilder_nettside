import style from './list.module.css'

// Select
import Select from '../select/select'
import SelectItem from '../select/selectItem/selectItem'

import OK from './ok.svg'

interface props{
    children:any
    selectData:any
    chooseCategory: ()=>any

}

export default function recentList({children, selectData,chooseCategory}:props) {
    let itemdata = selectData.data

    let testref: string


    return (
        <div class={style.list}>
            <div class={style.top}>
                <p>Category</p>
                <Select>
                    {itemdata.map((item:string[]) => {
                        console.log(selectData)
                        return <SelectItem value={item[1]}>{item[0]}</SelectItem>
                    })}
                </Select>
                <img class={style.OK} src={OK} onclick={chooseCategory}/>
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
  