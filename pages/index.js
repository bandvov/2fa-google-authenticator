import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [qrcodeUrl, setQrcodeUrl] = useState('');
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);


  const loginHandler = () => {
    fetch('/api/login').then(async (response) => {
      const resObj = await response.json()
      setQrcodeUrl(resObj.url)
    })
  }


  const verifyHandler = (token) => {
    fetch('/api/verify', { method: "POST", body: JSON.stringify({ token }) }).then(async (res) => {
      const response = await res.json()
      setVerified(response.verified)
    })
    setToken('')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Two factor authentication
        </h1>
        <img src={qrcodeUrl} />
        <div style={{ margin: '1rem' }}>
          <button onClick={loginHandler}>login</button>
        </div>
        <form>
          <input value={token} onChange={(e) => setToken(e.target.value)} type='text' />
          <button onClick={(e) => {
            e.preventDefault()
            verifyHandler(token)
          }} type='submit'>Verify</button>
        </form>
        {verified ? (
          <h3 style={{ color: 'green' }}>
            Verified
          </h3>) : null}
      </main>
      <footer className={styles.footer}>
      </footer>
    </div >
  )
}
