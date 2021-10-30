import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./Person";
import Delete from "./Delete";

function Users ({updateLogin, idUsed, setId, admin, idLogged}) {
    const [user, setUser] = useState(null);
    const [userList, setList] = useState(null);
    
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

    if ((!userList && idUsed === 0) || (!user && idUsed !== 0)) return null;
    
    
    return ( (idUsed === 0) ?
        <div className='userlist'>
            <h1 className="titre--liste"> Liste des utilisateurs inscrits </h1>
            {userList.map(({id, username, email}) => (
                <div key={id} onClick={() => setId(id)}>
                    <Person username={username} email={email} isAdmin='null'/>
                </div>
            ))}
        </div> :
        <div className='user--alone'>
            <p className="bouton--retour bouton" onClick={() => retourUsers()}> Retour à la liste</p>
            <Person username={user.username} email={user.email} isAdmin={user.isAdmin}/>
            <Delete updateLogin={updateLogin} idUsed={idUsed} admin={admin} idLogged={idLogged} type="User"/>
        </div>
    );
}

export default Users;