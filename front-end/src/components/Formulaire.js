import { useEffect, useState } from "react";
import axios from "axios";


function Formulaire ({logged, updateLogin, form, updateForm}) {
    const [name, updateName] = useState("");
    const [mail, updateMail] = useState("");
    const [password, updatePass] = useState("");
    let loginURL = "http://localhost:3000/api/auth/login";
    let signupURL = "http://localhost:3000/api/auth/signup";

    function login() {
        console.log(password);
        console.log(mail);
        const user = {email: mail, password: password}
        axios.post(loginURL, user)
        // fetch(loginURL, {
        //     method: "POST",
        //     headers: { 
        //         'Accept': 'application/json', 
        //         'Content-Type': 'application/json' 
        //     },
        //     body: JSON.stringify(user)
        // })
        .then((response) => {
            localStorage.setItem("token",response.data.token);
            updateLogin(true);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function signup() {
        const user = {email: mail, username: name, password: password}
        axios.post(signupURL, user)
        // fetch(loginURL, {
        //     method: "POST",
        //     headers: { 
        //         'Accept': 'application/json', 
        //         'Content-Type': 'application/json' 
        //     },
        //     body: JSON.stringify(user)
        // })
        .then((response) => {
            setToken(response.token);
            console.log(response);
        });
    }

        // let bouton = document.getElementById("valid");

        // useEffect(() => {
        //     let postURL = `http://localhost:3000/api/post/${idUsed}/comment`;
        //     axios.get(postURL).then((response) => {
        //         setComment(response.data);
        //     });
        // }, [idUsed]
        // );

        // if (form === "Connexion") {
        //     bouton.addEventListener("click",login);
        // } else {
        //     bouton.addEventListener("click",signup);
        // }

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