import style from './recentListItem.module.css';


interface props{
    children:string
    carbs:number
    onclick: ()=> any
}

export default function recentListItem({children, carbs, onclick}:props) {
    return (
        <div class={style.item} onclick={onclick}>
            <p>{children}</p>
            <p>{carbs + 'g'}</p>
        </div>
    )
}
  