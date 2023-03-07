import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import {MdErrorOutline} from 'react-icons/md'
export default function Unauthorized() {

  return (
    <Layout title="Unauthorized Page">
      <div className="flex flex-col items-center justify-center min-h-72 py-12 px-10 max-sm:text-px-6">
        <h1 className="flex items-center text-3xl mb-4 font-bold text-red-600 max-sm:text-xl">
          <MdErrorOutline className='mr-4 text-7xl max-sm:text-4xl'/>
          Access Denied
        </h1>
        {/* {message && <div className="text-lg text-red-500 mb-4">{message}</div>} */}
        <p className="text-lg text-gray-700 text-center w-[40%] max-sm:w-[100%]">Sorry, you don&apos;t have permission to access this page. Please login or contact support if you believe this is an error.</p>
        {/* <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Login</Link> */}
      </div>
    </Layout>
  );
}
