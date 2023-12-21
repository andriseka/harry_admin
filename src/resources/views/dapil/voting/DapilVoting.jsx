import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import Dapil from '../Dapil'

const DapilVoting = ({ children }) => {
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
                                    <Link to={`/${username}/dapil/voting-block/form`}>
                                        Buat Voting Block
                                    </Link>
                                </li>
                                <li className={active === "data" ? "uk-active" : ""}>
                                    <Link to={`/${username}/dapil/voting-block/data`}>
                                        Data Voting Block
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

export default DapilVoting
