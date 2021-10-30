import { useState } from 'react';
import Formulaire from './Formulaire';
import Contenu from './Contenu';
import "../styles/Main.css"

function Main ({logged, updateLogin, form, admin, setAdmin, idLogged, setLogged}) {
    const [idUsed, setId] = useState(0);
    const [contenu, updateContenu] = useState("Messages");

    function goMessages() {
        setId(0);
        if (contenu !== "Messages") {
            updateContenu("Messages")
        }
    }

    function goUsers() {
        setId(0);
        if (contenu !== "Utilisateurs") {
            updateContenu("Utilisateurs")
        }
    }

    return ( logged ? 
        <main className="contenu">
            <ul className="section--choix">
                <li onClick={() => goUsers()}>Utilisateurs</li>
                <li onClick={() => goMessages()}>Messages</li>
            </ul>
            <Contenu updateLogin={updateLogin} contenu={contenu} idUsed={idUsed} setId={setId} admin={admin} idLogged={idLogged}/>
        </main> :  
        <main className="contenu">
            <Formulaire updateLogin={updateLogin} form={form} setAdmin={setAdmin} setLogged={setLogged}/>
        </main>
    )
}

export default Main;