import Head from "next/head";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import s from './Layout.module.css'

type LayoutTypes  = {
    children: React.ReactNode;
    title?: string,
    description?: string
}

const Layout:React.FC<LayoutTypes> = ({ children, title,description }) => {
  return (
    <>
      <Head>
        <title>{ title? title : "Sana shop"}</title>
        <meta name="description" content={description?description:"Random text"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" transition={Flip} limit={1} autoClose={1000} />
      <div className={s.root}>
        <Header />
        <main className={s.main}>
        {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;