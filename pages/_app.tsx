import { AppProps } from 'next/app'
import 'todomvc-app-css/index.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
