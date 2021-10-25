import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import Comments from './Comments';
import NewMessage from "./NewMessage";


function Messages ({idUsed, setId}) {
    const [post, setPost] = useState(null);
    const [postList, setList] = useState(null);

    function messageDelete() {
        let baseURL = `http://localhost:3001/api/post/${idUsed}`;
        let token = localStorage.getItem("token");
        axios.delete(baseURL, {
            headers: {
              Authorization: 'Bearer ' + token
            }
           })
        .then((retour) => {
            console.log("message supprimé" + retour);
            alert("Message supprimé");
            setId(0);
        })
        .catch((error) => {
            console.log("problème de suppression du message : "+ error);
            alert("Vous n'êtes pas autorisé à supprimer ce message!")
        });
    }
    
    useEffect(() => {
        if (idUsed === 0) {
            let baseURL = `http://localhost:3001/api/post/`;
            axios.get(baseURL)
            .then((response) => {
                setList(response.data);
            });
        } else {
            let postURL = `http://localhost:3001/api/post/${idUsed}`;
            axios.get(postURL)
            .then((response) => {
                setPost(response.data);
            });
        }
        }, [idUsed]
    );

    if ((!postList && idUsed === 0) || (!post && idUsed !== 0)) return null;
    
    return ( (idUsed === 0) ? (
            <div>
                <ul>
                    {postList.map(({titre, contenu, username, date, id}) => (
                        <div key={id} onClick={() => setId(id)}>
                            <Post titre={titre} contenu={contenu} username={username} date={date}/>
                        </div>
                    ))}
                </ul> 
                <NewMessage idUsed={idUsed} setId={setId}/>
            </div> 
        )
        : (
            <div>
                <p onClick={() => setId(0)}> Retour </p>
                <input type="button" value="Supprimer" className="bouton--delete" onClick={() => messageDelete()} />
                <Post titre={post.titre} contenu={post.contenu} username={post.username} date={post.date}/>
                <Comments idUsed={idUsed} setId={setId}/>
            </div> 
        )
    );
}

export default Messages;