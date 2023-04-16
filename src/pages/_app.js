
import { Layout } from '../../components'
import '../styles/globals.css'
import { StateContext } from '../../context/stateContext'
export default function App({ Component, pageProps }) {
  return (
   <StateContext>
     <Layout>
      <Component {...pageProps} />
    </Layout>
   </StateContext>
  )
}
