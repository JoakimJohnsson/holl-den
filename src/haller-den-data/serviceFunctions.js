import {Episodes, Participants} from "./data";

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

export const getImageName = (movieName) => {
    let imageName = movieName.replace('å', 'a').replace('ä', 'a').replace('ö', 'o').replace('Å', 'a').replace('Ä', 'a').replace('Ö', 'o');
    return imageName.toLowerCase().replace(/[^a-z]+/g, "");
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

export const clearInput = (setFilter) => {
    setFilter('')
}

export const setImageInfo = (setImageInfoClass, setImageInfoMessage, setImageInfoIcon, episode, faGrinHearts, faFrown, faMeh) => {
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