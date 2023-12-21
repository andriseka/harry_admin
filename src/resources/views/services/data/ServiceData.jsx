import React, { useEffect, useState } from 'react'
import Services from '../Services'
import FormTitle from '../../../components/title/FormTitle'
import { useDispatch } from 'react-redux'
import { getServiceByRelawan } from '../../../../app/model/service/serviceSlice'
import { Link } from 'react-router-dom'

const ServiceData = () => {

    const dispatch = useDispatch();
    const [service, setService] = useState([]);
    const [pagination, setPagination] = useState([]);

    const profile = JSON.parse(localStorage.getItem('profile'));

    const getDataservice = async(data) => {
        try {
            const response = await dispatch(getServiceByRelawan(data)).unwrap().catch((err) => {});
            setService(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataservice({ relawan_id: profile.id, page: 1 });
    }, []);

    const handlePagination = (page) => {
        if (page === 0) {
            
        } else if (page === pagination.last_page + 1) {
            
        } else {
            const data = {
                relawan_id : profile.id,
                page: page
            }
            return getDataservice(data);
        }
    }

    return (
        <Services>
            <div>
                <div className="card">
                    <div className="card-body">
                        <div>
                            <FormTitle title={'Daftar Penerima Bantuan Kursi Roda'} />
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-600 uppercase th-color">
                                    <tr>
                                        <th scope="col" className="px-2 py-3" style={{width:"5%"}}>
                                            No
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Tanggal
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Nama Penerima
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Alamat
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Jenis Bantuan
                                        </th>
                                        <th scope="col" className="px-2 py-3 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        service.map((data) => {
                                            return(
                                                <tr key={data.no} className="bg-white border-b dark:border-gray-700 text-gray-600">
                                                    <td className="px-2 py-3">
                                                        { data.no }
                                                    </td>
                                                    <td className="px-2 py-3">
                                                        { data.created_at }
                                                    </td>
                                                    <td className="px-2 py-3">
                                                        { data.dpt }
                                                    </td>
                                                    <td className="px-2 py-3">
                                                        { data.address }
                                                    </td>
                                                    <td className="px-2 py-3">
                                                        { data.category }
                                                    </td>
                                                    <td className="px-2 py-3 text-center">
                                                        <Link to={`${data.id}`} className="bg-green-500 hover:bg-green-600 hover:text-white text-white rounded-full px-3 py-1">
                                                            Detail
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* pagination */}
                        <div className="flex justify-between">
                            <div>
                                <span>Halaman {  pagination.current_page} </span>
                            </div>

                            {
                                pagination.pagination ?
                                <div>
                                    <a onClick={() => handlePagination(pagination.current_page - 1)} className="me-2">Sebelumnya</a>
                                    <a onClick={() => handlePagination(pagination.current_page + 1)}>Selanjutnya</a>
                                </div> : ''
                            }

                            <div>
                                <span>Total : { pagination.total } Penerima</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Services>
    )
}

export default ServiceData
