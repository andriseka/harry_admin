import React from 'react'
import Oraganisasi from '../Oraganisasi'
import { Link, useLocation, useParams } from 'react-router-dom';

const Konstituen = ({ children }) => {
    const location = useLocation();
    const {username} = useParams();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const active = splitLocation[4];

    const redirect = () => {
        return window.location.href = `/${username}/organisasi/konstituen/data`;
    }


    return (
        <Oraganisasi>
            <div>
                <div className="card">
                    <div className="card-body">
                        <nav className="responsive-nav md:m-0 -mx-4">
                            <ul>
                                <li className={` me-4 ${active === "form" ? "uk-active" : ""}`}>
                                    <Link to={`/${username}/organisasi/konstituen/form`}>
                                        Buat Konstituen
                                    </Link>
                                </li>
                                <li className={active === "data" ? "uk-active" : ""}>
                                    <Link onClick={redirect}>
                                        Data Konstituen
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

export default Konstituen
