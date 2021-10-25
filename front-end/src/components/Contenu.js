import Users from "./Users"
import Messages from "./Messages"

function Contenu ({logged, updateLogin, contenu, updateContenu, idUsed, setId}) {
    return (contenu === "Utilisateurs") ? 
            <Users logged={logged} updateLogin={updateLogin} idUsed={idUsed} setId={setId}/> 
            : 
            <Messages idUsed={idUsed} setId={setId}/>
}

export default Contenu