import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./Person";

function Users ({logged, updateLogin, idUsed, setId}) {
    const [user, setUser] = useState(null);
    const [userList, setList] = useState(null);
    
    function logout() {
        localStorage.removeItem("token");
        updateLogin(false);
    }
    
    useEffect(() => {
        if (idUsed === 0) {
            let baseURL = `http://localhost:3001/api/auth/`;
            axios.get(baseURL)
            .then((response) => {
                setList(response.data);
            });
        } else {
            let userURL = `http://localhost:3001/api/auth/${idUsed}`;
            axios.get(userURL)
            .then((response) => {
                setUser(response.data);
            });
        }
        }, [idUsed]
    );
    
    function retourUsers() {
        setId(0);
        let baseURL = `http://localhost:3001/api/auth/`;
        axios.get(baseURL)
        .then((response) => {
            setUser(response.data);
        });
    }

    function userDelete() {
        let baseURL = `http://localhost:3001/api/auth/${idUsed}`;
        let token = localStorage.getItem("token");
        axios.delete(baseURL, {
            headers: {
              Authorization: 'Bearer ' + token
            }
           })
        .then(() => logout())
        .catch(() => alert("Vous n'êtes pas autorisé à supprimer ce compte!"));
    }

    if ((!userList && idUsed === 0) || (!user && idUsed !== 0)) return null;
    
    
    return ( (idUsed === 0) ?
        <div>
            {userList.map(({id, username, email, isAdmin}) => (
                <div key={id} onClick={() => setId(id)}>
                    <Person username={username} email={email}  isAdmin={isAdmin}/>
                </div>
            ))}
        </div> :
        <div>
            <p onClick={() => retourUsers()}> Retour </p>
            <Person username={user.username} email={user.email} isAdmin={user.isAdmin}/>
            <input type="button" value="Supprimer" className="bouton--delete" onClick={() => userDelete()} />
        </div>
    );
}        

export default Users;