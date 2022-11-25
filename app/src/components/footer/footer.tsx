import { router } from '@klevn/solid-router';

import style from './footer.module.css';
import logo from './logo.svg'

interface props {
  iconLink:string
}

export default function footer({iconLink}:props) {
  return (
    <div class={style.footer}>
        <img class={style.logo} onclick={()=>{router.update(iconLink)}} src={logo} alt="Logo" />

        <div class={style.content}>
          <div>
            <p class={style.title}>Contacts</p>
            <a href="mailto:personal@lkleppe.com">personal@lkleppe.com</a>
          </div>
          <div>
              <p class={style.title}>Creator</p>
              <p>Leo Walbeck Kleppe</p>
          </div>
          <div>
            <p class={style.title}>My Website</p>
            <a href="https://lkleppe.com" target='_blank'>lkleppe.com</a>
          </div>
        </div>
    </div>
  );
}
