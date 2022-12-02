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
    resourceRef:string
    resourceType:string
    deleteResource: (id:string, type:string)=>any
}

export default function listItem({title, website, video, websiteURL, videoURL, deleteResource, resourceRef, resourceType}:props) {
    const [itemInfo, setItemInfo] = createSignal(false)
    const [animation, setAnimation] = createSignal(style.turnBackwards)
    const [trashAnimation, setTrashAnimation] = createSignal(style.trash)

    function onclick(){
        itemInfo()?setItemInfo(false):setItemInfo(true)
        itemInfo()?setAnimation(style.turnForwards):setAnimation(style.turnBackwards)
    }

    return (
        <div class={style.item}>
            <div class={style.mainContent}>
                <div class={style.content} onclick={onclick}>
                    <p class={style.titleItem}>{title}</p>
                    <p class={style.websiteItem}>{website}</p>
                    <p class={style.videoItem}>{video}</p>
                </div>
                <img class={`${style.arrow} ${animation()}`}src={arrow} onclick={onclick}/>
                <img class={`${style.trash} ${trashAnimation()}`} src={trash} onclick={() => {
                    deleteResource(resourceRef, resourceType) 
                    setTrashAnimation(style.trashRotate)}}/>
            </div>
            
            {itemInfo()?
            <div class={style.allItemInfo}>
                <p class={style.titleItem}>{title}</p>
                <div class={style.websiteItem}>
                    <p>{website}</p>
                    <a href={websiteURL} target='_blank'>{websiteURL}</a>
                </div>
                <div class={style.videoItem}>
                    <p>{video}</p>
                    <a href={videoURL} target='_blank'>{videoURL}</a>
                </div>
            </div>:<></>}
            
        </div>
    )
}
  