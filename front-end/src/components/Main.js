import { useState } from 'react';
import Formulaire from './Formulaire';
import Contenu from './Contenu';

function Main ({logged, updateLogin, form, updateForm}) {
    const [contenu, updateContenu] = useState("Messages");
    return ( logged ? 
        <main className="contenu">
            <ul>
                <li onClick={() => updateContenu("Utilisateurs")}>Utilisateurs</li>
                <li onClick={() => updateContenu("Messages")}>Messages</li>
            </ul>
            <Contenu contenu={contenu} updateContenu={updateContenu} />
        </main> :  
        <main className="contenu">
            <Formulaire form={form} updateForm={updateForm}/>
        </main>
    )
}

export default Main;