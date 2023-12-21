import React from 'react'
import Program from '../Program'
import FormTitle from '../../../components/title/FormTitle'
import { Link } from 'react-router-dom'

const ProgramValidasi = ({
    program, pagination, handlePagination
}) => {
    return (
        <Program>
            <div>
                <div className="card">
                    <div className="card-body">
                        <div>
                            <FormTitle title={'DATA PROGRAM TERVALIDASI'} />
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
                                                Tempat, Tanggal
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Nama Program
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Pengusul
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center">
                                                Keterangan
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            program.map((data) => {
                                                return(
                                                    <tr key={data.no} className="bg-white border-b dark:border-gray-700 text-gray-600">
                                                        <td className="px-4 py-3">
                                                            { data.no }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            { `${data.tmpt_pelaksanaan}, ${data.tgl_pelaksanaan}` }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            { data.name }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            { data.pengusul }
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            { 
                                                                data.ket === 'belum' ? <span className='text-orange-500'>Belum Terlaksana</span> :
                                                                data.ket === 'terlaksana' ? <span className='text-green-500'>Terlaksana</span> :
                                                                data.ket === 'lebih' ? <span className='text-red-500'>Melebihi Jadwal</span> : '' 
                                                            }
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <Link to={`${data.code}`} className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white hover:text-white rounded-full">
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
                            <div className="flex justify-between items-center">
                                <div>
                                    <span>Halaman {pagination.current_page ? pagination.current_page: ''}</span>
                                </div>
                                {
                                    pagination.pagination === true ? 
                                    <div>
                                        <a className="me-3" onClick={() => handlePagination(pagination.current_page - 1)}>Sebelumnya</a>
                                        <a onClick={() => handlePagination(pagination.current_page + 1)}>Selanjutnya</a>
                                    </div> : ''
                                }
                                <div>
                                    <span>Total : {pagination.total ? pagination.total: ''} Program</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Program>
    )
}

export default ProgramValidasi
