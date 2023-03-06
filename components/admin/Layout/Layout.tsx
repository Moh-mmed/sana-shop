import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import s from './Layout.module.css'
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

type LayoutTypes  = {
    children: React.ReactNode;
    title?: string,
    description?: string
}

const Layout:React.FC<LayoutTypes> = ({ children, title='Admin',description="random text" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={ description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" transition={Flip} limit={1} autoClose={1000} />
      <Navbar />
      <section className={s.root}>

        <Sidebar />
        <div className={s.main}>
            {children}
        </div>
      </section>
    </>
  );
}

export default Layout;
