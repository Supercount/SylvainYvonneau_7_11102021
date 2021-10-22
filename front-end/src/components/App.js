import { useState } from 'react'
import Banner from './Banner';
import Main from './Main';
import Footer from './Footer';
import '../styles/App.css';

function App() {
  const [logged, updateLogin] = useState(true);
  const [contenu, updateContenu] = useState("Connexion");
  return (
    <div className="App">
      <Banner logged={logged} updateLogin={updateLogin} form={contenu} updateForm={updateContenu}/>
      <Main logged={logged} updateLogin={updateLogin} form={contenu} updateForm={updateContenu} />
      <Footer/>
    </div>
    );
  }
  
  export default App;
  