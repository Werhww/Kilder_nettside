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

export default function App() {
  let createCategoryObject:any
  let blur:any

  function openCreateCategory(){
    blur.style.display = "flex"
    createCategoryObject.style.display = "flex"
  }

  function openCreateResource(){}

  return (
    <div>
      <Navbar iconLink='/'>
        <Navlink active={false} link='/'>Resources</Navlink>
        <Navlink active={true} link='/add'>Add Resource</Navlink>
      </Navbar>

      <div class={style.buttons}>
        <Button onclick={openCreateCategory}>Add Category</Button>
        <Button onclick={openCreateResource}>Add Resource</Button>
      </div>
      
      <BackgroundBlur ref={blur}></BackgroundBlur>
      <CreateCategory ref={createCategoryObject}></CreateCategory>

      <Footer iconLink='/'></Footer>
    </div>
  );
}