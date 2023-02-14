import Head from "next/head";
import LayoutProps from "../types/Layout";
import Footer from "./Footer";
import Navbar from "./Navbar";


const Layout:React.FC<LayoutProps> = ({ children, title,description }) => {
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
        <main className="bg-slate-200">
        {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;