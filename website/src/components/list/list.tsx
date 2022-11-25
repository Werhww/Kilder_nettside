import style from './list.module.css';



interface props{
    children:any
    title:string
}

export default function recentList({children, title}:props) {
    return (
        <div class={style.list}>
            <p class={style.title}>{title}</p>
        
        </div>
    )
}
  