import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {faTicket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Header = () => {

    return (
                <header className="border-bottom">
                    <Navbar className="navbar-header navbar-header__variant justify-content-between align-items-center py-3 py-sm-4" bg="light"
                            variant="light"
                            expand="md" aria-label="Header navigation">
                        <div className="container">
                            <h1 className="m-0 logo-font-family__4 text-black"><FontAwesomeIcon icon={faTicket} className={"me-2"}/> Höll den?</h1>
                        </div>
                    </Navbar>
                </header>
            )
};

export default Header;
