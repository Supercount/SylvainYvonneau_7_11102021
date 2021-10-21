import Users from "./Users"
import Messages from "./Messages"

function Contenu ({contenu, updateContenu}) {
    return (contenu === "Utilisateurs") ? 
        <div>
            <Users />
        </div> : 
        <div>
            <Messages />
        </div>

}

export default Contenu