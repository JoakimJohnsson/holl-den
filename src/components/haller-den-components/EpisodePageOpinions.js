import React, {useEffect, useState} from 'react';
import {getParticipantById} from "../../haller-den-data/serviceFunctions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGrinHearts, faFrown} from "@fortawesome/free-solid-svg-icons";

const EpisodePageOpinions = ({opinion}) => {
    const [participant, setParticipant] = useState({});

    useEffect(() => {
        setParticipant(getParticipantById(opinion.participantId))
    }, [opinion.participantId]);

    return (
        <div className={"bg-light mb-2 text-center"}>
            <h2 className={opinion.opinion ? "mb-0 p-3 green-icon " : "mb-0 p-3 red-icon "}>
                <span className={"me-2"}>{participant.firstName} {participant.lastName}</span>
                {opinion.opinion ?
                    <FontAwesomeIcon icon={faGrinHearts} size="1x" aria-label={"håller"}/>
                    :
                    <FontAwesomeIcon icon={faFrown} size="1x" aria-label={"håller inte"}/>}
            </h2>
        </div>

    );
};
export default EpisodePageOpinions;
