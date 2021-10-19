import '../styles/Banner.css';
import Menu from './Menu';

function Banner ({login, updateLogin, form, updateForm}) {
    return (
        <div className="banniere">
            <img className="banniere--logo" src="/icon-black.png" alt="Grouporama"/>
            <Menu login={login} updateLogin={updateLogin} form={form} updateForm={updateForm}/>
        </div>
    )
}

export default Banner;