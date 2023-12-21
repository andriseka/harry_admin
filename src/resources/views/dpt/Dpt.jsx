import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import Layouts from '../layouts/Layouts'
import { Toaster } from 'react-hot-toast';

const Dpt = ({ children }) => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const active = splitLocation[3];
    const {username} = useParams();
    
    const redirectDptData = () => {
        return window.location.href = `/${username}/dpt/data`;
    }

    return (
        <Layouts>
             <div>
                <Toaster position="top-right" />
                <div className="lg:flex  lg:space-x-12">
                    <div className="lg:w-3/4">
                        <div className="flex justify-between items-center relative md:mb-4 mb-3">
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold"> DPT ( Daftar Pemilih Tetap )</h2>
                                <nav className="responsive-nav md:m-0 -mx-4">
                                    <ul>
                                        <li className={` me-4 ${active === "form" ? "uk-active" : ""}`}>
                                            <Link to={`/${username}/dpt/form`}>
                                                Input DPT
                                            </Link>
                                        </li>
                                        <li className={ active === "data" ? "uk-active" : ""}>
                                            <Link onClick={redirectDptData}>
                                                Data DPT
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    {children}
                </div>
            </div>
        </Layouts>
    )
}

export default Dpt
