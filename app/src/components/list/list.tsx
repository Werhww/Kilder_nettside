import style from './list.module.css'

// Select
import Select from '../select/select'
import SelectItem from '../select/selectItem/selectItem'

import OK from './ok.svg'

interface props{
    children:any
    selectData:any
    select: any
    deleteCategory: ()=>any
}

export default function recentList({children, selectData, select, deleteCategory}:props) {
    return (
        <div class={style.list}>
            <div class={style.top}>
                <p>Category</p>
                {select}
                <p class={style.deleteCategory} onClick={deleteCategory}>Delete Category</p>
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