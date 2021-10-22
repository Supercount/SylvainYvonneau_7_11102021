import { useState } from 'react';
import Formulaire from './Formulaire';
import Contenu from './Contenu';
import "../styles/Main.css"

function Main ({logged, updateLogin, form, updateForm}) {
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
            <Contenu logged={logged} updateLogin={updateLogin} contenu={contenu} updateContenu={updateContenu} idUsed={idUsed} setId={setId}/>
        </main> :  
        <main className="contenu">
            <Formulaire logged={logged} updateLogin={updateLogin} form={form} updateForm={updateForm}/>
        </main>
    )
}

export default Main;