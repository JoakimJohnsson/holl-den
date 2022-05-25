import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGrinHearts, faFrown} from "@fortawesome/free-solid-svg-icons";
import {getParticipantInitials} from "../../haller-den-data/serviceFunctions";

const EpisodeCardOpinions = ({opinion}) => {

    return (
        opinion.opinion ?
            <div className={"mx-2"}>
                <p className={"m-0 small"}>{getParticipantInitials(opinion.participantId)}</p>
                <FontAwesomeIcon className={"green-icon"} icon={faGrinHearts} size="2x" aria-label={"Håller"}/>
            </div>
            :
            <div className={"mx-2"}>
                <p className={"m-0 small"}>{getParticipantInitials(opinion.participantId)}</p>
                <FontAwesomeIcon className={"red-icon"} icon={faFrown} size="2x" aria-label={"Håller inte"}/>
            </div>
    );
};
export default EpisodeCardOpinions;
