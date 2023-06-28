import '../styles/global.css';
import { Inter } from 'next/font/google'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
const inter = Inter({ subsets: ['latin'] })
function App({ Component, pageProps }) {
  return(
    <>
         <style jsx global>{`
           html {
             font-family: ${inter.style.fontFamily};
           }
         `}</style>
      <NavBar/>
      <Component {...pageProps} />
      <Footer/>
    </>
  ) 
  
}

export default App;