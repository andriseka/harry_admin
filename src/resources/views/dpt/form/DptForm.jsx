import React from 'react'
import Dpt from '../Dpt'
import { useForm } from 'react-hook-form'
import Select from 'react-select';
import ButtonPrimary from '../../../components/button/ButtonPrimary';
import Loading from '../../../components/loading/Loading'

const DptForm = ({
    refDesa, refTps, dapil, desa, tps, handleDapil,handleDesa, handleTps, onSubmit,
    loading
}) => {
    const {register, handleSubmit} = useForm();
    return (
        <Dpt>
            <div>
                { loading ? <Loading /> : '' }
                <div className="card max-w-xl mx-auto">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label>Nama Lengkap</label>
                                    <input type="text" className="form-control" placeholder="Tulis Nama Lengkap" {...register('name')} required />
                                </div>
                                <div>
                                    <label>Jenis Kelamin</label>
                                    <select className="form-select" {...register('gender')}>
                                        <option value="L">Laki Laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Usia</label>
                                    <input type="number" min={16} className="form-control" placeholder="Tulis Usia" {...register('usia')} required />
                                </div>
                                <div>
                                    <label>Kecamatan</label>
                                    <Select 
                                        placeholder={'Kecamatan'}
                                        options={dapil}
                                        onChange={handleDapil}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Desa</label>
                                    <Select 
                                        ref={refDesa}
                                        placeholder={'Desa'}
                                        options={desa}
                                        onChange={handleDesa}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Tps</label>
                                    <Select 
                                        ref={refTps}
                                        placeholder={'Tps'}
                                        options={tps}
                                        onChange={handleTps}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>RT</label>
                                    <input type="number" min={1} className="form-control" placeholder="Tulis RT" {...register('rt')} required />
                                </div>
                                <div>
                                    <label>RW</label>
                                    <input type="number" min={1} className="form-control" placeholder="Tulis RW" {...register('rw')} required />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <ButtonPrimary name={'Simpan Data'} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Dpt>
    )
}

export default DptForm
