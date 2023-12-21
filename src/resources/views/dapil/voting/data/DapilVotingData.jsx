import React, { useState } from 'react'
import DapilVoting from '../DapilVoting'
import FormTitle from '../../../../components/title/FormTitle'
import { useDispatch } from 'react-redux'
import { deleteVb } from '../../../../../app/model/dapil/votingBlockSlice'
import Loading from '../../../../components/loading/Loading'

const DapilVotingData = ({ vb, pagination, handlePagination }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleDelete = async(code) => {
        setLoading(true);
        try {
            const response = await dispatch(deleteVb(code)).unwrap().catch((err) => {});
            if (response) {
                if (response.status === 200) {
                    return window.location.reload();
                }           
            }
        } catch (error) {
            
        }
    }

    return (
        <DapilVoting>
            <div>
                { loading ? <Loading /> : '' }
                <div className="card max-w-xl mx-auto">
                    <div className="card-body">
                        <FormTitle title={'DATA VOTING BLOCK'} />
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
                                            <th scope="col" className="px-4 py-3 text-center" style={{width:"25%"}}>
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            vb.map((data) => {
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
                                                        <td className="px-4 py-4 text-center">
                                                            <span onClick={() => handleDelete(data.code)} className="rounded-full bg-red-400 hover:bg-red-500 text-white px-3 py-1 cursor-pointer">
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
        </DapilVoting>
    )
}

export default DapilVotingData
