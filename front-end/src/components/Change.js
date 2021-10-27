import { useState } from "react";
import axios from "axios";

function Change({idUsed, setId, titre, contenu}) {
    const [newtitre, updateTitre] = useState(titre);
    const [corps, updateCorps] = useState(contenu);
	const [modifying, setModify] = useState(false);

    
    function updateMessage (e) {
        e.preventDefault();
        const post = {titre : newtitre, contenu: corps};
        let postURL = `http://localhost:3001/api/post/${idUsed}`;
        let token = localStorage.getItem("token");
        axios.put(postURL,post, {
            headers: {
              Authorization: 'Bearer ' + token
            }}
        )
        .then(() => {
            alert("Post Modifié");
            setId(0);
            setId(idUsed);
            setModify(false);
        })
        .catch(() => alert(`Erreur lors de la Modification du post.`))
    }

	return ( modifying ? (
		<div className="create--post">
			<p onClick={() => setModify(false)}>
				Annuler la modification
			</p>
            <form className="newPost">
                <label>
                    Titre :
                    <input className="box" type="text" value={newtitre} onChange={(e) => updateTitre(e.target.value)}/>
                </label>
                <label>
                    Texte :
                    <textarea className="textbox box" value={corps} onChange={(e) => updateCorps(e.target.value)}/>
                </label>
                <input type="submit" onClick={updateMessage} value="Modifier" />
            </form>
		</div> ): (
		// <div >
			<p onClick={() => setModify(true)}>
				Modifier
			</p>
		// </div>
	)
    );
}

export default Change