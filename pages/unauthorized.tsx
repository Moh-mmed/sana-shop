import Link from 'next/link';
import Layout from '../components/Layout';

export default function Unauthorized() {

  return (
    <Layout title="Unauthorized Page">
      <div className="flex flex-col items-center justify-center h-72">
        <h1 className="flex items-center text-3xl mb-4 font-bold text-red-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>Access Denied
        </h1>
        {/* {message && <div className="text-lg text-red-500 mb-4">{message}</div>} */}
        <p className="text-lg text-gray-700 text-center w-[40%]">Sorry, you don&apos;t have permission to access this page. Please login or contact support if you believe this is an error.</p>
        <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Login</Link>
      </div>
    </Layout>
  );
}
