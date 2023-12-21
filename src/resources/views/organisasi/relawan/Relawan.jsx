import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import Organisasi from '../Oraganisasi'

const Relawan = ({ children }) => {
    const location = useLocation();
    const {username} = useParams();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const active = splitLocation[4];

    const redirect = () => {
        return window.location.href = `/${username}/organisasi/relawan/data`;
    }

    return (
        <Organisasi>
            <div>
                <div className="card">
                    <div className="card-body">
                        <nav className="responsive-nav md:m-0 -mx-4">
                            <ul>
                                <li className={` me-4 ${active === "form" ? "uk-active" : ""}`}>
                                    <Link to={`/${username}/organisasi/relawan/form`}>
                                        Buat Relawan
                                    </Link>
                                </li>
                                <li className={` me-4 ${active === "data" ? "uk-active" : ""}`}>
                                    <Link onClick={redirect}>
                                        Data Relawan
                                    </Link>
                                </li>
                                <li className={` me-4 ${splitLocation[5] === "a" ? "uk-active" : ""}`}>
                                    <Link to={`/${username}/organisasi/relawan/grade/a`}>
                                        Grade A
                                    </Link>
                                </li>
                                <li className={` me-4 ${splitLocation[5] === "b" ? "uk-active" : ""}`}>
                                    <Link to={`/${username}/organisasi/relawan/grade/b`}>
                                        Grade B
                                    </Link>
                                </li>
                                <li className={` me-4 ${splitLocation[5] === "c" ? "uk-active" : ""}`}>
                                    <Link to={`/${username}/organisasi/relawan/grade/c`}>
                                        Grade C
                                    </Link>
                                </li>
                                <li className={` me-4 ${splitLocation[5] === "d" ? "uk-active" : ""}`}>
                                    <Link to={`/${username}/organisasi/relawan/grade/d`}>
                                        Grade D
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
        </Organisasi>
    )
}

export default Relawan
