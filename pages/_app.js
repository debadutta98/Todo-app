import Header from '../Components/Header'
import '../styles/dist.css'
import '../styles/customCheckBox.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return <>
  <Header/>
  <ToastContainer/>
  <Component {...pageProps} />
  <footer className='text-center mt-6 text-xs text-light-darkGrayishBlue'>Drag and drop to reorder list</footer>
  </>
}

export default MyApp
