import "./header.css";
import { Link } from 'react-router-dom';


export function Header() {
    return ( 
        <header>
            <Link to="/" className="logo">WILLIFLIX</Link>
            <Link to="/favoritos" className="favoritos">Meus Filmes</Link>
        </header> 
     );
}

export default Header;