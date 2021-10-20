// import { useState, useEffect } from 'react'


function Menu ({logged, updateLogin, form, updateForm}) {
    return (logged ? 
        <ul className="banniere--menu">
          <li onClick={() => updateLogin(false)}>Deconnexion</li>
        </ul>
        : 
        <ul className="banniere--menu">
          <li onClick={() => updateForm("Connexion")}>Connexion</li>
          <li onClick={() => updateForm("Inscription")}>Inscription</li>
        </ul>)
}

export default Menu;