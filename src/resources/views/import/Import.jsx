import React from 'react'
import Layouts from '../layouts/Layouts'
import Select from 'react-select'
import ButtonPrimary from '../../components/button/ButtonPrimary'

const Import = ({
    dapil, desa, tps, handleDapil, handleDesa, handleDownload
}) => {

    return (
        <Layouts>
            <div className="lg:flex  lg:space-x-12">
                <div className="lg:w-3/4">
                    <div className="flex justify-between items-center relative md:mb-4 mb-3">
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold"> IMPORT DATA DPT </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleDownload}>
                                <div className="mb-3">
                                    <label>Kecamatan</label>
                                    <Select 
                                        placeholder={'Pilih Kecamatan'}
                                        options={dapil}
                                        onChange={handleDapil}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Desa</label>
                                    <Select 
                                        placeholder={'Desa'}
                                        options={desa}
                                        onChange={handleDesa}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>TPS</label>
                                    <Select 
                                        placeholder={'TPS'}
                                        options={tps}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <ButtonPrimary name={'Download Template'} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
        </Layouts>
    )
}

export default Import
