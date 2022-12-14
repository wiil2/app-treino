import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./home.css"

//URL /movie/550?api_key=112352509eac962fa4c0d1e70eafccb4

export function Home() {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {

        async function loadFilmes(){
            const response = await api.get("/movie/now_playing", {
                params: {api_key: "112352509eac962fa4c0d1e70eafccb4", language: "pt-BR", page: 1,}})
            //console.log(response.data.results.slice(0, 10))
            setFilmes(response.data.results.slice(0, 10));
            setLoading(false);
            console.log(response.data)
        }
        loadFilmes();
        
        
    }, []);

    if(loading) {
        return (
            <div className="loading">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return ( 
        <div>
            <div className="container">
                <div className="lista-filmes">
                    {filmes.map((filme) => {
                        return (
                            <article key={filme.id}>
                                <strong>{filme.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )
                    })}
                </div>
            </div>
        </div>
     );
}

export default Home;