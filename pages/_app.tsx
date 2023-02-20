import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const SCRIPT_PROVIDER_OPTIONS = {
  "client-id": "AcoqQD_YsUyOhCcy0sREiHrgirHomCrjUAmKZcWnXhXdQuAJAW4iX4HQ8iSXcxC3kU7maAyhLAHCxiuF",
   currency: 'USD',
};
export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PayPalScriptProvider options={SCRIPT_PROVIDER_OPTIONS} deferLoading={true}>
        <Component {...pageProps} />
        {/* {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )} */}
        </PayPalScriptProvider>
      </Provider>
    </SessionProvider>
  )
}

// function Auth({ children, adminOnly }:any) {
//   const router = useRouter();
//   const { status, data: session } = useSession({
//     required: true,
//     onUnauthenticated() {
//       router.push('/unauthorized?message=login required');
//     },
//   });
//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }
//   if (adminOnly && !session.user.isAdmin) {
//     router.push('/unauthorized?message=admin login required');
//   }

//   return children;
// }