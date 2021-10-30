import '../styles/Banner.css';
import Menu from './Menu';

function Banner ({logged, updateLogin, form, updateForm, admin, setAdmin, idLogged, setLogged}) {
    return (
        <div className="banniere">
            <img className="banniere--logo" src="/icon-white.png" alt="Grouporama"/>
            <Menu logged={logged} updateLogin={updateLogin} updateForm={updateForm} setAdmin={setAdmin} setLogged={setLogged}/>
        </div>
    )
}

export default Banner;