import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
        {/* {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )} */}
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