import { useState, useEffect } from 'react'


function Menu ({login, updateLogin, form, updateForm}) {
    return (login ? 
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