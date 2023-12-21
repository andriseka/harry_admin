import React from 'react'
import DapilVoting from '../DapilVoting'
import FormTitle from '../../../../components/title/FormTitle'
import Select from 'react-select'
import ButtonPrimary from '../../../../components/button/ButtonPrimary'
import Loading from '../../../../components/loading/Loading'

const DapilVotingForm = ({ dapil, desa, handleDapil, handleDesa, refDesa, onSubmit, loading }) => {
    return (
        <DapilVoting>
            <div>
                { loading ? <Loading />  : '' }
                <div className="card max-w-xl mx-auto">
                    <div className="card-body">
                        <FormTitle title={'BUAT VOTING BLOCK'} />
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
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
                            </div>
                            <div className="flex justify-end">
                                <ButtonPrimary name={'Simpan Data'} onClick={onSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DapilVoting>
    )
}

export default DapilVotingForm
