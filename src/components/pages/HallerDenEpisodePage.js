import React, {useEffect, useState} from 'react';
import {getEpisodeById, getImageName, setImageInfo} from "../../haller-den-data/serviceFunctions";
import EpisodePageOpinions from "../haller-den-components/EpisodePageOpinions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useParams} from "react-router-dom";
import {hallerDenImages} from "../../haller-den-data/images";

const HallerDenEpisodePage = () => {
    const [trimmedMovieName, setTrimmedMovieName] = useState("placeholder");
    const [imageInfoClass, setImageInfoClass] = useState("");
    const [imageInfoMessage, setImageInfoMessage] = useState("");
    const [imageInfoIcon, setImageInfoIcon] = useState("meh");
    const [episode, setEpisode] = useState([]);
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

    return episode ? (
            <main className="container pt-5 text-black">
                <div className={"row"}>
                    <div className={"col-12 col-sm-8 offset-sm-2"}>
                        <Link className={"btn btn-primary mb-3"} to={"/"}><FontAwesomeIcon icon={"chevron-left"} className={"me-2"}/>Tillbaka</Link>
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
                                    <p className={"card-sub-title"}>{episode.movieYear}</p>
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
