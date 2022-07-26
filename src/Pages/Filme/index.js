import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import './filme-info.css';

export function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            async function loadFilme() {
                await api.get(`/movie/${id}`, {
                    params: {api_key: "112352509eac962fa4c0d1e70eafccb4", language: "pt-BR"}    
                }).then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                }).catch(() => {
                    console.log("FILME NÃO ENCONTRADO");
                    navigate("/", { replace: true});
                    return;
                })
        } 
        loadFilme();
    }, [navigate, id]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@williflix");
        const filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilm = filmesSalvos.some( (filmeSalvos) => filmeSalvos.id === filme.id )

        if(hasFilm){
            alert("ESSE FILME JÁ ESTÁ NA LISTA")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@williflix", JSON.stringify(filmesSalvos))
        alert("FILME SALVO COM SUCESSO")
    }

    if(loading) {
        return (
            <div className="loading">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return ( 
        <div className="filme-info">
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
  
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avalição: {filme.vote_average} / 10</strong>
  
        <div className="area-buttons">
          <button onClick={salvarFilme}>Salvar</button>
          <button>
            <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
              Trailer
            </a>
          </button>
        </div>
  
      </div>
     );
}

export default Filme;