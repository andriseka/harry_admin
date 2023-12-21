import React from 'react'
import Home from '../Home'
import toast from 'react-hot-toast'
import profile from '../../../../public/avatars/029m.jpg';

const ProgramHome = ({
    program
}) => {
    const handleAction = () => {
        toast('Sorry !! This is dummy data', {
            icon: '🙏'
        })
    }

    return (
        <Home>
            {
                program.map((data) => {
                    return (
                        <div key={data.no} className="lg:w-3/4 lg:px-20 space-y-7 mb-3">
                            <div className="card lg:mx-0 uk-animation-slide-bottom-small">
                                <div className="flex justify-between items-center lg:p-4 p-2.5">
                                    <div className="flex flex-1 items-center space-x-4">
                                        <a onClick={() => handleAction()}>
                                            <img src={data.photo_timses ? data.photo_timses : profile} className="bg-gray-400 border rounded-full w-10 h-10" />
                                        </a>
                                        <div className="flex-1 capitalize">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 font-semibold"> 
                                                    { data.pengusul ? data.pengusul : ''} &nbsp;
                                                    { 
                                                        data.ket === 'belum' ? <i className="uil uil-times-circle text-red-400"></i> :
                                                        data.ket === 'terlaksana' ? <i className="uil uil-check-circle text-gren-500"></i> :
                                                        data.ket === 'lebih' ? <i className="uil uil-clock text-orange-400"></i> : ''
                                                    }
                                                    
                                                </span>
                                                { 
                                                    data.ket === 'belum' ? <span className="text-white bg-red-400 rounded-full px-3 py-1 text-xs">Belum Terlaksana</span> :
                                                    data.ket === 'terlaksana' ? <span className="text-white bg-green-500 rounded-full px-3 py-1 text-xs">Terlaksana</span> :
                                                    data.ket === 'lebih' ? <span className="text-white bg-orange-400 rounded-full px-3 py-1 text-xs">Belum Terlaksana</span> : ''
                                                }
                                            </div>
                                            <span className="">Pelaksanaan { data.tgl_pelaksanaan ? data.tgl_pelaksanaan : ''}</span>
                                        </div>
                                    </div>
                                </div>

                                <div uk-lightbox="">
                                    <a>  
                                        <img src={data.pamflet ? data.pamflet : ''} alt="" className="max-h-96 w-full object-cover" />
                                    </a>
                                </div>
                                

                                <div className="p-4 space-y-3"> 
                                    
                                    <div className="flex space-x-4 lg:font-bold">
                                        <a onClick={() => handleAction()} className="flex items-center space-x-2">
                                            <div className="p-2 rounded-full text-black">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" className="text-gray-600">
                                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                                                </svg>
                                            </div>
                                            <div> Like</div>
                                        </a>
                                        <a onClick={() => handleAction()} className="flex items-center space-x-2">
                                            <div className="p-2 rounded-full  text-black">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" className="text-gray-600">
                                                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <div> Comment</div>
                                        </a>
                                        <a onClick={() => handleAction()} className="flex items-center space-x-2 flex-1 justify-end">
                                            <div className="p-2 rounded-full  text-black">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" className="text-gray-600">
                                                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                                                </svg>
                                            </div>
                                            <div> Share</div>
                                        </a>
                                    </div>
                                    <div className="mt-3">
                                        <span className="text-lg font-bold text-gray-600 block">{ data.name ? data.name : ''}</span>
                                        <span>{data.description ? data.description : ''}</span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </Home>
    )
}

export default ProgramHome
