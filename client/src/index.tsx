import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import AppRouter from './routes/AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.sass'
import './styles/button.sass'
import './styles/form.sass'
import './styles/icons.sass'
import './styles/navbar.sass'

axios.interceptors.request.use((request) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`
    }
    return request
})

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<AppRouter />)
serviceWorkerRegistration.register()