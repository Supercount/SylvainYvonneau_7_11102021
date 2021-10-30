import axios from "axios";

function Delete ({updateLogin, idPost, idComment, setId, idUsed, admin, idLogged, type}) {

    function logout() {
        localStorage.removeItem("token");
        updateLogin(false);
    }

    function userDelete() {
        let baseURL = `http://localhost:3001/api/auth/${idUsed}`;
        let token = localStorage.getItem("token");
        axios.delete(baseURL, {
            headers: {
              Authorization: 'Bearer ' + token
            }
           })
        .then(() => logout())
        .catch(() => alert("Vous n'êtes pas autorisé à supprimer ce compte!"));
    }

    function messageDelete() {
        let baseURL = `http://localhost:3001/api/post/${idPost}`;
        let token = localStorage.getItem("token");
        axios.delete(baseURL, {
            headers: {
              Authorization: 'Bearer ' + token
            }
        })
        .then(() => {
            alert("Message supprimé");
            setId(0);
        })
        .catch(() => {
            alert("Problème lors de la suppression du message!");
        });
    }

    function commentDelete() {
        let baseURL = `http://localhost:3001/api/post/${idPost}/comment/${idComment}`;
        let token = localStorage.getItem("token");
        axios.delete(baseURL, {
            headers: {
              Authorization: 'Bearer ' + token
            }
           })
        .then(() => {
            setId(0);
            setId(idPost);
            alert("réponse supprimée");
        })
        .catch(() => alert("Vous n'êtes pas autorisé à supprimer cette réponse!"));
    }

    if (type === "User") {
        if ((idUsed === idLogged) || (admin === true)) {
            return (
                <input type="button" value="Supprimer" className="bouton--delete" onClick={() => userDelete()} />
            )
        } else {
            return null;
        }
    } else if (type === "Message") {
        if ((idUsed === idLogged) || (admin === true)) {
            return (
                <p className="text--action" onClick={() => messageDelete()}>Supprimer le post</p>
            )
        } else {
            return null;
        }
    } else if (type=== "Comment") {
        if ((idUsed === idLogged) || (admin === true)) {
            return (
                <p className="text--action" onClick={() => commentDelete()}>Supprimer la réponse</p>
            )
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export default Delete