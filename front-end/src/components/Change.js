import { useState } from "react";
import axios from "axios";

function Change({idUsed, setId, titre, contenu}) {
    const [newtitre, updateTitre] = useState(titre);
    const [corps, updateCorps] = useState(contenu);
	const [modifying, setModify] = useState(false);

    
    function updateMessage () {
        const post = {titre : newtitre, contenu: corps};
        let postURL = `http://localhost:3001/api/post/${idUsed}`;
        let token = localStorage.getItem("token");
        axios.put(postURL,post, {
            headers: {
              Authorization: 'Bearer ' + token
            }}
        )
        .then(() => {
            setId(0);
            setId(idUsed);
            setModify(false);
            alert("Post Modifié");
        })
        .catch((error) => alert(`Erreur lors de la Modification du post : ${error}`))
    }

	return ( modifying ? (
		<div className="create--post">
			<button onClick={() => setModify(false)}>
				Annuler la modification
			</button>
            <form className="newPost">
                <label>
                    Titre :
                    <input className="box" type="text" value={newtitre} onChange={(e) => updateTitre(e.target.value)}/>
                </label>
                <label>
                    Texte :
                    <input className="textbox box" type="text" value={corps} onChange={(e) => updateCorps(e.target.value)}/>
                </label>
                <input type="button" onClick={updateMessage} value="Modifier" />
            </form>
		</div> ): (
		<div className="create--post">
			<button onClick={() => setModify(true)}>
				Modifier
			</button>
		</div>
	)
    );
}

export default Change