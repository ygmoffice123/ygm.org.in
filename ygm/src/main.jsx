import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import {ScrollTrigger,SplitText} from 'gsap/all'
import gsap from 'gsap'
import store from './utils/redux/store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

gsap.registerPlugin(ScrollTrigger,SplitText);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
       <App />
        <Toaster position="bottom-right" reverseOrder={false} />
    </Provider>
  </BrowserRouter>
)
