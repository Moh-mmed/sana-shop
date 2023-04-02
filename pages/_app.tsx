import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const SCRIPT_PROVIDER_OPTIONS = {
  "client-id": "",
   currency: 'USD',
};
export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PayPalScriptProvider options={SCRIPT_PROVIDER_OPTIONS} deferLoading={true}>
        <Component {...pageProps} />
        </PayPalScriptProvider>
      </Provider>
    </SessionProvider>
  )
}
