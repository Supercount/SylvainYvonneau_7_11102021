import Users from "./Users"
import Messages from "./Messages"

function Contenu ({contenu, updateContenu, idUsed, setId}) {
    return (contenu === "Utilisateurs") ? 
        <div>
            <Users idUsed={idUsed} setId={setId}/>
        </div> : 
        <div>
            <Messages idUsed={idUsed} setId={setId}/>
        </div>

}

export default Contenu