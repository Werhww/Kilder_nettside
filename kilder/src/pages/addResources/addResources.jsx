import { createSignal } from 'solid-js';

import style from './addResources.module.css';

// Navigation Bar imports
import Navbar from '../../../components/navbar/navbar';
import Navlink from '../../../components/navbar/navlink/navlink';

//Footer imports
import Footer from '../../../components/footer/footer'

//Inputs
import Input from '../../../components/input/input'

//Button
import Button from '../../../components/button/button'

export default function App() {
  return (
    <div>
      <Navbar iconLink='/'>
        <Navlink active={false} link='/'>Resources</Navlink>
        <Navlink active={true} link='/add'>Add Resource</Navlink>
      </Navbar>


      <Footer iconLink='/'></Footer>
    </div>
  );
}