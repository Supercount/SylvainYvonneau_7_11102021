import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";


function Comments ({idUsed, setId}) {
    const [comment, setComment] = useState(null);
    const [reponse, updateReponse] = useState("");
	const [adding, setAdding] = useState(false);
    
    function commentDelete(id) {
        let baseURL = `http://localhost:3001/api/post/${idUsed}/comment/${id}`;
        let token = localStorage.getItem("token");
        axios.delete(baseURL, {
            headers: {
              Authorization: 'Bearer ' + token
            }
           })
        .then(() => {
            setId(0);
            setId(idUsed);
            alert("réponse supprimée");
        })
        .catch(() => alert("Vous n'êtes pas autorisé à supprimer cette réponse!"));
    }
    
    function postComment(e) {
        e.preventDefault();
        const commentaire = {contenu: reponse};
        updateReponse("");
        let postURL = `http://localhost:3001/api/post/${idUsed}/comment/`;
        let token = localStorage.getItem("token");
        axios.post(postURL,commentaire, {
            headers: {
              Authorization: 'Bearer ' + token
            }}
        )
        .then(() => {
            setId(0);
            setId(idUsed);
            alert("Réponse postée");
        })
        .catch((error) => alert(`Erreur lors de l'envoi du commentaire : ${error}`))
    }

    useEffect(() => {
            setComment(null);
            let postURL = `http://localhost:3001/api/post/${idUsed}/comment`;
            if (idUsed !== 0) {
                axios.get(postURL)
                .then((response) => {
                    setComment(response.data);
                })
                .catch((error) => console.log(`erreur produite : ${error}`));
            }
        }, [idUsed]
    );

    if (!comment) {
        return ( (adding) ? (
                <div>
			        <button className="bouton--create" onClick={() => setAdding(false)}>
			        	Annuler
			        </button>
                    <form className="form--comment">
                        <label>
                            Répondre :
                            <input type="text" value={reponse} onChange={(e) => updateReponse(e.target.value)}/>
                        </label>
                        <input type="submit" className="bouton--create" onClick={postComment} value="Répondre"/>
                    </form>
                </div>
            ) : (
			    <button className="bouton--create" onClick={() => setAdding(true)}>
			    	Ajouter une réponse
			    </button>
            )
        );
    } else {
        return ( (adding) ? (
                <div className="list--comment">
                    <div className="post--zone">
                        {comment.map(({contenu, username, date, id}) => (
                            <div key={id}>
                                <Post contenu={contenu} username={username} date={date}/>
                                <p className="text--action" onClick={() => commentDelete(id)}>Supprimer la réponse</p>
                            </div>
                        ))}
                    </div>
			        <button className="bouton--create" onClick={() => setAdding(false)}>
			        	Annuler
			        </button>
                    <form className="form--comment">
                        <label>
                            Répondre :
                            <input type="text" value={reponse} onChange={(e) => updateReponse(e.target.value)}/>
                        </label>
                        <button className="bouton--create" onClick={postComment}>Répondre</button>
                    </form>
                </div>
            ) : (
                <div className="list--comment">
                    <div className="post--zone">
                        {comment.map(({contenu, username, date, id}) => (
                            <div key={id}>
                                <Post contenu={contenu} username={username} date={date}/>
                                <p className="text--action" onClick={() => commentDelete(id)}>Supprimer la réponse</p>
                            </div>
                        ))}
                    </div>
			        <button className="bouton--create" onClick={() => setAdding(true)}>
			        	Ajouter une réponse
			        </button>
                </div>
            )
        )
    }
}        

export default Comments;
