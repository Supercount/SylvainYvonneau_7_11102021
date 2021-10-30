

function Menu ({logged, updateLogin, updateForm, setAdmin, setLogged}) {
    
    function logout() {
        localStorage.removeItem("token");
        updateLogin(false);
        setLogged(0);
        setAdmin(false);
    }

    return (
        logged ? 
            <ul className="banniere--menu">
                <li onClick={() => logout()}>Deconnexion</li>
            </ul>
        :
            <ul className="banniere--menu">
                <li onClick={() => updateForm("Connexion")}>Connexion</li>
                <li onClick={() => updateForm("Inscription")}>Inscription</li>
            </ul>
    )
}

export default Menu;