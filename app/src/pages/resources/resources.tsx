import { createSignal } from 'solid-js'

import style from './resources.module.css'

// Navigation Bar imports
import Navbar from '../../components/navbar/navbar'
import Navlink from '../../components/navbar/navlink/navlink'

//Footer imports
import Footer from '../../components/footer/footer'

// List
import List from '../../components/list/list'
import ListItem from '../../components/list/listItem/listItem'

// Select
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
  let category:any

  async function fetchRecources(){
    console.log(category)
  }

  const selectBody = (
    <div>
      <Select ref="category">
        {selectData.map((item:string[]) => {
            return <SelectItem value={item[1]}>{item[0]}</SelectItem>
        })}
      </Select>
    </div>
  )
                  

  return (
    <div>
      <Navbar iconLink='/'>
        <Navlink active={true} link='/'>Resources</Navlink>
        <Navlink active={false} link='/add'>Add Resource</Navlink>
      </Navbar>

      <div class={style.list}>
        <List chooseCategory={fetchRecources} select={selectBody}>
          <ListItem title='leo' website='lkleppe.com' websiteURL='124' video='zonewarz.com' videoURL='124'></ListItem>
          <ListItem title='leo' website='lkleppe.com' websiteURL='124' video='zonewarz.com' videoURL='124'></ListItem>
        </List>
      </div>

      <Footer iconLink='/'></Footer>
    </div>
  );
}