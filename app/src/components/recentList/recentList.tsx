import style from './recentList.module.css';


interface props{
    children:any
    title:string
}

export default function recentList({children, title}:props) {
    return (
        <div class={style.list}>
            <p class={style.title}>{title}</p>
            <div class={style.content}>
                <div class={style.listInfo}>
                    <p>Name</p>
                    <p>Carbs</p>
                </div>
                {children}
            </div>
        </div>
    )
}
  