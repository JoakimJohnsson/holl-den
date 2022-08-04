import React, {useEffect, useState} from 'react';
import EpisodeCard from "../haller-den-components/EpisodeCard";
import {Episodes} from "../../haller-den-data/data";
import FilterForm from "../haller-den-components/FilterForm";
import {useSearchParams} from "react-router-dom";

const HallerDenPage = () => {
    const [episodes, setEpisodes] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({filter: '', sort: 'movieName'})
    const [reverse, setReverse] = useState(false);

    const filter = searchParams.get('filter');
    const sortType = searchParams.get('sort');


    useEffect(() => {
        const sortArray = type => {
            const types = {
                movieName: 'movieName',
                movieYear: 'movieYear'
            };
            const sortProperty = types[type];
            let sorted;
            if (sortProperty === "movieName") {
                sorted = reverse ?
                    [...Episodes].sort((a, b) => a[sortProperty] < b[sortProperty])
                    :
                    [...Episodes].sort((a, b) => a[sortProperty] > b[sortProperty]);
            } else {
                sorted = reverse ?
                    [...Episodes].sort((a, b) => b[sortProperty] - a[sortProperty])
                    :
                    [...Episodes].sort((a, b) => a[sortProperty] - b[sortProperty]);
            }
            setEpisodes(sorted);
        };
        sortArray(sortType);
    }, [sortType, reverse]);

    return episodes && (
        <main className="container text-black pt-5">
            <div className={"row"}>
                <div className={"col-12 mb-5"}>
                <div className={"col-12 col-sm-8 col-xl-6"}>
                    <p className={"lead"}>Håller den? är podden där roliga personer tittar på en film de gillade förut, och bestämmer sig för om den fortfarande håller. Här kan du se hur det gick.</p>
                </div>
                    <FilterForm filter={filter} searchParams={searchParams} setSearchParams={setSearchParams} sortType={sortType} reverse={reverse} setReverse={setReverse}/>
                </div>

                {episodes
                    .filter(episode => episode.movieName.toLowerCase()
                            .includes(filter.toLowerCase()) ||
                        episode.movieYear.toLowerCase()
                            .includes(filter.toLowerCase()) ||
                        filter === '')
                    .map(episode =>
                        <EpisodeCard key={episode.id} episode={episode}/>
                    )}
            </div>
        </main>
    )
        ;
};

export default HallerDenPage;
