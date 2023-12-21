import React from 'react'
import Services from '../Services'
import FormTitle from '../../../components/title/FormTitle'
import ButtonPrimary from '../../../components/button/ButtonPrimary'
import Select from 'react-select'
import { Link } from 'react-router-dom'

const ServiceForm = ({
    refDesa, dapil, desa, dpt, pagination, handlePagination, handleDapil, handleDesa, handleName, handleSearch
}) => {
    return (
        <Services>
            <div className="card">
                <div className="card-body">
                    <div>
                        <FormTitle title={'Cari Nama DPT '} />
                    </div>

                    <div className="flex justify-between items-end mb-3">
                        <div className="w-2/6 me-1">
                            <label>Kecamatan</label>
                            <Select 
                                placeholder={'Kecamatan'}
                                options={dapil}
                                onChange={handleDapil}
                                required
                            />
                        </div>
                        <div className="w-2/6 me-3">
                            <label>Desa</label>
                            <Select 
                                ref={refDesa}
                                placeholder={'Desa'}
                                options={desa}
                                onChange={handleDesa}
                            />
                        </div>
                        <div className="w-3/6 me-3">
                            <label>Kecamatan</label>
                            <input type="text" className="form-control" onChange={handleName} placeholder="Cari Nama DPT"  />
                        </div>
                        <div>
                            <ButtonPrimary name={'Cari'} onClick={handleSearch} />
                        </div>
                    </div>

                    {/* list table */}
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
                                                <td className="px-4 py-3 text-center">
                                                    <Link to={`${data.id}`} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full">
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
                    
                    <div className="flex justify-between items-center">
                        <div>
                            <span>Halaman { pagination.current_page ? pagination.current_page : '' }</span>
                        </div>
                        {
                            pagination.pagination ?
                            <div>
                                <a onClick={() => handlePagination(pagination.current_page - 1)} className="me-3">Sebelumnya</a>
                                <a onClick={() => handlePagination(pagination.current_page + 1)}>Selanjutnya</a>
                            </div> : ''
                        }
                        <div>
                            <span>Total : { pagination.total ? pagination.total : '' } DPT </span>
                        </div>
                    </div>
                </div>
            </div>
        </Services>
    )
}

export default ServiceForm
