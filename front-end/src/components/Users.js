import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./Person";

const baseURL = "http://localhost:3001/api/auth/";

function Users ({idUsed, setId}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
        setUser(response.data);
        });
        }, []
    );

    if (!user) return null;
    
    return ( (idUsed === 0) ?
        <div>
            {user.map(({id, username, email}) => (
                <div key={id} onClick={() => setId(id)}>
                    <Person id={id} username={username} email={email} />
                </div>
            ))}
        </div> : null
    );
}        

export default Users;