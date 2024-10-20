"use client"
import styles from "./page.module.css";
import {  initData} from '@telegram-apps/sdk-react';


export default function Home() {
  const ll = initData
  console.log(ll.authDate() ,ll.canSendAfter() , ll.chat() , ll.chatInstance() , ll.hash() , ll.raw())

  return (
    <div className={styles.page}>
     <button onClick={()=>{
      console.log("hello",ll)
     }}>check</button>
      hello
    </div>
  );
}
