import { useState } from "react";


function Formulaire ({form, updateForm}) {
    const [post, setPost] = useState(null);
    let loginURL = "localhost:3000/api/auth/login";
    let signupURL = "localhost:3000/api/auth/signup";

    function login(mail,password) {
        axios.post(loginURL, {
            email: mail,
            password: password
        })
        .then((response) => {
            setPost(response.data);
        });
    }
    
    return ( (form === "Connexion") ? 
        <form>
            <label>
                Email :
                <input type="text" />
            </label>
            <label>
                Mot de passe :
                <input type="text" />
            </label>
            <input type="submit" value="Envoyer" />
        </form> :  (form === "Inscription") ?
        <form>
            <label>
                email :
                <input type="text"/>
            </label>
            <label>
                Nom d'utilisateur :
                <input type="text"/>
            </label>
            <label>
                Mot de passe :
                <input type="text"/>
            </label>
            <input type="submit" value="Envoyer" />
        </form> : null
    )
}

export default Formulaire;