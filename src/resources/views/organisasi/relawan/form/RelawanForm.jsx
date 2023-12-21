import React from 'react'
import Relawan from '../Relawan'
import Select from 'react-select'
import FormTitle from '../../../../components/title/FormTitle'
import ButtonPrimary from '../../../../components/button/ButtonPrimary'
import { Link } from 'react-router-dom'

const RelawanForm = ({
    dapil, desa, dpt, pagination, handleDapil, refDesa, handleDesa, handleName, handleSearch,
    handlePagination
}) => {

    return (
        <Relawan>
            <div>
                <div className="card">
                    <div className="card-body">
                        <div>
                            <FormTitle title={'BUAT RELAWAN'} />
                        </div>
                        <div className="md:block hidden">
                            <div className="flex justify-between items-end mb-4">
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
                                        ref={refDesa}
                                        placeholder={'Desa'}
                                        options={desa}
                                        onChange={handleDesa}
                                    />
                                </div>
                                <div className="w-1/3 me-3">
                                    <label>Cari Nama</label>
                                    <input type="text" className="form-control" placeholder="Cari Name" onChange={handleName} />
                                </div>
                                <div>
                                    <ButtonPrimary name={'Cari'} onClick={handleSearch} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 block md:hidden mb-4">
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
                                    ref={refDesa}
                                    placeholder={'Desa'}
                                    options={desa}
                                    onChange={handleDesa}
                                />
                            </div>
                            <div className="col-span-2">
                                <label>Cari Nama</label>
                                <input type="text" className="form-control" placeholder="Cari Name" onChange={handleName} />
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <ButtonPrimary name={'Cari'} onClick={handleSearch} />
                            </div>
                        </div>

                        {/* list */}
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
                                            return(
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
                                                    <td className="px-4 py-2 text-center">
                                                        <Link to={`${data.id}`} className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white hover:text-white rounded-full">
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

                        {/* pagination */}
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
                                <span>Total : { pagination.total ? pagination.total : '' } DPT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Relawan>
    )
}

export default RelawanForm
