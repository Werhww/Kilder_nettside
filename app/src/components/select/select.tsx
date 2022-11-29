import style from './select.module.css'

interface props {
    children:any
    
}

export default function button({children}:props) {
    

    return <select 
                class={style.select}
                onChange={(e)=>{
                    console.log(e.currentTarget.value)
                }}>
        
        <option value="">Choose Category</option>
        {children}
        </select>
}
