import React from 'react'
import Dapil from '../Dapil'
import { Link, useLocation, useParams } from 'react-router-dom';

const DapilArea = ({ children }) => {
    const location = useLocation();
    const {username} = useParams();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const active = splitLocation[4];

    return (
        <Dapil>
            <div>
                <div className="card">
                    <div className="card-body">
                        <nav className="responsive-nav md:m-0 -mx-4">
                            <ul>
                                <li className={` me-4 ${active === "form" ? "uk-active" : ""}`}>
                                    <Link to={`/${username}/dapil/area/form`}>
                                        Buat Dapil
                                    </Link>
                                </li>
                                <li className={active === "data" ? "uk-active" : ""}>
                                    <Link to={`/${username}/dapil/area/data`}>
                                        Data Dapil
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="mt-8">
                    {children}
                </div>
            </div>
        </Dapil>
    )
}

export default DapilArea
