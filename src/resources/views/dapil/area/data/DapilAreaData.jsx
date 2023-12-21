import React from 'react'
import DapilArea from '../DapilArea'
import FormTitle from '../../../../components/title/FormTitle'
import Select from 'react-select'
import ButtonDanger from '../../../../components/button/ButtonDanger'
import ButtonPrimary from '../../../../components/button/ButtonPrimary'

const DapilAreaData = ({
    dapil, tps, optionDesa, pagination, handlePagination, handleDapil, 
    handleDesa, handleLockFilter, handleUnlockFilter, refDesa, filter,
    handlePaginationFilter
}) => {
    return (
        <DapilArea>
            <div>
                <div className="card max-w-2xl mx-auto">
                    <div className="card-body">
                        <FormTitle title={'DATA DAPIL'} />
                        <div className="md:flex md:justify-between md:items-end mb-5">
                            <div className="md:w-1/2 md:me-3 mb-3">
                                <label>Kecamatan</label>
                                <Select 
                                    placeholder={'Kecamatan'}
                                    isDisabled={filter}
                                    options={dapil}
                                    onChange={handleDapil}
                                />
                            </div>
                            <div className="md:w-1/2 md:me-3 mb-3">
                                <label>Desa</label>
                                <Select 
                                    ref={refDesa}
                                    placeholder={'Desa'}
                                    isDisabled={filter}
                                    options={optionDesa}
                                    onChange={handleDesa}
                                />
                            </div>
                            <div>
                                {
                                    filter ?  <ButtonDanger name={'Unlock'} onClick={handleUnlockFilter}  />  :
                                    <ButtonPrimary name={'Lock'} onClick={handleLockFilter}  /> 
                                }
                            </div>
                        </div>

                        {/* list */}
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
                                            <th scope="col" className="px-4 py-3 text-center" style={{width:"15%"}}>
                                                TPS
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tps.map((data) => {
                                                return(
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
                                                            TPS {data.tps}
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
                                    filter === false && pagination.pagination === true ? 
                                    <div className="flex justify-center">
                                        <a className="me-3" onClick={() => handlePagination(pagination.current_page - 1)}>Sebelumnya</a>
                                        <a onClick={() => handlePagination(pagination.current_page + 1)}>Selanjutnya</a>
                                    </div> : ''
                                }

                                {
                                    filter === true && pagination.pagination === true ? 
                                    <div className="flex justify-center">
                                        <a className="me-3" onClick={() => handlePaginationFilter(pagination.current_page - 1)}>Sebelumnya</a>
                                        <a onClick={() => handlePaginationFilter(pagination.current_page + 1)}>Selanjutnya</a>
                                    </div> : ''
                                }
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span>Halaman { pagination.current_page ? pagination.current_page : '' }</span>
                                </div>
                                <div>
                                    <span>Total : { pagination.total ? pagination.total : '' } Tps</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DapilArea>
    )
}

export default DapilAreaData
