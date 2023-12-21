import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import Layouts from '../layouts/Layouts';
import { Toaster } from 'react-hot-toast';

const Oraganisasi = ({ children }) => {
    const location = useLocation();
    const {username} = useParams();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const active = splitLocation[3];
    const caleg = JSON.parse(localStorage.getItem('caleg'));

    return (
        <Layouts>
            <div>
                <Toaster position="top-right" />
                <div className="lg:flex  lg:space-x-12">
                    <div className="lg:w-3/4">
                        <div className="flex justify-between items-center relative md:mb-4 mb-3">
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold"> ORGANISASI</h2>
                                <nav className="responsive-nav md:m-0 -mx-4">
                                    <ul>
                                        <li className={` me-4 ${active === "timses" ? "uk-active" : ""}`}>
                                            <Link to={`/${username}/organisasi/timses/form`}>
                                                Struktur
                                            </Link>
                                        </li>
                                        <li className={` me-4 ${active === "relawan" ? "uk-active" : ""}`}>
                                            <Link to={`/${username}/organisasi/relawan/form`}>
                                                Relawan
                                            </Link>
                                        </li>
                                        <li className={` me-4 ${active === "konstituen" ? "uk-active" : ""}`}>
                                            <Link to={`/${username}/organisasi/konstituen/form`}>
                                                Konstituen
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-3 hidden md:block">
                    <div className="card-body">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label>Nama Caleg</label>
                                <span className="w-full py-2 px-4 text-gray-600 border border-[#aaa] block rounded-md">
                                    { caleg ? caleg.name: "" }
                                </span>
                            </div>
                            <div>
                                <label>Status Caleg</label>
                                <span className="w-full py-2 px-4 text-gray-600 border border-[#aaa] block rounded-md">
                                    { caleg ? caleg.status : "" }
                                </span>
                            </div>
                            <div>
                                <label>Partai</label>
                                <span className="w-full py-2 px-4 text-gray-600 border border-[#aaa] block rounded-md">
                                    { caleg ? caleg.nama_partai: "" }
                                </span>
                            </div>
                            <div>
                                <label>Provinsi</label>
                                <span className="w-full py-2 px-4 text-gray-600 border border-[#aaa] block rounded-md">
                                    { caleg ? caleg.provinsi: "" }
                                </span>
                            </div>
                            <div>
                                <label>Kabupaten</label>
                                <span className="w-full py-2 px-4 text-gray-600 border border-[#aaa] block rounded-md">
                                    { caleg ? caleg.kabupaten: "" }
                                </span>
                            </div>
                            <div>
                                <label>Dapil</label>
                                <span className="w-full py-2 px-4 text-gray-600 border border-[#aaa] block rounded-md">
                                    { caleg ? caleg.dapil: "" }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    {children}
                </div>
            </div>
        </Layouts>
    )
}

export default Oraganisasi
