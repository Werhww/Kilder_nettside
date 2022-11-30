import { createResource, createSignal} from 'solid-js'

import style from './addResources.module.css';

// Navigation Bar imports
import Navbar from '../../components/navbar/navbar';
import Navlink from '../../components/navbar/navlink/navlink';

//Footer imports
import Footer from '../../components/footer/footer'

// Componemets
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import Select from '../../components/select/select'
import SelectItem from '../../components/select/selectItem/selectItem'

// Popups
import BackgroundBlur from '../../components/backgroundBlur/backgroundBlur'
import CreateCategory from '../../components/createCategory/createCategory'
import CreateResource from '../../components/createResource/createResource'

async function fetchCategories() {
  let categories = await fetch('http://localhost:3030/getAllCategories', {
  method: "POST"
  })

  let selectDataJson = await categories.json()

  return selectDataJson
}


export default async function App() {
  const selectData = await fetchCategories()
  const itemdata = selectData.data
  let selectObject:any
  let selectCategory:any

  // Popup objects
  const [category, setCategory] = createSignal(false)
  const [blur, setBlur] = createSignal(false)
  const [resource, setResource] = createSignal(false)

  // Category inputs
  let categoryInput:any
  function categoryName(ref:any){
    categoryInput = ref
  }

  // Resource inputs
  let title:any
  function resourceTitle(ref:any){
    title = ref
  }

  let websiteName:any
  function recourcesWebsiteName(ref:any){
    websiteName = ref
  }

  let websiteURL:any
  function recourcesWebsiteUrl(ref:any){
    websiteURL = ref
  }

  let videoTitle:any
  function recourcesVideoTitle(ref:any){
    videoTitle = ref
  }

  let videoUrl:any
  function recourcesVideoUrl(ref:any){
    videoUrl = ref
  }

  const [website, setWebsite] = createSignal(false)
  const [video, setVideo] = createSignal(false)

  function openCategory(){
    setBlur(true)
    setCategory(true)
  }

  function openResource(){
    setBlur(true)
    setResource(true)
  }

  function close(){
    setBlur(false)
    setCategory(false)
    setResource(false)
  }

  async function createCategory(){
    let data = {
      "name": String(categoryInput.value)
    }

    let recources = await fetch('http://localhost:3030/createCategories', {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
    })
    
    close()
  }

  async function createResource(){
    console.log("fas")
  }


  return (
    <div>
      <Navbar iconLink='/'>
        <Navlink active={false} link='/'>Resources</Navlink>
        <Navlink active={true} link='/add'>Add Resource</Navlink>
      </Navbar>

      <div class={style.buttons}>
        <Button onclick={openCategory}>Add Category</Button>
        <Button onclick={openResource}>Add Resource</Button>
      </div>
      
      {blur()?<BackgroundBlur ref={blur} onclick={close}></BackgroundBlur>:<></>}
      
      {category()?<CreateCategory>
        <Input inputType='string' inputWidthRem={15} inputCallback={categoryName} fontSizeRem={1.5}>Name</Input>
        <div class={style.popupButtons}>
          <Button onclick={close}>Cancel</Button>
          <Button onclick={createCategory}>Create</Button>
        </div>
      </CreateCategory>:<></>}

      {resource()?<CreateResource>
        <div class={style.selectCategory}>
          <p>Category:</p>
          <Select ref={selectObject} onChange={()=>{}}>
            {itemdata.map((item:string[]) => {
                return <SelectItem value={item[1]}>{item[0]}</SelectItem>
            })}
          </Select>
        </div>
        <Input inputType='string' inputWidthRem={15} inputCallback={resourceTitle} fontSizeRem={1.5}>Resource Title</Input>
        <Select ref={selectCategory} onChange={()=>{
          let category = selectCategory.value
          if(category == "website"){
            setWebsite(true)
            setVideo(false)
          } else if (category == "video"){
            setVideo(true)
            setWebsite(false)
          } else if (category == "both") {
            setWebsite(true)
            setVideo(true)
          } else {
            setWebsite(false)
            setVideo(false)
          }
        }}>
          <SelectItem value=''>Choose type</SelectItem>
          <SelectItem value='website'>Website</SelectItem>
          <SelectItem value='video'>Video</SelectItem>
          <SelectItem value='both'>Both</SelectItem>
        </Select>

        {website()?<div class={style.resourceInfo}>
          <p>Website</p>
          <div class={style.resourceInputs}>
            <Input inputType='string' inputWidthRem={10} inputCallback={recourcesWebsiteName} fontSizeRem={1}>Name</Input>
            <Input inputType='string' inputWidthRem={10} inputCallback={recourcesWebsiteUrl} fontSizeRem={1}>Url</Input>
          </div>
        </div>:<></>}

        {video()?<div class={style.resourceInfo}>
          <p>Video</p>
          <div class={style.resourceInputs}>
            <Input inputType='string' inputWidthRem={10} inputCallback={recourcesVideoTitle} fontSizeRem={1}>Title</Input>
            <Input inputType='string' inputWidthRem={10} inputCallback={recourcesVideoUrl} fontSizeRem={1}>Url</Input>
          </div>
        </div>:<></>}

        <div class={style.popupButtons}>
          <Button onclick={close}>Cancel</Button>
          <Button onclick={createResource}>Create</Button>
        </div>
      </CreateResource>:<></>}

      <Footer iconLink='/'></Footer>
    </div>
  );
}