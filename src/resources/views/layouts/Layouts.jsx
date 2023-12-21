import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import photo from '../../../public/avatars/029m.jpg';
import logo from '../../../public/logo/logo.png';
import toast, { Toaster } from 'react-hot-toast';
import Verification from '../../../secure/Verification';
import { useDispatch } from 'react-redux';
import { postLogout } from '../../../app/model/auth/authSlice';
import Loading from '../../components/loading/Loading'
import wa from '../../../public/icons/wa.svg'
import profile_icon from '../../../public/icons/profile.png'
import dapil_icon from '../../../public/icons/dapil.png'
import dpt_icon from '../../../public/icons/dpt.png'
import program_icon from '../../../public/icons/program.png'
import financial_icon from '../../../public/icons/financial.png'
import acc_icon from '../../../public/icons/acc.png'
import slider_icon from '../../../public/icons/slider.png'
import mobilisasi_icon from '../../../public/icons/mobilisasi.png'
import pengumuman_icon from '../../../public/icons/pengumuman.png'
import tps_icon from '../../../public/icons/tps.png'
import posko_icon from '../../../public/icons/posko.png'

const Layouts = ({ children }) => {
    const {username} = useParams();
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleLogout = async() => {
        setLoading(true);
        try {
            const response = await dispatch(postLogout(username)).unwrap().catch((err) => {});
            if (response.status === 200) {
                localStorage.removeItem('user_data');
                localStorage.removeItem('caleg');
                localStorage.removeItem('provinsi');
                return window.location.replace('https://harrybtp.com/');
            }
        } catch (error) {
            
        }
    }

    const handleCustomerService = () => {
        return window.location.href = `https://wa.me/81333233352`
    }

    const handleMenu = () => {
        toast('Sorry !! On process update', {
            icon: '🙏'
        })
    }

    const handelDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('night-mode')) {
            localStorage.setItem('gmtNightMode', true);
            return;
        }
        localStorage.removeItem('gmtNightMode');
    }

    return (
        <Verification>
             <div>
                { loading ? <Loading /> : '' }
                <Toaster position="top-right" />
                <div id="wrapper">
                    <header className="header">
                        <div className="header_wrap">
                            <div className="header_inner mcontainer">
                                <div className="left_side">
                                    <span className="slide_menu" uk-toggle="target: #wrapper ; cls: is-collapse is-active">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z" fill="currentColor"></path></svg>
                                    </span>
                                    <div id="logo">
                                        <Link>
                                            <div className="hidden md:block">
                                                <div className="flex items-center">
                                                    <img src={logo} alt="" className="me-2 rounded-full" />
                                                    <span style={{fontSize: "18px"}} className="inline w-full text-gray-600 font-bold">Maju Menang 2024</span>
                                                </div>
                                            </div>
                                            <div className="md:hidden">
                                                <div className="flex items-center">
                                                    <img src={logo} alt="" className="me-2 logo_mobile rounded-full" />
                                                    <span className="text-base font-bold text-gray-600">Maju&nbsp;Menang&nbsp;2024</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                {/* Right Side */}
                                <div className="right_side">
                                    <div className="header_widgets">
                                        <a className="is_icon" uk-tooltip="title: Notifications">
                                            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                                            {/* <span>3</span> */}
                                        </a>
                                        {/* <div uk-drop="mode: click" className="header_dropdown">
                                            <div  className="dropdown_scrollbar" data-simplebar>
                                                <div className="drop_headline">
                                                    <h4>Notifications </h4>
                                                    <div className="btn_action">
                                                        <a data-tippy-content="left" title="Notifications">
                                                            <ion-icon name="settings-outline"></ion-icon>
                                                        </a>
                                                        <a data-tippy-content="left" title="Mark as read all">
                                                            <ion-icon name="checkbox-outline"></ion-icon>
                                                        </a>
                                                    </div>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a >
                                                            Notifikasi
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}

                                        {/* Messages */}
                                        <a href="#" className="is_icon" uk-tooltip="title: Message">
                                            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path></svg>
                                            {/* <span>4</span> */}
                                        </a>
                                        {/* <div uk-drop="mode: click" className="header_dropdown is_message">
                                            <div  className="dropdown_scrollbar" data-simplebar>
                                                <div className="drop_headline">
                                                    <h4>Messages </h4>
                                                    <div className="btn_action">
                                                        <a href="#" data-tippy-placement="left" title="Notifications">
                                                            <ion-icon name="settings-outline" uk-tooltip="title: Message settings ; pos: left"></ion-icon>
                                                        </a>
                                                        <a href="#" data-tippy-placement="left" title="Mark as read all">
                                                            <ion-icon name="checkbox-outline"></ion-icon>
                                                        </a>
                                                    </div>
                                                </div>
                                                <input type="text" className="uk-input" placeholder="Search in Messages" />
                                                <ul>
                                                    <li className="un-read">
                                                        <a>
                                                            Pesan
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <a className="see-all"> See all in Messages</a>
                                        </div> */}

                                        <a>
                                            <img src={ photo } className="is_avatar" alt="" />
                                        </a>
                                        <div uk-drop="mode: click;offset:5" className="header_dropdown profile_dropdown">

                                            <a href="timeline.html" className="user">
                                                <div className="user_avatar">
                                                    <img src={ photo } alt="" />
                                                </div>
                                                <div className="user_name">
                                                    {/* <div> { localStorage.getItem("name") } </div>
                                                    <span>{ localStorage.getItem("posisi") }</span> */}
                                                </div>
                                            </a>
                                            <hr />
                                            <Link onClick={handleMenu}>
                                                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                                                My Account
                                            </Link>
                                            <a id="night-mode" onClick={handelDarkMode} className="btn-night-mode">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                                </svg>
                                                Night mode
                                                <span className="btn-night-mode-switch">
                                                    <span className="uk-switch-button"></span>
                                                </span>
                                            </a>
                                            <a onClick={handleLogout}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                                </svg>
                                                Log Out
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="sidebar">
                        <div className="sidebar_inner" data-simplebar>
                            <ul>
                                <li className={splitLocation[2] === "home" ? "active" : ""}>
                                    <Link to={`/${username}/home/program`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-blue-600">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                        <span> Home </span>
                                    </Link>
                                </li>
                                <li className={splitLocation[2] === "caleg" ? "active" : ""}>
                                    <Link to={`/${username}/caleg/form`}>
                                        <div className="flex items-center">
                                            <img src={profile_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> Profile </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={splitLocation[2] === "dapil" ? "active" : ""}>
                                    <Link to={`/${username}/dapil/area/form`}>
                                        <div className="flex items-center">
                                            <img src={dapil_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> Dapil </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={splitLocation[2] === "dpt" ? "active" : ""}>
                                    <Link to={`/${username}/dpt/form`}>
                                        <div className="flex items-center">
                                            <img src={dpt_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> DPT </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={splitLocation[2] === "organisasi" ? "active" : ""}>
                                    <Link to={`/${username}/organisasi/timses/form`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-blue-500">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                        </svg>
                                        <span> Organisasi </span>
                                    </Link> 
                                </li>
                                <li className={splitLocation[2] === "program" ? "active" : ""}>
                                    <Link to={`/${username}/program/form`}>
                                        <div className="flex items-center">
                                            <img src={program_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> Program </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={splitLocation[2] === "service" ? "active" : ""}>
                                    <Link to={`/${username}/service/form`}>
                                        <div className="flex items-center">
                                            <img src={acc_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> Harry Peduli </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={splitLocation[2] === "posko" ? "active" : ""}>
                                    <Link to={`/${username}/posko/form`}>
                                        <div className="flex items-center">
                                            <img src={posko_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> Giat Relawan </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={splitLocation[2] === "financial" ? "active" : ""}>
                                    <Link to={`/${username}/financial/data`}>
                                        <div className="flex items-center">
                                            <img src={financial_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> Financial </span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <a onClick={handleMenu}>
                                        <div className="flex items-center">
                                            <img src={acc_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> Assessment </span>
                                        </div>
                                    </a>
                                </li>
                                <li className={splitLocation[2] === "absensi" ? "active" : ""}>
                                    <Link >
                                        <div className="flex items-center">
                                            <img src={mobilisasi_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> Mobilisasi </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={splitLocation[2] === "tps" ? "active" : ""}>
                                    <Link >
                                        <div className="flex items-center">
                                            <img src={tps_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> TPS </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={splitLocation[2] === "pengumuman" ? "active" : ""}>
                                    <Link>
                                        <div className="flex items-center">
                                            <img src={pengumuman_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> Pengumuman </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={splitLocation[2] === "slider" ? "active" : ""}>
                                    <Link to={`/${username}/slider`}>
                                        <div className="flex items-center">
                                            <img src={slider_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> Slider Login </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={splitLocation[2] === "import" ? "active" : ""}>
                                    <Link onClick={handleMenu}>
                                        <div className="flex items-center">
                                            <img src={slider_icon} alt="" style={{width: '24px', height: '24px'}} className="me-3" />
                                            <span> Import </span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="side_overly" uk-toggle="target: #wrapper ; cls: is-collapse is-active"></div>
                    </div> 

                    <div className="main_content">
                        <div className="mcontainer">
                            {children}
                        </div>
                    </div>
                </div>

                <div onClick={handleCustomerService}  className="start-chat">
                    <img src={wa} alt="" />
                </div>
            </div>
        </Verification>
    )
}

export default Layouts
