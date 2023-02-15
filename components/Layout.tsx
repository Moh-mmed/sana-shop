import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";
import LayoutTypes from "../types/LayoutTypes";


const Layout:React.FC<LayoutTypes> = ({ children, title,description }) => {
  return (
    <>
      <Head>
        <title>{ title? title : "Sana shop"}</title>
        <meta name="description" content={description?description:"Random text"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <Navbar />
        <main className="bg-white flex-1 px-10 py-10">
        {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;