import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./Person";

const baseURL = "http://localhost:3000/api/auth/";

function Users () {
    // const [data, setData] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
        setUser(response.data);
        });
        }, []
    );

    if (!user) return null;
    
    return (
        // <div>
        //     <p>identifiant : {user[1].id}</p>
        //     <p>nom : {user[1].username}</p>
        //     <p>email : {user[1].email}</p>
        // </div>
        <div>
            {user.map(({id, username, email}) => (
                <div>
                    <Person id={id} username={username} email={email} />
                </div>
            ))}
        </div>
    );
    // axios.get("http://localhost:3000/api/auth/")
    //     .then(res => {
    //         console.log(".then", res.data);
    //         this.datasFetched = true;
    //         // return res.data;
    //         this.users = res.data;
    //         // this.$emit("myEvent");
    //     })
    //     .catch(error => console.log("trouble while fetching datas: ", error));      
    
    // return this.users;


    // useEffect(() => {
    //     fetch("http://localhost:3000/api/auth/")
    //     .then (res => res.json())
    //     .then (data => {
    //         setData(data);
    //     })
    //     .catch(() => {
    //         return (
    //             <div className="users">
    //             fetch raté
    //             </div>
    //             )
    //     });
    // },[]);
    // console.log(data)
    // return (
    //     <div>
    //         {JSON.stringify(data)}
    //         {/* {JSON.stringify(data).map(({id, username, email}) => {
    //             <Person id={id} username={username} email={email} />
    //         })} */}
    //     </div>
    // );
}        

export default Users;