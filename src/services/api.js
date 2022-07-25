import axios from "axios";

//API URL  /movie/550?api_key=112352509eac962fa4c0d1e70eafccb4
//BASE DA URL - https://api.themoviedb.org/3

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;