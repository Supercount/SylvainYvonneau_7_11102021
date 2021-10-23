import { useState } from "react";
import axios from "axios";

function NewMessage ({idUsed, setId}) {
    const [titre, updateTitre] = useState("");
    const [corps, updateCorps] = useState("");
	const [creating, setCreate] = useState(false);

    function createMessage () {
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

    return ( creating ? (
		<div>
			<button onClick={() => setCreate(false)}>
				Fermer l'outil de création
			</button>
            <form>
                <label>
                    Titre :
                    <input type="text" value={titre} onChange={(e) => updateTitre(e.target.value)}/>
                </label>
                <label>
                    texte :
                    <input type="text" value={corps} onChange={(e) => updateCorps(e.target.value)}/>
                </label>
                <input type="button" onClick={createMessage} value="Poster" />
            </form>
		</div> ): (
		<div>
			<button onClick={() => setCreate(true)}>
				Créer un nouveau post
			</button>
		</div>
	)
    )
        
}

export default NewMessage;