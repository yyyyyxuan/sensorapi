import '../styles/global.css';
import NavBar from '../components/NavBar'
function App({ Component, pageProps }) {
  return(
    <>
      <NavBar/>
      <Component {...pageProps} />
    </>
  ) 
  
}

export default App;