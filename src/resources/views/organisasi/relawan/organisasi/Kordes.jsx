import React, { useEffect, useState } from 'react'
import { getRelawanByJabatan } from '../../../../../app/model/relawan/relawanSlice';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormTitle from '../../../../components/title/FormTitle';

const Kordes = () => {
    const [kordes, setKordes] = useState([]);
    const dispatch = useDispatch();

    const { username } = useParams();

    const getDataKordes = async(data) => {
        try {
            const response = await dispatch(getRelawanByJabatan(data)).unwrap().catch((err) => {});
            setKordes(response.data);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataKordes({ jabatan: 'kordes', page: 1 });
    }, []);

    const handleDetail = (relawan) => {
        return window.location.href = `/${username}/organisasi/relawan/data/${relawan}`
    }

    return (
        <div className="mb-3">
            <div className="card">
                <div className="card-body">
                    <div>
                        <FormTitle title={'DATA KOORDINATOR DESA'} />
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
                                            Kecamatan
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Desa
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Tps
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Jabatan
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center">
                                            Target                                            </th>
                                        <th scope="col" className="px-4 py-3 text-center">
                                            Total
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        kordes.map((data) => {
                                            return (
                                                <tr key={data.no} className="bg-white border-b dark:border-gray-700 text-gray-600">
                                                    <td className="px-4 py-3">
                                                        { data.no }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        { data.name }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        { data.kecamatan }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        { data.desa }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        { data.tps }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {
                                                            data.jabatan === 'korcam' ? 'Korcam' :
                                                            data.jabatan === 'kordes' ? 'Kordes' :
                                                            data.jabatan === 'korwe' ? 'Korwe' :
                                                            data.jabatan === 'anggota' ? 'Anggota' : ''
                                                        }
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        { data.target }
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        { data.total }
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <Link onClick={() => handleDetail(data.username)} className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white hover:text-white rounded-full">
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Kordes
