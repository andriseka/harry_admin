import React from 'react'
import Konstituen from '../Konstituen'
import FormTitle from '../../../../components/title/FormTitle'
import { useNavigate } from 'react-router-dom'

const KonstituenData = ({
    konstituen, pagination, handlePagination
}) => {
    const navigate = useNavigate();

    const handleDetail = (code) => {
        return navigate(`${code}`);
    }

    return (
        <Konstituen>
            <div>
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
                                            <th scope="col" className="px-4 py-3 text-center">
                                                TPS                                            
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
                                                            { data.desa}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            { data.rt}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            { data.rw}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            { data.tps }
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <span onClick={() => handleDetail(data.code)} className="bg-green-500 text-white hover:bg-green-600 cursor-pointer px-3 py-1 rounded-full">
                                                                Detail
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-center mb-3">
                                {
                                    pagination.pagination === true ? 
                                    <div>
                                        <a className="me-3" onClick={() => handlePagination(pagination.current_page - 1)}>Sebelumnya</a>
                                        <a onClick={() => handlePagination(pagination.current_page + 1)}>Selanjutnya</a>
                                    </div> : ''
                                }
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span>Halaman { pagination.current_page ? pagination.current_page : '' }</span>
                                </div>
                                <div>
                                    <span>Total : { pagination.total ? pagination.total : '' }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Konstituen>
    )
}

export default KonstituenData
