import React, {useEffect, useState} from 'react';
import {
    fetchAndSetMovie,
    getEpisodeById,
    IMDB_URL,
    setImageInfo, TMDB_GET_IMAGE_URL
} from "../../haller-den-data/serviceFunctions";
import EpisodePageOpinions from "../haller-den-components/EpisodePageOpinions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useParams} from "react-router-dom";
import {faChevronLeft, faMeh, faQuoteRight} from "@fortawesome/free-solid-svg-icons";
import {faImdb} from "@fortawesome/free-brands-svg-icons";

const HallerDenEpisodePage = () => {
    const [imageInfoClass, setImageInfoClass] = useState("");
    const [imageInfoMessage, setImageInfoMessage] = useState("");
    const [imageInfoIcon, setImageInfoIcon] = useState(faMeh);
    const [episode, setEpisode] = useState([]);
    const [movie, setMovie] = useState({});
    const {id} = useParams();

    useEffect(() => {
        setEpisode(getEpisodeById(id))
        if (episode.movieName) {
            setImageInfo(setImageInfoClass, setImageInfoMessage, setImageInfoIcon, episode);
            document.title = 'Höll den? | ' + episode.movieName;
        }
    }, [id, episode]);

    useEffect(() => {
        fetchAndSetMovie(id, setMovie);
    }, [id]);

    return episode && movie ? (
            <main className="container py-5 text-black">
                <div className={"row"}>
                    <div className={"col-12 col-sm-8 offset-sm-2"}>
                        <Link className={"btn btn-primary mb-3"} to={"/"}><FontAwesomeIcon icon={faChevronLeft} className={"me-2"}/>Tillbaka</Link>
                        <div className={"hd-episode-card-wrapper text-white"}>
                            <div className={"card opacity-5"}>
                                <div className={"hd-episode-image-wrapper position-relative"}>
                                    <img src={TMDB_GET_IMAGE_URL + "w1280" + movie.backdrop_path} className="card-img-top" alt={`Movie ${episode.movieName}`}/>
                                    <div className={`hd-episode-image-info font-weight-bold ${imageInfoClass}`}>
                                        <FontAwesomeIcon icon={imageInfoIcon} size="2x" aria-label={imageInfoMessage}/>
                                    </div>
                                </div>
                                <div className={"card-body"}>
                                    <h2 className={"card-title mb-0 "}>{episode.movieName} </h2>
                                    <div className={"d-flex justify-content-between align-items-center mb-2"}>
                                        <p className={"card-sub-title m-0"}>
                                            <span className={"me-2"}>{episode.movieYear}</span>
                                            <span className={"me-2"}>-</span>
                                            <span>TMDb betyg: {movie.vote_average}</span>
                                        </p>
                                    </div>
                                    <div className={"row mb-3"}>
                                        <div className={"col-12 col-lg-3"}>
                                            <img className={"w-100 mb-3 mb-lg-0"} src={TMDB_GET_IMAGE_URL + "w500" + movie.poster_path} alt={"Filmaffisch"}/>
                                        </div>
                                        <div className={"col-12 col-lg-9"}>
                                            <p className={"small fst-italic px-2"}><FontAwesomeIcon icon={faQuoteRight} size="2x" className={"me-2"}/>{movie.overview}</p>
                                            <p className={"m-0"}><a lang="en" aria-label={"International movie database"} href={IMDB_URL + movie.imdb_id}><FontAwesomeIcon icon={faImdb} size="2x"/></a></p>
                                        </div>
                                    </div>
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
