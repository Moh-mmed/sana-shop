import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import s from './Layout.module.css'
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import { useEffect, useState } from 'react';

type LayoutTypes  = {
    children: React.ReactNode;
    title?: string,
    description?: string
}

const Layout:React.FC<LayoutTypes> = ({ children, title='Admin',description="random text" }) => {
  const [sidebar, setSidebar] = useState(false)

  useEffect(() => {
    if (window.innerWidth > 768) {
      setSidebar(true)
    }
    window.addEventListener("resize", () => {
       if (window.innerWidth > 768) {
        setSidebar(true)
       } else {
         setSidebar(false)
      }
    });   
  }, []);
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={ description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" transition={Flip} limit={1} autoClose={1000} />
      <Navbar sidebar={sidebar}  setSidebar={setSidebar} />
      <section className={s.root}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className={s.main}>
            {children}
        </div>
      </section>
    </>
  );
}

export default Layout;
