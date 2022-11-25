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


export default function App() {
  


  return (
    <div>
      <Navbar iconLink='/'>
        <Navlink active={true} link='/'>Resources</Navlink>
        <Navlink active={false} link='/add'>Add Resource</Navlink>
      </Navbar>

      <List>
        <ListItem title='leo' website='lkleppe.com' websiteURL='124' video='zonewarz.com' videoURL='124'></ListItem>
        <ListItem title='leo' website='lkleppe.com' websiteURL='124' video='zonewarz.com' videoURL='124'></ListItem>
      </List>

      <Footer iconLink='/'></Footer>
    </div>
  );
}