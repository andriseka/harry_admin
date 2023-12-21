import React from 'react'
import Layouts from '../layouts/Layouts'
import { Link, useLocation, useParams } from 'react-router-dom';

const Home = ({ children }) => {
    const caleg = JSON.parse(localStorage.getItem('caleg'));
    const {username} = useParams();
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const active = splitLocation[3];

    return (
        <Layouts>
            <div>
                <div className="mt-10 md:mt-0">
                    <div className="profile user-profile">
                        <div className="profiles_banner">
                            <img src={caleg ? caleg.banner : ""} alt="" />
                        </div>
                        <div className="profiles_content">
                            <div className="profile_avatar">
                                <div className="profile_avatar_holder"> 
                                    <img src={caleg ? caleg.photo: ""} alt="" />
                                </div>
                            </div>
                            <div className="profile_info text-center">
                                <h1> { caleg ? caleg.name: "" } </h1>
                                <p> { caleg ? caleg.nama_partai : "" } { caleg ? `( ${ caleg.singkatan_partai } )` : "" }</p>
                                <p> { caleg ? caleg.provinsi : "" } | { caleg ? caleg.kabupaten : "" } | { caleg ? `Dapil ${caleg.dapil}` : "" }</p>
                            </div>

                        </div>
                        
                        <div className="flex justify-between lg:border-t border-gray-100 flex-col-reverse lg:flex-row pt-2">
                            <nav className="responsive-nav pl-3">
                                <ul>
                                    <li className={active === "program" ? "uk-active" : ""}>
                                        <Link to={`/${username}/home/program`}>
                                            Program
                                        </Link>
                                    </li>
                                    <li className={active === "jadwal" ? "uk-active" : ""}>
                                        <Link to={`/${username}/home/jadwal`}>
                                            Jadwal Kampanye
                                        </Link>
                                    </li>
                                    <li className={active === "relawan" ? "uk-active" : ""}>
                                        <Link to={`/${username}/home/relawan`}>
                                            Relawan
                                        </Link>
                                    </li>
                                    <li className={active === "konstituen" ? "uk-active" : ""}>
                                        <Link to={`/${username}/home/konstituen`}>
                                            Konstituen
                                        </Link>
                                    </li>
                                    <li className={active === "dpt" ? "uk-active" : ""}>
                                        <Link to={`/${username}/home/dpt`}>
                                            DPT
                                        </Link>
                                    </li>
                                    <li>
                                        <a>Popularitas</a>
                                    </li>
                                    <li>
                                        <a>Elektabilitas</a>
                                    </li>
                                    <li>
                                        <a>Mobilisasi</a>
                                    </li>
                                    <li>
                                        <a>Quick Count</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    { children }
                </div>
            </div>
        </Layouts>
    )
}

export default Home
