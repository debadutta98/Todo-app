import Header from '../Components/Header'
import '../styles/dist.css'
import '../styles/customCheckBox.css';

function MyApp({ Component, pageProps }) {
  return <>
  <Header/>
  <Component {...pageProps} />
  <footer className='text-center mt-6 text-xs text-light-darkGrayishBlue'>Drag and drop to reorder list</footer>
  </>
}

export default MyApp
