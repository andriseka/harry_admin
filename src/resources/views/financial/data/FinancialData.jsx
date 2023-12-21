import React, { useEffect, useState } from 'react'
import Financial from '../Financial'
import { Link } from 'react-router-dom'
import FormTitle from '../../../components/title/FormTitle'
import FinancialStatus from './FinancialStatus'
import { useDispatch } from 'react-redux'
import { getFinancialSaldo } from '../../../../app/model/financial/financialSlice'

const FinancialData = () => {
    const dispatch = useDispatch();
    const[saldo, setSaldo] = useState([])

    const getSaldo = async() => {
        try {
            const response = await dispatch(getFinancialSaldo()).unwrap().catch((err) => {});
            setSaldo(response.data);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getSaldo();
    }, []);

    return (
        <Financial>
            <div className="mb-3">
                <div className="card">
                    <div className="card-body">
                        <div>
                            <FormTitle title={'SALDO FINANCIAL'} />
                        </div>
                        <div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-600 uppercase th-color">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">
                                                Total Anggaran Masuk
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Total Anggaran Keluar
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Sisa Saldo
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:border-gray-700 text-gray-600">
                                            <td className="px-4 py-3">
                                                { saldo.masuk ? saldo.masuk : '' }
                                            </td>
                                            <td className="px-4 py-3">
                                                { saldo.keluar ? saldo.keluar : '' }
                                            </td>
                                            <td className="px-4 py-3">
                                                { saldo.sisa ? saldo.sisa : '' }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FinancialStatus status={'masuk'} />
            <FinancialStatus status={'keluar'} />
        </Financial>
    )
}

export default FinancialData
