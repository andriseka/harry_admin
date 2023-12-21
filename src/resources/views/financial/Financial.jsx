import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import Layouts from '../layouts/Layouts';

const Financial = ({ children }) => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const active = splitLocation[3];
    const {username} = useParams();

    return (
        <Layouts>
            <div className="lg:flex  lg:space-x-12">
                <div className="lg:w-3/4">
                    <div className="flex justify-between items-center relative md:mb-4 mb-3">
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold"> FINANCIAL </h2>
                            <nav className="responsive-nav md:m-0 -mx-4">
                                <ul>
                                    <li className={` me-4 ${active === "form" ? "uk-active" : ""}`}>
                                        <Link to={`/${username}/financial/form`}>
                                            Buat Financial
                                        </Link>
                                    </li>
                                    <li className={` me-4 ${active === "data" ? "uk-active" : ""}`}>
                                        <Link to={`/${username}/financial/data`}>
                                            Data Financial
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                {children}
            </div>
        </Layouts>
    )
}

export default Financial
