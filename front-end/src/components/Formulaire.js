import { useState } from "react";
import axios from "axios";

function Formulaire ({logged, updateLogin, form, updateForm}) {
    const [name, updateName] = useState("");
    const [mail, updateMail] = useState("");
    const [password, updatePass] = useState("");
    let loginURL = "http://localhost:3001/api/auth/login";
    let signupURL = "http://localhost:3001/api/auth/signup";

    function login() {
        const user = {email: mail, password: password}
        axios.post(loginURL, user)
        .then((response) => {
            localStorage.setItem("token",response.data.token);
            updateLogin(true);
        })
        .catch((error) => {
            console.log("Connexion refusée");
            alert(error);
        });
    }

    function signup() {
        const user = {email: mail, username: name, password: password}
        axios.post(signupURL, user)
        .then((response) => {
            alert(`${response.data.message}. Vous pouvez vous identifier`)
            console.log(response);
        });
    }

    return ( (form === "Connexion") ? 
        <form>
            <label>
                Email :
                <input id="email" type="email" value={mail} onChange={(e) => updateMail(e.target.value)}/>
            </label>
            <label>
                Mot de passe :
                <input id="password" type="password" value={password} onChange={(e) => updatePass(e.target.value)}/>
            </label>
            <input type="button" onClick={login} value="Se connecter" />
        </form> :  (form === "Inscription") ?
        <form>
            <label>
                email :
                <input id="email" type="email" value={mail} onChange={(e) => updateMail(e.target.value)}/>
            </label>
            <label>
                Nom d'utilisateur :
                <input id="password" type="text" value={name} onChange={(e) => updateName(e.target.value)}/>
            </label>
            <label>
                Mot de passe :
                <input id="password" type="password" value={password} onChange={(e) => updatePass(e.target.value)}/>
            </label>
            <input type="button" onClick={signup} value="S'inscrire" />
        </form> : null
    )
}

export default Formulaire;