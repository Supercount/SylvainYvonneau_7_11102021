import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Formulaire.css'

function Formulaire ({logged, updateLogin, form, updateForm}) {
    const [name, updateName] = useState("");
    const [mail, updateMail] = useState("");
    const [password, updatePass] = useState("");
    let loginURL = "http://localhost:3001/api/auth/login";
    let signupURL = "http://localhost:3001/api/auth/signup";

    useEffect(() => {
        updateName("");
        updatePass("");
        updateMail("");
    },[form]);

    function login(e) {
        e.preventDefault();
        const user = {email: mail, password: password}
        axios.post(loginURL, user)
        .then((response) => {
            localStorage.setItem("token",response.data.token);
            updateLogin(true);
        })
        .catch(() => {
            alert("Connexion refusée");
        });
    }

    function signup(e) {
        e.preventDefault();
        const user = {email: mail, username: name, password: password}
        axios.post(signupURL, user)
        .then((response) => {
            alert(`${response.data.message}. Vous pouvez vous identifier`)
        })
        .catch(() => alert(`Inscription refusée`));
    }

    return ( (form === "Connexion") ? 
    <div className="formulaire">
        <h1>Connexion</h1>
        <form>
            <label >
                Email : 
                <input className="formulaire--champ" type="email" value={mail} onChange={(e) => updateMail(e.target.value)}/>
            </label>
            <label >
                Mot de passe : 
                <input className="formulaire--champ" type="password" value={password} onChange={(e) => updatePass(e.target.value)}/>
            </label>
            <input className="formulaire--bouton" type="submit" onClick={login} value="Se connecter" />
        </form>
    </div> :  (form === "Inscription") ?
    <div className="formulaire">
        <h1>Inscription</h1>
        <form>
            <label >
                Email : 
                <input className="formulaire--champ" type="email" value={mail} onChange={(e) => updateMail(e.target.value)}/>
            </label>
            <label >
                Nom d'utilisateur : 
                <input className="formulaire--champ" type="text" value={name} onChange={(e) => updateName(e.target.value)}/>
            </label>
            <label>
                Mot de passe : 
                <input className="formulaire--champ" type="password" value={password} onChange={(e) => updatePass(e.target.value)}/>
            </label>
            <input className="formulaire--bouton" type="submit" onClick={signup} value="S'inscrire" />
        </form>
    </div> : null
    )
}

export default Formulaire;