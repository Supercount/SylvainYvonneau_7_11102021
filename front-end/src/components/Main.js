import { useState, useEffect } from 'react';
import Formulaire from './Formulaire';
import Contenu from './Contenu';
import "../styles/Main.css"

function Main ({logged, updateLogin, form, updateForm}) {
    const [idUsed, setId] = useState(0);
    const [contenu, updateContenu] = useState("Messages");
    useEffect(() => {
            setId(0)
        }, [contenu]
    );
    return ( logged ? 
        <main className="contenu">
            <ul className="section--choix">
                <li onClick={() => updateContenu("Utilisateurs")}>Utilisateurs</li>
                <li onClick={() => updateContenu("Messages")}>Messages</li>
            </ul>
            <Contenu contenu={contenu} updateContenu={updateContenu} idUsed={idUsed} setId={setId}/>
        </main> :  
        <main className="contenu">
            <Formulaire form={form} updateForm={updateForm}/>
        </main>
    )
}

export default Main;