import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import Comments from './Comments';


function Messages ({idUsed, setId}) {
    const [post, setPost] = useState(null);
    // let postURL = `http://localhost:3000/api/post/${id}`;
    
    useEffect(() => {
        if (idUsed === 0) {
            let baseURL = `http://localhost:3000/api/post/`;
            console.log(baseURL);
            axios.get(baseURL).then((response) => {
                setPost(response.data);
            });
        } else {
            let postURL = `http://localhost:3000/api/post/${idUsed}`;
            console.log(postURL);
            axios.get(postURL).then((response) => {
                setPost(response.data);
            });
        }
        }, [idUsed]
    );

    if (!post) return null;
    
    return ( (idUsed === 0) ?
        <ul>
            {post.map(({titre, contenu, username, date, id}) => (
                <div key={id} onClick={() => setId(id)}>
                    <Post titre={titre} contenu={contenu} username={username} date={date}/>
                </div>
            ))}
        </ul> :
        <div key={idUsed}>
            <Post titre={post.titre} contenu={post.contenu} username={post.username} date={post.date}/>
            <Comments idUsed={idUsed} setId={setId}/>
        </div>
    );
}        

export default Messages;