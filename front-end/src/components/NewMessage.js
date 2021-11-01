import { useState } from "react";
import axios from "axios";
import "../styles/NewMessage.css"

function NewMessage ({setId}) {
    const [titre, updateTitre] = useState("");
    const [corps, updateCorps] = useState("");
	const [creating, setCreate] = useState(false);

    function createMessage (e) {
        e.preventDefault();
        if (titre === '' || corps === '') {
            alert("Veuillez remplir tous les champs");
        } else { 
            const post = {titre : titre, contenu: corps};
            let postURL = `http://localhost:3001/api/post/`;
            let token = localStorage.getItem("token");
            axios.post(postURL,post, {
                headers: {
                  Authorization: 'Bearer ' + token
                }}
            )
            .then((retour) => {
                const identifiant = retour.data.postId;
                alert("Post créé");
                setId(identifiant);
            })
            .catch((error) => alert(`Erreur lors de la création du post : ${error}`))
        }
    }

    return ( creating ? (
		<div className="create--post">
			<button className="bouton--create" onClick={() => setCreate(false)}>
				Annuler
			</button>
            <form className="newPost">
                <label>
                    Titre :
                    <input className="box" type="text" value={titre} onChange={(e) => updateTitre(e.target.value)}/>
                </label>
                <label>
                    Texte :
                    <textarea className="textbox box" value={corps} onChange={(e) => updateCorps(e.target.value)}/>
                </label>
                <button className="bouton--create" type="submit" onClick={createMessage}>Poster</button>
            </form>
		</div> ): (
		<div className="create--post">
			<button className="bouton--create" onClick={() => setCreate(true)}>
				Créer un nouveau post
			</button>
		</div>
	)
    )
        
}

export default NewMessage;