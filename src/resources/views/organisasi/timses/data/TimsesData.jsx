import React from 'react'
import Timses from '../Timses'
import FormTitle from '../../../../components/title/FormTitle'
import { Link } from 'react-router-dom'

const TimsesData = ({ timses, pagination, handlePagination }) => {

    return (
        <Timses>
            <div>
                <div className="card">
                    <div className="card-body">
                        <div>
                            <FormTitle title={'DATA STRUKTUR'} />
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
                                            <th scope="col" className="px-4 py-3 text-center">
                                                Posisi
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center">
                                                Jabatan
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            timses.map((data) => {
                                                return (
                                                    <tr key={data.no} className="bg-white border-b dark:border-gray-700 text-gray-600">
                                                        <td className="px-4 py-3">
                                                            { data.no }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            { data.name }
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            { 
                                                                data.posisi === 'timses' ? 'Tim Sukses' :  
                                                                data.posisi === 'sanksi' ? 'Sanksi' :
                                                                data.posisi === 'assessment' ? 'Assessment' :
                                                                data.posisi === 'accountant' ? 'Keuangan' : ''
                                                            }
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            { data.jabatan === 'ketua' ? 'Ketua' : data.jabatan === 'anggota' ? 'Anggota' : '' }
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <Link to={`${data.username}`} className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white hover:text-white rounded-full">
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
        </Timses>
    )
}

export default TimsesData
