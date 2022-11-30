import { children } from 'solid-js';
import style from './createResource.module.css';

interface props{
    children:any
}

export default function Module({children}:props) {
    return (
        <div class={style.body}>
            <p class={style.title}>Create Resource</p>
            {children}
        </div>
    )
}