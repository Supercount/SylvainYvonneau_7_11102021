import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import Change from "./Change";
import Comments from './Comments';
import NewMessage from "./NewMessage";
import Delete from "./Delete";


function Messages ({idUsed, setId, admin, idLogged}) {
    const [post, setPost] = useState(null);
    const [postList, setList] = useState(null);
    
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
            <div className='messagelist'>
                <h1 className="titre--liste"> Liste des messages écrits </h1>
                {postList.map(({titre, contenu, username, date, id}) => (
                    <div key={id} onClick={() => setId(id)}>
                        <Post titre={titre} contenu={contenu} username={username} date={date} inList={true}/>
                    </div>
                ))}
                <NewMessage setId={setId}/>
            </div> 
        )
        : (
            <div className="post--alone">
                <p className="bouton--retour" onClick={() => setId(0)}> Retour </p>
                <div className="post--zone">
                    <Post titre={post.titre} contenu={post.contenu} username={post.username} date={post.date} inList={false}/>
                    <Delete idPost={idUsed} setId={setId} idUsed={post.idUser} admin={admin} idLogged={idLogged} type="Message"/>
                    <Change  idUsed={idUsed} setId={setId} titre={post.titre} contenu={post.contenu} user={post.idUser} admin={admin} idLogged={idLogged}/>
                </div>
                <Comments idUsed={idUsed} setId={setId} admin={admin} idLogged={idLogged}/>
            </div> 
        )
    );
}

export default Messages;