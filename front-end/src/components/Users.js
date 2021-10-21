import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./Person";

const baseURL = "http://localhost:3000/api/auth/";

function Users ({id, setId}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
        setUser(response.data);
        });
        }, []
    );

    if (!user) return null;
    
    return (
        <div>
            {user.map(({id, username, email}) => (
                <div key={id}>
                    <Person id={id} username={username} email={email} />
                </div>
            ))}
        </div>
    );
}        

export default Users;