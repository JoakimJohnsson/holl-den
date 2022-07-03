import React, {useEffect, useState} from 'react';
import {getEpisodeById, getImageName, IMDB__URL, setImageInfo, TMDB_GET_MOVIE_URL, TMDB_KEY} from "../../haller-den-data/serviceFunctions";
import EpisodePageOpinions from "../haller-den-components/EpisodePageOpinions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useParams} from "react-router-dom";
import {hallerDenImages} from "../../haller-den-data/images";
import {faChevronLeft, faMeh, faQuoteRight} from "@fortawesome/free-solid-svg-icons";
import {faImdb} from "@fortawesome/free-brands-svg-icons";

const HallerDenEpisodePage = () => {
    const [trimmedMovieName, setTrimmedMovieName] = useState("placeholder");
    const [imageInfoClass, setImageInfoClass] = useState("");
    const [imageInfoMessage, setImageInfoMessage] = useState("");
    const [imageInfoIcon, setImageInfoIcon] = useState(faMeh);
    const [episode, setEpisode] = useState([]);
    const [movie, setMovie] = useState({});
    const {id} = useParams();

    useEffect(() => {
        setEpisode(getEpisodeById(id))
        if (episode.movieName) {
            const name = getImageName(episode.movieName);
            setTrimmedMovieName(name);
            setImageInfo(setImageInfoClass, setImageInfoMessage, setImageInfoIcon, episode);
            document.title = 'Höll den? | ' + episode.movieName;
        }
    }, [id, episode]);

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

    useEffect(() => {
        fetch(TMDB_GET_MOVIE_URL + id + TMDB_KEY)
            .then(response => response.json())
            .then(data => setMovie(data));
    }, [id]);

    return episode && movie ? (
            <main className="container py-5 text-black">
                <div className={"row"}>
                    <div className={"col-12 col-sm-8 offset-sm-2"}>
                        <Link className={"btn btn-primary mb-3"} to={"/"}><FontAwesomeIcon icon={faChevronLeft} className={"me-2"}/>Tillbaka</Link>
                        <div className={"hd-episode-card-wrapper text-white"}>
                            <div className={"card opacity-5"}>
                                <div className={"hd-episode-image-wrapper position-relative"}>
                                    <img src={hallerDenImages[trimmedMovieName]} className="card-img-top" alt={`Movie ${episode.movieName}`}/>
                                    <div className={`hd-episode-image-info font-weight-bold ${imageInfoClass}`}>
                                        <FontAwesomeIcon icon={imageInfoIcon} size="2x" aria-label={imageInfoMessage}/>
                                    </div>
                                </div>
                                <div className={"card-body"}>
                                    <h2 className={"card-title mb-0 "}>{episode.movieName} </h2>
                                    <p className={"card-sub-title"}>
                                        <span className={"me-2"}>{episode.movieYear}</span>
                                        <span className={"me-2"}>-</span>
                                        <a className={"me-2"} href={IMDB__URL + movie.imdb_id}><FontAwesomeIcon icon={faImdb} className={"me-2"}/>IMDb</a>
                                        <span className={"me-2"}>-</span>
                                        <span>TMDb betyg: {movie.vote_average}</span>
                                    </p>
                                    <p className={"small fst-italic"}><FontAwesomeIcon icon={faQuoteRight} size="2x" className={"me-2"}/>{movie.overview}</p>
                                    {
                                        episode.opinions &&
                                        episode.opinions.map(opinion => <EpisodePageOpinions key={opinion.participantId} opinion={opinion}/>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
        :
        (
            <p>Loading...</p>
        );
};

export default HallerDenEpisodePage;
