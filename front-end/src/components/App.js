import { useState } from 'react'
import Banner from './Banner';
import Main from './Main';
import Footer from './Footer';
import '../styles/App.css';

function App() {
    const [admin, setAdmin] = useState(false);
    const [idLogged, setLogged] = useState(0);
    const [logged, updateLogin] = useState(false);
    const [contenu, updateContenu] = useState("Connexion");
    return (
        <div className="App">
        <Banner logged={logged} updateLogin={updateLogin} form={contenu} updateForm={updateContenu} admin={admin} setAdmin={setAdmin} idLogged={idLogged} setLogged={setLogged}/>
        <Main logged={logged} updateLogin={updateLogin} form={contenu} admin={admin} setAdmin={setAdmin} idLogged={idLogged} setLogged={setLogged}/>
        <Footer/>
        </div>
        );
    }
    
    export default App;
    