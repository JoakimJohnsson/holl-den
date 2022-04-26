import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGrinHearts, faFrown} from "@fortawesome/free-solid-svg-icons";

const EpisodeCardOpinions = ({opinion}) => {

    return (
        opinion.opinion ?
            <FontAwesomeIcon className={"mx-1 green-icon"} icon={faGrinHearts} size="1x" aria-label={"Håller"}/>
            :
            <FontAwesomeIcon className={"mx-1 red-icon"} icon={faFrown} size="1x" aria-label={"Håller inte"}/>
    );
};
export default EpisodeCardOpinions;
