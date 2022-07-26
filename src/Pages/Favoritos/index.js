import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom'

export function Favoritos() {
    const [ filmes, setFilmes ] = useState([]);


    useEffect(() => {
        const minhaLista = localStorage.getItem("@williflix");
        setFilmes(JSON.parse(minhaLista) || [])
    }, []);


    return ( 
        <div className='meus-filmes'>
            <h1>MEUS FILMES</h1>
        
            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>

                            <div>
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
     );
}

export default Favoritos;