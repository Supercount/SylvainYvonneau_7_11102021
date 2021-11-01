import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Formulaire.css'

function Formulaire ({updateLogin, form, setAdmin, setLogged}) {
    const [name, updateName] = useState("");
    const [mail, updateMail] = useState("");
    const [password, updatePass] = useState("");
    const [passVerif, updateVerif] = useState("");
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
            if (response.data.admin === 1) {
                setAdmin(true);
            }
            setLogged(response.data.id);
            updateLogin(true);
        })
        .catch((error) => {
            alert("Connexion refusée : " + error);
        });
    }

    function signup(e) {
        e.preventDefault();
        if (passVerif !== password) {
            alert("Les deux mots de passe renseignés ne sont pas identiques!");
        } else {
            if (mail === '' || name === '' || password === '') {
                alert("Veuillez remplir tous les champs");
            } else {
                const user = {email: mail, username: name, password: password}
                axios.post(signupURL, user)
                .then((response) => {
                    alert(`${response.data.message}. Vous pouvez vous identifier`)
                })
                .catch(() => alert(`Inscription refusée`));
            }
        }
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
            <label>
                Confirmez le mot de passe : 
                <input className="formulaire--champ" type="password" value={passVerif} onChange={(e) => updateVerif(e.target.value)}/>
            </label>
            <input className="formulaire--bouton" type="submit" onClick={signup} value="S'inscrire" />
        </form>
    </div> : null
    )
}

export default Formulaire;