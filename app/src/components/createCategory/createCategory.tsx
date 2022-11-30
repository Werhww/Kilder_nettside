import style from './createCategory.module.css';

interface props{
    ref:any
}

export default function Module({ref}:props) {
    return (
        <div class={style.body} ref={ref}>
            <p class={style.title}>Create Category</p>
        </div>
    )
}