import React from 'react'
import Oraganisasi from '../Oraganisasi'
import { Link, useLocation, useParams } from 'react-router-dom';

const Timses = ({ children }) => {
    const location = useLocation();
    const {username} = useParams();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const active = splitLocation[4];

    return (
        <Oraganisasi>
            <div>
                <div className="card">
                    <div className="card-body">
                        <nav className="responsive-nav md:m-0 -mx-4">
                            <ul>
                                <li className={` me-4 ${active === "form" ? "uk-active" : ""}`}>
                                    <Link to={`/${username}/organisasi/timses/form`}>
                                        Buat Struktur
                                    </Link>
                                </li>
                                <li className={active === "data" ? "uk-active" : ""}>
                                    <Link to={`/${username}/organisasi/timses/data`}>
                                        Data Struktur
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="mt-6">
                    {children}
                </div>
            </div>
        </Oraganisasi>
    )
}

export default Timses
