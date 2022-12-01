import { createSignal } from 'solid-js';

import style from './listItem.module.css'
import arrow from './arrowDown.svg'
import trash from './trash.svg'


interface props{
    title:string
    website:string
    video:string
    websiteURL:string
    videoURL:string
    id:string
    deleteResource: (id:string)=>any
    resourceRef:string
}

export default function listItem({title, website, video, websiteURL, videoURL, deleteResource, resourceRef}:props) {
    const [itemInfo, setItemInfo] = createSignal(false)

    function onclick(){
        {itemInfo()?setItemInfo(false):setItemInfo(true)}
    }

    return (
        <div class={style.item}>
            <div class={style.mainContent}>
                <div class={style.content} onclick={onclick}>
                    <p class={style.titleItem}>{title}</p>
                    <p class={style.websiteItem}>{website}</p>
                    <p class={style.videoItem}>{video}</p>
                </div>
                <img class={style.arrow} src={arrow} onclick={onclick}/>
                <img class={style.trash} src={trash} onclick={() => deleteResource(resourceRef)}/>
            </div>
            
            {itemInfo()?
            <div class={style.allItemInfo}>
                <p class={style.titleItem}>{title}</p>
                <div class={style.websiteItem}>
                    <p>{website}</p>
                    <a href={websiteURL}>{websiteURL}</a>
                </div>
                <div class={style.videoItem}>
                    <p>{video}</p>
                    <a href={videoURL}>{videoURL}</a>
                </div>
            </div>:<></>}
            
        </div>
    )
}
  