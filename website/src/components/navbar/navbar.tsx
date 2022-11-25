import { router } from '@klevn/solid-router';

import style from './navbar.module.css'
import logo from './logo.svg'

interface props {
    children:any,
    iconLink:string
}

export default function navbar({children, iconLink}:props) {
    return (
    <div class={style.navbar}>
        <div>
            <img class={style.logo} onclick={()=>{router.update(iconLink)}} src={logo} alt="logo"/>
        </div>
        <div class={style.links}>{children}</div>
        
    </div>)
}
