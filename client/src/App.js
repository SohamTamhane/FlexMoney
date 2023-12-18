import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AdmissionForm from './components/Home/AdmissionForm';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import AppContext from './utils/Context';

function App() {
    return (
        <BrowserRouter>
            <AppContext>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/admission' element={<AdmissionForm/>}/>
                </Routes>
                <Footer/>
            </AppContext>
        </BrowserRouter>
    );
}

export default App;
