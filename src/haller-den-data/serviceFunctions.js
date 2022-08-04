import {Episodes, Participants} from "./data";
import {faGrinHearts, faFrown, faMeh} from "@fortawesome/free-solid-svg-icons";

export const getAllEpisodes = () => {
    return Episodes;
}

export const getEpisodeById = (id) => {
    return Episodes.find(e => e.id === parseInt(id));
}

export const getAllParticipants = () => {
    return Participants;
}
export const getParticipantById = (id) => {
    return Participants.find(p => p.id === parseInt(id));
}

export const getParticipantInitials = (participantId) => {
    const participant = getParticipantById(participantId);
    return participant.firstName.charAt(0) + participant.lastName.charAt(0);
}

export const getImageName = (movieName) => {
    let imageName = movieName.replace('å', 'a').replace('ä', 'a').replace('ö', 'o').replace('Å', 'a').replace('Ä', 'a').replace('Ö', 'o');
    return imageName.toLowerCase().replace(/[^a-z]+/g, "");
}

// Fetch TMDb information about the movie.
// Available fields:
// adult: false
// backdrop_path: "/zSRtn62QmYlqUhznOjRJC0yKEzE.jpg"
// belongs_to_collection: null
// budget: 27000000
// genres: Array
// homepage: ""
// id: 2614
// imdb_id: "tt0093260"
// original_language: "en"
// original_title: "Innerspace"
// overview: "Jack Putter..."
// popularity: 16.057
// poster_path: "/9xUBzgWfjCPN3FKVWTAtNiNr7mw.jpg"
// production_companies: Array
// production_countries: Array
// release_date: "1987-06-30"
// revenue: 25893810
// runtime: 120
// spoken_languages: Array
// status: "Released"
// tagline: ""
// title: "24-timmarsjakten"
// video: false
// vote_average: 6.8
// vote_count: 975
export const fetchAndSetMovie = (id, setMovie) => {
    fetch(TMDB_GET_MOVIE_URL + id + TMDB_KEY)
        .then(
            (response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error();
                }
            }
        )
        .then(data => setMovie(data))
        .catch((error) => {
            console.error('Error:', error);
        });
}

export const hallerDenStatus = (episode) => {
    let trueCount = 0;
    let falseCount = 0;
    episode.opinions.map(opinion => opinion.opinion ? trueCount++ : falseCount++)
    if (trueCount === falseCount) {
        return 0;
    } else if (trueCount > falseCount) {
        return 1;
    } else {
        return -1;
    }
}

export const roundToOneDecimal = (number) => {
    return Math.round(number * 10) / 10;
}

export const clearInput = (setSearchParams, searchParams) => {
    setSearchParams({filter: '', sort: searchParams.get('sort')})
}

export const setImageInfo = (setImageInfoClass, setImageInfoMessage, setImageInfoIcon, episode) => {
    const status = hallerDenStatus(episode);
    if (status === 0) {
        setImageInfoClass("haller-lika");
        setImageInfoMessage("Lika");
        setImageInfoIcon(faMeh);
    } else if (status > 0) {
        setImageInfoClass("haller");
        setImageInfoMessage("Håller");
        setImageInfoIcon(faGrinHearts);
    } else {
        setImageInfoClass("haller-inte");
        setImageInfoMessage("Håller inte");
        setImageInfoIcon(faFrown);
    }
}

export const TMDB_GET_MOVIE_URL = "https://api.themoviedb.org/3/movie/";
export const TMDB_GET_IMAGE_URL = "https://image.tmdb.org/t/p/";
export const IMDB_URL = "https://www.imdb.com/title/";
export const TMDB_KEY = "?api_key=fd704954fd54b4c501b8ae4bb7115fc9&language=sv-SE";