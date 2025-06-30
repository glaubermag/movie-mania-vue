
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Para demonstração, vou usar dados mock já que não temos a chave da API
const mockMovies = [
  {
    id: 1,
    title: "Avatar: O Caminho da Água",
    overview: "Passaram-se mais de dez anos desde os acontecimentos de Avatar. Jake Sully vive com sua nova família no planeta Pandora. Quando uma ameaça familiar retorna para terminar o que começou anteriormente, Jake deve trabalhar com Neytiri e o exército da raça Na'vi para proteger o seu planeta.",
    poster_path: "/photo-1526374965328-7f61d4dc18c5",
    backdrop_path: "/photo-1526374965328-7f61d4dc18c5",
    release_date: "2022-12-16",
    vote_average: 7.6,
    genre_ids: [878, 12, 14],
    price: 24.99
  },
  {
    id: 2,
    title: "Matrix Resurrections",
    overview: "Neo vive uma vida aparentemente comum sob sua identidade original como Thomas A. Anderson em San Francisco, indo regularmente a um terapeuta para tratar de sua obsessão com sonhos estranhos. Neo continua a se encontrar com pessoas que parecem familiares...",
    poster_path: "/photo-1526374965328-7f61d4dc18c5",
    backdrop_path: "/photo-1526374965328-7f61d4dc18c5",
    release_date: "2021-12-22",
    vote_average: 6.7,
    genre_ids: [878, 28],
    price: 19.99
  },
  {
    id: 3,
    title: "Duna",
    overview: "Paul Atreides, um jovem brilhante e talentoso nascido com um grande destino que vai além da sua compreensão, tem de viajar para o planeta mais perigoso do universo para garantir o futuro da sua família e do seu povo.",
    poster_path: "/photo-1526374965328-7f61d4dc18c5",
    backdrop_path: "/photo-1526374965328-7f61d4dc18c5",
    release_date: "2021-10-21",
    vote_average: 8.0,
    genre_ids: [878, 12],
    price: 22.99
  },
  {
    id: 4,
    title: "Homem-Aranha: Sem Volta Para Casa",
    overview: "Peter Parker tem a sua identidade secreta revelada e pede ajuda ao Doutor Estranho. Quando um feitiço para reverter o evento não corre como esperado, perigosos inimigos de outros universos começam a aparecer.",
    poster_path: "/photo-1526374965328-7f61d4dc18c5",
    backdrop_path: "/photo-1526374965328-7f61d4dc18c5",
    release_date: "2021-12-17",
    vote_average: 8.4,
    genre_ids: [28, 12, 878],
    price: 21.99
  },
  {
    id: 5,
    title: "Top Gun: Maverick",
    overview: "Depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, Pete 'Maverick' Mitchell está onde pertence, empurrando os limites como um corajoso piloto de testes.",
    poster_path: "/photo-1526374965328-7f61d4dc18c5",
    backdrop_path: "/photo-1526374965328-7f61d4dc18c5",
    release_date: "2022-05-27",
    vote_average: 8.3,
    genre_ids: [28, 18],
    price: 23.99
  },
  {
    id: 6,
    title: "Doutor Estranho no Multiverso da Loucura",
    overview: "O Doutor Estranho desperta o Multiverso e empurra os seus limites além do conhecido, navegando por mundos novos e perigosos com a ajuda de aliados místicos tanto velhos quanto novos.",
    poster_path: "/photo-1526374965328-7f61d4dc18c5",
    backdrop_path: "/photo-1526374965328-7f61d4dc18c5",
    release_date: "2022-05-06",
    vote_average: 7.3,
    genre_ids: [14, 28, 878],
    price: 20.99
  }
];

export const getPopularMovies = async () => {
  // Simulando delay da API
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockMovies;
};

export const searchMovies = async (query: string) => {
  // Simulando busca
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockMovies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.overview.toLowerCase().includes(query.toLowerCase())
  );
};

export const getImageUrl = (path: string) => {
  return `https://images.unsplash.com/${path}?auto=format&fit=crop&w=500&q=80`;
};
