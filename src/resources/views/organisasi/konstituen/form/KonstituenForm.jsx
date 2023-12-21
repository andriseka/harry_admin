import React, { useEffect, useState } from 'react'
import Konstituen from '../Konstituen'
import FormTitle from '../../../../components/title/FormTitle'
import Select from 'react-select'
import ButtonPrimary from '../../../../components/button/ButtonPrimary'
import { useDispatch, useSelector } from 'react-redux'
import { getDapil } from '../../../../../app/model/dapil/dapilSlice'
import { getDesa } from '../../../../../app/model/wilayah/desaSlice'
import { getDptByStatus } from '../../../../../app/model/dpt/dptSlice'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const KonstituenForm = () => {
    const dispatch = useDispatch();

    const dapil = useSelector(state => state.dapil.dapil);
    const desa = useSelector(state => state.desa.desa);
    const [dpt, setDpt] = useState([]);
    const [pagination, setPagination] = useState([]);

    const [select, setleSelect] = useState({
        kec_id : '',
        desa_id: '',
        name: ''
    })

    const getDataDapil = async() => {
        try {
            await dispatch(getDapil()).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    const getDataDesa = async(kec_id) => {
        try {
            await dispatch(getDesa(kec_id)).unwrap();
        } catch (error) {
            
        }
    }

    const getDataDpt = async(data) => {
        try {
            const response = await dispatch(getDptByStatus(data)).unwrap().catch((err) => {});
            setDpt(response.data);
            setPagination(response.pagination)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDapil();
    }, []);

    const handleDapil = (e) => {
        if (e) {
            setleSelect({
                kec_id: e.value,
                desa_id : '',
                name: ''
            })
            return getDataDesa(e.value);
        }
    }

    const handleDesa = (e) => {
        if (e) {
            setleSelect({
                ...select,
                desa_id : e.value,
                name: ''
            })
        }
    }

    const handleName = (e) => {
        if (e) {
            setleSelect({
                ...select,
                name: e.target.value
            })
        }
    }

    const handleSearch = async() => {
        const data = {
            code : select.kec_id + '.' + select.desa_id,
            name: select.name,
            page: 1
        }
        return getDataDpt(data);
    }

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berapa di halaman pertama', {icon: '🙏'});
        } else if (page === pagination.last_page + 1) {
            toast('Anda berapa di halaman terkahir', {icon: '🙏'});
        } else {
            const data = {
                code : select.kec_id + '.' + select.desa_id,
                name: select.name,
                page: page
            }
            return getDataDpt(data);
        }
    }


    return (
        <Konstituen>
            <div>
                <div className="card">
                    <div className="card-body">
                        <div>
                            <FormTitle title={'BUAT KONSTITUEN'} />
                        </div>

                        <div>
                            {/* filter */}
                            <div className="hidden md:block">
                                <div className="flex justify-between items-end mb-5">
                                    <div className="w-1/4 me-3">
                                        <label>Kecamatan</label>
                                        <Select 
                                            placeholder={'Kecamatan'}
                                            options={dapil}
                                            onChange={handleDapil}
                                        />
                                    </div>
                                    <div className="w-1/4 me-3">
                                        <label>Desa</label>
                                        <Select 
                                            placeholder={'Desa'}
                                            options={desa}
                                            onChange={handleDesa}
                                        />
                                    </div>
                                    <div className="w-1/3 me-3">
                                        <label>Cari Nama</label>
                                        <input type="text" className="form-control" placeholder="Cari Nama" onChange={handleName} />
                                    </div>
                                    <div>
                                        <ButtonPrimary name={'Cari'} onClick={handleSearch} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 block md:hidden mb-5">
                                <div>
                                    <label>Kecamatan</label>
                                    <Select 
                                        placeholder={'Kecamatan'}
                                        options={dapil}
                                        onChange={handleDapil}
                                    />
                                </div>
                                <div>
                                    <label>Desa</label>
                                    <Select 
                                        placeholder={'Desa'}
                                        options={desa}
                                        onChange={handleDesa}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label>Cari Nama</label>
                                    <input type="text" className="form-control" placeholder="Cari Nama" onChange={handleName} />
                                </div>
                                <div className="col-span-2 flex justify-end">
                                    <ButtonPrimary name={'Cari'} onClick={handleSearch} />
                                </div>
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
                                                <th scope="col" className="px-4 py-3 text-center">
                                                    Usia
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center">
                                                    Kecamatan
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center">
                                                    Desa
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center">
                                                    RT
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center">
                                                    RW
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center">
                                                    Tps
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                dpt.map((data) => {
                                                    return (
                                                        <tr key={data.no} className="bg-white border-b dark:border-gray-700 text-gray-600">
                                                            <td className="px-4 py-3">
                                                                { data.no }
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                { data.name }
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                { data.gender === 'L' ? 'Laki Laki' : 'Perempuan' }
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                { data.usia } Tahun
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                { data.kecamatan }
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                { data.desa }
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                { data.rt }
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                { data.rw }
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                { data.tps }
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <Link  to={`${data.id}`} className="bg-green-500 hover:bg-green-600 text-white rounded-full px-3 py-1 cursor-pointer">
                                                                    Pilih
                                                                </Link>
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
            </div>
        </Konstituen>
    )
}

export default KonstituenForm
