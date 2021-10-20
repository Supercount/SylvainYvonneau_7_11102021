import '../styles/Banner.css';
import Menu from './Menu';

function Banner ({logged, updateLogin, form, updateForm}) {
    return (
        <div className="banniere">
            <img className="banniere--logo" src="/icon-black.png" alt="Grouporama"/>
            <Menu logged={logged} updateLogin={updateLogin} form={form} updateForm={updateForm}/>
        </div>
    )
}

export default Banner;