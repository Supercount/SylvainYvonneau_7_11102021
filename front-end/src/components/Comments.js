import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";


function Comments ({idUsed, setId}) {
    const [comment, setComment] = useState(null);
    
    useEffect(() => {
            let postURL = `http://localhost:3001/api/post/${idUsed}/comment`;
            axios.get(postURL).then((response) => {
                setComment(response.data);
            });
        }, [idUsed]
    );

    if (!comment) return null;
    
    return ( 
        <ul>
            {comment.map(({contenu, username, date, id}) => (
                <div key={id}>
                    <Post contenu={contenu} username={username} date={date}/>
                </div>
            ))}
        </ul>
    )
}        

export default Comments;

// let tokenFetch = JSON.parse(localStorage.getItem('jwt'))

// // Dans la requête :
// headers: {
//  Authorization: `Bearer ${tokenFetch}`
// }