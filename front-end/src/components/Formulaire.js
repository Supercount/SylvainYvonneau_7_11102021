

function Formulaire ({form, updateForm}) {
    
    
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