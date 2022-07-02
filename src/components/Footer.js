import React from 'react';
import tmdbLogo from '../images/tmdb-logo.svg';


const Footer = () => {

    return (
        <footer className={"w-100 p-5 text-black text-center border-top"}>



                        <p className={"m-0 small"}>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
            <a href={"https://www.themoviedb.org/"} title={"TMDb hemsida"}><img className={"tmdb-logo"} src={tmdbLogo} alt={"TMDb logo"}/></a>



        </footer>
    )
};

export default Footer;
