'use client'
import Image from 'next/image'
import styles from './page.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const API = "https://www.anapioficeandfire.com/api/"
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchItems = async (e: any) => {
    const endpointValue = e.target.attributes.endpoint.value;
    setLoading(true)
    try {
      const response = await axios.get(API+endpointValue)
      setItems(response.data)
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }
  console.log(items);

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <button endpoint='books' onClick={fetchItems}>{loading ? `Loading...` : `Fetch Books`}</button>
        <button endpoint='houses' onClick={fetchItems}>{loading ? `Loading...` : `Fetch Houses`}</button>
        <ul>
          {items && items.map((each:any, idx) => {
            return(
              <li key={idx}>{each.name}</li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
