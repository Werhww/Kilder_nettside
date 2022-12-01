import { createSignal, For } from 'solid-js'

import style from './resources.module.css'

// Navigation Bar imports
import Navbar from '../../components/navbar/navbar'
import Navlink from '../../components/navbar/navlink/navlink'

//Footer imports
import Footer from '../../components/footer/footer'

// List
import List from '../../components/list/list'
import ListItem from '../../components/list/listItem/listItem'

import Select from '../../components/select/select'
import SelectItem from '../../components/select/selectItem/selectItem'


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
  let trashObject:any
  const [list, setList] = createSignal([])
  const [error, setError] = createSignal(false)
  const [errorMsg, setErrorMsg] = createSignal('')

  async function fetchRecources(){
    setError(false)
    let data = {"ref": `${selectObject.value}`}

    let recources = await fetch('http://localhost:3030/getAllResourceByCategoryRef', {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
    })
    
    let listResources = await recources.json()
    setList(listResources)
  }

  function deleteCategory(){
    if(selectObject.value === "error"){
      setError(true)
      setErrorMsg('Error: Choose a category')
    } else{
      let data = {"ref": `${selectObject.value}`}

      let recources = fetch('http://localhost:3030/deleteCategory', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
      })
      setError(false)
    }
  }

  function deleteResource(id:string){
    console.log(id)
  }

  return (
    <div>
      <Navbar iconLink='/'>
        <Navlink active={true} link='/'>Resources</Navlink>
        <Navlink active={false} link='/add'>Add Resource</Navlink>
      </Navbar>

      {error()?<p class={style.error}>{errorMsg()}</p>:<></>}

      <div class={style.list}>
        <List chooseCategory={fetchRecources} selectData={selectData} deleteCategory={deleteCategory} select={
          <Select ref={selectObject} onChange={()=>{}}> 
            <SelectItem value='error'>Choose category</SelectItem>
            {itemdata.map((item:string[]) => {
              return <SelectItem value={item[1]}>{item[0]}</SelectItem>
            })}
          </Select>
        }>
          <For each={list()}>{(item:any) =>
            <ListItem title={`${item.data[0]}`} website={`${item.info.website.data[0][1]}`} websiteURL={`${item.info.website.data[0][0]}`} video={`${item.info.video.data[0][1]}`} videoURL={`${item.info.video.data[0][0]}`} deleteResource={deleteResource}></ListItem>  
        }</For>
        </List>
      </div>
      <Footer iconLink='/'></Footer>
    </div>
  );
}