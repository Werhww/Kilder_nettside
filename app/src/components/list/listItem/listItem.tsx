import { createSignal } from 'solid-js';

import style from './listItem.module.css'
import arrow from './arrowDown.svg'


interface props{
    title:string
    website:string
    video:string
    websiteURL:string
    videoURL:string
}

export default function listItem({title, website, video, websiteURL, videoURL}:props) {
    const [getDisplay, setDisplay] = createSignal("none")
    let itemInfoHidden = 'none'

    function onclick(){
        if(itemInfoHidden === "none"){
            setDisplay('flex')
            itemInfoHidden = 'flex'
        } else {
            setDisplay('none')
            itemInfoHidden = 'none'
        }
        
    }

    return (
        <div class={style.item}>
            <div class={style.mainContent}>
                <div class={style.content} onclick={onclick}>
                    <p class={style.titleItem}>{title}</p>
                    <p class={style.websiteItem}>{website}</p>
                    <p class={style.videoItem}>{video}</p>
                </div>
                <img class={style.arrow} src={arrow} onclick={onclick} alt=""/>
            </div>
            

            <div class={style.allItemInfo} style={`display: ${getDisplay()};`}>
                <p class={style.titleItem}>{title}</p>
                <div class={style.websiteItem}>
                    <p>{website}</p>
                    <p>{websiteURL}</p>
                </div>
                <div class={style.videoItem}>
                    <p>{video}</p>
                    <p>{videoURL}</p>
                </div>
            </div>
        </div>
    )
}
  