import React from 'react'
import Absensi from '../Absensi'
import FormTitle from '../../../components/title/FormTitle'
import Select from 'react-select'
import ButtonPrimary from '../../../components/button/ButtonPrimary'

const AbsesnsiForm = () => {
    return (
        <Absensi>
            <div>
                <div className="card">
                    <div className="card-body">
                        <div>
                            <FormTitle title={'BUAT ABSENSI'} />
                        </div>

                        <div className="flex justify-between items-end mb-5">
                            <div className="w-1/3 me-3">
                                <label>Kecamatan</label>
                                <Select 
                                    placeholder={'Kecamatan'}
                                />
                            </div>
                            <div className="w-1/3 me-3">
                                <label>Desa</label>
                                <Select 
                                    placeholder={'Desa'}
                                />
                            </div>
                            <div className="w-1/3 me-3">
                                <label>TPS</label>
                                <Select 
                                    placeholder={'TPS'}
                                />
                            </div>
                            <div>
                                <ButtonPrimary name={'FILTER'} />
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
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Absensi>
    )
}

export default AbsesnsiForm
