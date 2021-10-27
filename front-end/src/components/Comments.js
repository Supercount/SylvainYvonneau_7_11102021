import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";


function Comments ({idUsed, setId}) {
    const [comment, setComment] = useState(null);
    const [reponse, updateReponse] = useState("");
    
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
            let postURL = `http://localhost:3001/api/post/${idUsed}/comment`;
            axios.get(postURL).then((response) => {
                setComment(response.data);
            });
        }, [idUsed]
    );
    
    return ( (!comment) ?
        (
            <div>
                <form>
                    <label>
                        Répondre :
                        <input type="text" value={reponse} onChange={(e) => updateReponse(e.target.value)}/>
                    </label>
                    <input type="button" onClick={postComment} value="Répondre" />
                </form>
            </div>
        )
        : (
        <div>
            <ul>
                {comment.map(({contenu, username, date, id}) => (
                    <div key={id}>
                        <input type="button" value="Supprimer la réponse" className="bouton--delete" onClick={() => commentDelete(id)} />
                        <Post contenu={contenu} username={username} date={date}/>
                    </div>
                ))}
            </ul>
            <form>
                <label>
                    Répondre :
                    <input type="text" value={reponse} onChange={(e) => updateReponse(e.target.value)}/>
                </label>
                <input type="submit" onClick={postComment} value="Répondre" />
            </form>
        </div>
        )
    )
}        

export default Comments;
