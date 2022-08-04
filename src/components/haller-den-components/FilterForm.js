import React from 'react';
import {clearInput} from "../../haller-den-data/serviceFunctions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faFilter, faArrowDown19, faArrowUp19, faArrowDownAZ, faArrowUpAZ} from "@fortawesome/free-solid-svg-icons";

const FilterForm = ({filter, searchParams, setSearchParams, sortType, reverse, setReverse}) => {

    return (
        <div className={"form-group"}>
            <div className="col-12 col-md-8 col-xl-6 mb-2">
                <label className={"text-black form-label"} htmlFor="filter">Filtrera</label>
                <div className="input-group">
                    <span className="input-group-text text-black" id="basic-addon1"><FontAwesomeIcon icon={faFilter}/></span>
                    <input id="filter"
                           name="filter"
                           type="text"
                           className="form-control bg-white text-black"
                           placeholder={"Filtrera på namn eller årtal"}
                           value={filter}
                           onChange={e => setSearchParams({filter: e.target.value, sort: searchParams.get('sort')})}
                           aria-describedby="basic-addon1"
                    />
                    {filter !== '' ?
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={() => clearInput(setSearchParams)}>
                                <FontAwesomeIcon icon={faTimes} className={"me-2"}/>
                                Rensa
                            </button>
                        </div>
                        :
                        ''
                    }
                </div>
            </div>
            <div className="col-12 col-sm-8 col-lg-4">
                <label className={"text-black form-label"} htmlFor="filter-sort-select">Välj sortering</label>
                <div className="input-group">
                    <select id={"filter-sort-select"}
                            className={"form-control bg-white text-black"}
                            onChange={e => setSearchParams({filter: searchParams.get('filter'), sort: e.target.value})}
                            aria-label="Default select example">
                        <option value="movieName">Namn</option>
                        <option value="movieYear">Årtal</option>
                    </select>
                    <button
                        className={"btn btn-primary "}
                        type={"button"}
                        onClick={() => setReverse(!reverse)}
                        aria-label={"Omvänd ordning"}>
                        {
                            sortType === "movieName" ?
                                reverse ?
                                    <FontAwesomeIcon icon={faArrowUpAZ} aria-label={"Sortera a till z"}/>
                                    :
                                    <FontAwesomeIcon icon={faArrowDownAZ} aria-label={"Sortera z till a"}/>
                                :
                                reverse ?
                                    <FontAwesomeIcon icon={faArrowUp19} aria-label={"Sortera 0 till 9"}/>
                                    :
                                    <FontAwesomeIcon icon={faArrowDown19} aria-label={"Sortera 9 till 0"}/>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
};
export default FilterForm;
