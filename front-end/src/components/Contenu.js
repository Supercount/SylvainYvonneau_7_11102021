import Users from "./Users"
import Messages from "./Messages"

function Contenu ({logged, updateLogin, contenu, updateContenu, idUsed, setId}) {
    return (contenu === "Utilisateurs") ? 
        <div>
            <Users logged={logged} updateLogin={updateLogin} idUsed={idUsed} setId={setId}/>
        </div> : 
        <div>
            <Messages idUsed={idUsed} setId={setId}/>
        </div>

}

export default Contenu