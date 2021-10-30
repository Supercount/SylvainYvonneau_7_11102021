import Users from "./Users"
import Messages from "./Messages"

function Contenu ({updateLogin, contenu, idUsed, setId, admin, idLogged}) {
    return (contenu === "Utilisateurs") ? 
            <Users updateLogin={updateLogin} idUsed={idUsed} setId={setId} admin={admin} idLogged={idLogged}/> 
            : 
            <Messages idUsed={idUsed} setId={setId} admin={admin} idLogged={idLogged}/>
}

export default Contenu