import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteKonstituen, getByRelawan } from '../../../../../app/model/konstituen/konstituenSlice';
import FormTitle from '../../../../components/title/FormTitle';
import Loading from '../../../../components/loading/Loading';
import toast, { Toaster } from 'react-hot-toast';

const KonstituenByRelawan = ({ relawan_username }) => {
    const [konstituen, setKonstituen] = useState([]);
    const [pagination, setPagination] = useState([]);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const getDataByRealwan = async() => {
        try {
            const response = await dispatch(getByRelawan(relawan_username)).unwrap().catch((err) => {});
            setKonstituen(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataByRealwan();
    }, []);

    const onDeleteData = async(id) => {
        setLoading(true);
        try {
            const response = await dispatch(deleteKonstituen(id)).unwrap().catch((err) => {});
            if (response.status === 200) {
                window.location.reload();
            }
            if (response.status === 403) {
                setLoading(false);
                toast.error('Ini adalah data Anda');
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="mb-3">
            { loading ? <Loading /> : '' }
            <Toaster position="top-right" />
            <div className="card">
                <div className="card-body">
                    <div>
                        <FormTitle title={'DATA KONSTITUEN'} />
                    </div>

                    <div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-600 uppercase th-color">
                                    <tr>
                                        <th scope="col" className="px-4 py-3" style={{width:"5%"}}>
                                            No
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Nama
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Gender
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Usia
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Kecamatan
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Desa
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            RT
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            RW
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Tps
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        konstituen.map((data) => {
                                            return (
                                                <tr key={data.no} className="bg-white border-b dark:border-gray-700 text-gray-600">
                                                    <td className="px-4 py-3">
                                                        { data.no }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        { data.name }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        { 
                                                            data.gender === 'L' ? 'Laki Laki' : 
                                                            data.gender === 'P' ? 'Perempuan' : ''
                                                        }       
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        { data.usia } Tahun
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        { data.kecamatan }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        { data.desa }
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        { data.rt }
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        { data.rw }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        { data.tps }
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span onClick={() => onDeleteData(data.id)} className="px-3 py-1 rounded-full bg-red-400 hover:bg-red-500 text-white cursor-pointer">
                                                            Delete
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <span>Halaman { pagination.current_page ? pagination.current_page : '' }</span>
                            </div>
                            <div>

                            </div>

                            <div>
                                <span>Total : { pagination.total ? pagination.total : '' } Konstituen </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KonstituenByRelawan
