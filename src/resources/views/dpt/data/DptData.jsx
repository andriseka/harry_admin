import React from 'react'
import Dpt from '../Dpt'
import FormTitle from '../../../components/title/FormTitle'
import Select from 'react-select'
import ButtonPrimary from '../../../components/button/ButtonPrimary'
import ButtonDanger from '../../../components/button/ButtonDanger'

const DptData = ({
    dpt, dapil, desa, tps, refDapil, refDesa, refTps, pagination, handlePagination, handlePaginationFilter, 
    handleDapil, handleDesa, handleTps, handleName, handleFilter, handleUnlock, filter,
    handlePaginationSearch, search
}) => {

    console.log(dpt);
    return (
        <Dpt>
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="text-center">
                            <FormTitle title={'DATA DAFTAR PEMILIH TETAP ( DPT )'} /> 
                        </div>
                        {/* filter */}
                        <div className="hidden md:block">
                            <div className="flex justify-between items-end mb-5">
                                <div className="w-1/4 me-3">
                                    <label>Kecamatan</label>
                                    <Select 
                                        ref={refDapil}
                                        isDisabled={filter}
                                        placeholder={'Kecamatan'}
                                        options={dapil}
                                        onChange={handleDapil}
                                    />
                                </div>
                                <div className="w-1/4 me-3">
                                    <label>Desa</label>
                                    <Select 
                                        isDisabled={filter}
                                        ref={refDesa}
                                        placeholder={'Desa'}
                                        options={desa}
                                        onChange={handleDesa}
                                    />
                                </div>
                                <div className="w-1/4 me-3">
                                    <label>Tps</label>
                                    <Select 
                                        isDisabled={filter}
                                        ref={refTps}
                                        placeholder={'Tps'}
                                        options={tps}
                                        onChange={handleTps}
                                    />
                                </div>
                                <div className="w-1/3 me-3">
                                    <label>Cari Nama</label>
                                    <input type="text" className="form-control" placeholder="Cari Nama Dpt" disabled={filter} onChange={handleName} />
                                </div>
                                <div>
                                    {
                                        filter ? <ButtonDanger name={'Unlock'} onClick={handleUnlock} /> :
                                        <ButtonPrimary name={'Cari'} onClick={handleFilter} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 block md:hidden mb-5">
                            <div>
                                <label>Kecamatan</label>
                                <Select 
                                    ref={refDapil}
                                    isDisabled={filter}
                                    placeholder={'Kecamatan'}
                                    options={dapil}
                                    onChange={handleDapil}
                                />
                            </div>
                            <div>
                                <label>Desa</label>
                                <Select 
                                    isDisabled={filter}
                                    ref={refDesa}
                                    placeholder={'Desa'}
                                    options={desa}
                                    onChange={handleDesa}
                                />
                            </div>
                            <div>
                                <label>Tps</label>
                                <Select 
                                    isDisabled={filter}
                                    ref={refTps}
                                    placeholder={'Tps'}
                                    options={tps}
                                    onChange={handleTps}
                                />
                            </div>
                            <div>
                                <label>Cari Nama</label>
                                <input type="text" className="form-control" placeholder="Cari Nama Dpt" disabled={filter} onChange={handleName} />
                            </div>
                            <div>
                                {
                                    filter ? <ButtonDanger name={'Unlock'} onClick={handleUnlock} /> :
                                    <ButtonPrimary name={'Cari'} onClick={handleFilter} />
                                }
                            </div>
                        </div>

                        {/* list table */}
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
                                    search === true && filter === true && pagination.pagination === true ?
                                    <div>
                                        <a className="me-3" onClick={() => handlePaginationSearch(pagination.current_page - 1)}>Sebelumnya</a>
                                        <a onClick={() => handlePaginationSearch(pagination.current_page + 1)}>Selanjutnya</a>
                                    </div> : ''
                                }

                                {
                                    search === false && filter === true && pagination.pagination === true ?
                                    <div>
                                        <a className="me-3" onClick={() => handlePaginationFilter(pagination.current_page - 1)}>Sebelumnya</a>
                                        <a onClick={() => handlePaginationFilter(pagination.current_page + 1)}>Selanjutnya</a>
                                    </div> : ''
                                }
                                {
                                    search === false && filter === false && pagination.pagination === true ?
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
            </div>
        </Dpt>
    )
}

export default DptData
