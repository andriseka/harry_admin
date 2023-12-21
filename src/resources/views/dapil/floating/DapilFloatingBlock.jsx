import React from 'react'
import Dapil from '../Dapil'
import FormTitle from '../../../components/title/FormTitle'

const DapilFloatingBlock = ({ fb, pagination, handlePagination }) => {
    return (
        <Dapil>
             <div>
                <div className="card max-w-xl mx-auto">
                    <div className="card-body">
                        <FormTitle title={'DATA FLOATING BLOCK'} />
                        <div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-600 uppercase th-color">
                                        <tr>
                                            <th scope="col" className="px-4 py-3" style={{width:"5%"}}>
                                                No
                                            </th>
                                            <th scope="col" className="px-4 py-3" style={{width:"25%"}}>
                                                Kecamatan
                                            </th>
                                            <th scope="col" className="px-4 py-3" style={{width:"25%"}}>
                                                Desa
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            fb.map((data) => {
                                                return (
                                                    <tr key={data.no} className="bg-white border-b dark:border-gray-700 text-gray-600">
                                                        <td className="px-4 py-4">
                                                            {data.no}
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            {data.kecamatan}
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            {data.desa}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* pagination */}
                            <div className="flex justify-center mb-3">
                                {
                                    pagination.pagination === true ? 
                                    <div className="flex justify-center">
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
                                    <span>Total : { pagination.total ? pagination.total : '' } Desa / Kelurahan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dapil>
    )
}

export default DapilFloatingBlock
