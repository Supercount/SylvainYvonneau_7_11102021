import { useState, useEffect } from 'react'
import Banner from './Banner';
import Footer from './Footer';
import '../styles/App.css';

function App() {
  const [login, updateLogin] = useState(true);
  const [form, updateForm] = useState("Connexion");
  return (
    <div className="App">
      <Banner login={login} updateLogin={updateLogin} form={form} updateForm={updateForm}/>
      <Footer/>
    </div>
    );
  }
  
  export default App;
  