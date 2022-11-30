import { createSignal} from 'solid-js'

import style from './addResources.module.css';

// Navigation Bar imports
import Navbar from '../../components/navbar/navbar';
import Navlink from '../../components/navbar/navlink/navlink';

//Footer imports
import Footer from '../../components/footer/footer'

//Inputs
import Input from '../../components/input/input'

//Button
import Button from '../../components/button/button'

// Backgroud blur
import BackgroundBlur from '../../components/backgroundBlur/backgroundBlur'

// Create category
import CreateCategory from '../../components/createCategory/createCategory'

// Create resource
import CreateResource from '../../components/createResource/createResource'

export default function App() {
  // Popup objects
  const [category, setCategory] = createSignal(false)
  const [blur, setBlur] = createSignal(false)
  const [resource, setResource] = createSignal(false)

  // Category inputs
  let categoryInput:any
  function categoryName(ref:any){
    categoryInput = ref
  }

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

      </CreateResource>:<></>}

      <Footer iconLink='/'></Footer>
    </div>
  );
}