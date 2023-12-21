import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getFinancialBtStaus } from '../../../../app/model/financial/financialSlice';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import FormTitle from '../../../components/title/FormTitle';

const FinancialStatus = ({ status }) => {
    const dispatch = useDispatch();
    const [financial, setFinancial] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [total, setTotal] = useState({
        total: ''
    });

    const getDataFinancial = async(page) => {
        try {
            const data = {
                status: status,
                page: page
            }
            const response = await dispatch(getFinancialBtStaus(data)).unwrap().catch((err) => {});
            setFinancial(response.data);
            setPagination(response.pagination)
            setTotal({
                total: response.total
            });

        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataFinancial(1);
    }, []); 

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama', {icon : '🙏'});
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terakhir', {icon : '🙏'});
        } else {
            return getDataFinancial(page);
        }
    }

    return (
        <div>
            <div className="card mb-3">
                <div className="card-body">
                    <div>
                        <FormTitle title={ status === 'masuk' ? 'FINANCIAL MASUK' : 'FINANCIAL KELUAR' } />
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
                                            Tanggal
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Nama Transaksi
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center">
                                            Status
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center">
                                            Pembayaran
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center">
                                            Nominal
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        financial.map((data) => {
                                            return(
                                                <tr key={data.no} className="bg-white border-b dark:border-gray-700 text-gray-600">
                                                    <td className="px-4 py-3">
                                                        { data.no }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        { data.date }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        { data.name }
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        { 
                                                            data.category === 'non' ? 'Non Kampanye': 'Kampanye'
                                                        }
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        { 
                                                            data.payment_method === 'cash' ? 'Cash': 'Transfer'
                                                        }
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        { data.nominal }
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
                                    <tr>
                                        <td className="px-4 py-3" colSpan={5}>
                                            <span className="font-bold text-gray-600">
                                                Total Anggaran { status === 'masuk' ? 'Masuk' : 'Keluar' }
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="font-bold text-gray-600">
                                                { total.total ? total.total : '' }
                                            </span>
                                        </td>
                                    </tr>
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
    )
}

export default FinancialStatus
