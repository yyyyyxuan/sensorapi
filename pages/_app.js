import '../styles/global.css';
import { Inter } from 'next/font/google'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }

        #__next {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `}</style>
      <NavBar />
      <div style={{ flex: 1 }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default App;
