import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'

export function Favoritos() {
    const [ filmes, setFilmes ] = useState([]);


    useEffect(() => {
        const minhaLista = localStorage.getItem("@williflix");
        setFilmes(JSON.parse(minhaLista) || [])
    }, []);

    function excluirFilme(id) {
        const filmesFiltrados = filmes.filter((item) => {
            return( item.id !== id )
        })
        setFilmes(filmesFiltrados);
        localStorage.setItem("@williflix", JSON.stringify(filmesFiltrados));
        toast.success("Filme removido com sucesso", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    }


    return ( 
        <div className='meus-filmes'>
            <h1>MEUS FILMES</h1>

            {filmes.length === 0 && <span>Você não salvou nenhum filme ainda :(</span>}
        
            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>

                            <div>
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button onClick={ () => excluirFilme(item.id) }>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
     );
}

export default Favoritos;