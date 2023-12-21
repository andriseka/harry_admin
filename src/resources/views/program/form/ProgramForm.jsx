import React from 'react'
import Program from '../Program'
import GridCols2 from '../../../components/grid/GridCols2'
import FormTitle from '../../../components/title/FormTitle'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../../../components/button/ButtonPrimary'
import Loading from '../../../components/loading/Loading'
import CurrencyInput from 'react-currency-input-field';

const ProgramForm = ({ timses, onSubmit, loading , handleNominal}) => {
    const {register, handleSubmit} = useForm();
    
    return (
        <Program>
            <div>
                { loading ? <Loading /> : '' }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <GridCols2>
                        <div>
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <FormTitle title={'INFORMASI PROGRAM'} />
                                    </div>
                                    <div>
                                        <div className="mb-3">
                                            <label>Pengusul</label>
                                            <select className="form-select"  {...register('timses_id')} required>
                                                <option value="">-- Pilih Pengusul</option>
                                                {
                                                    timses.map((data) => {
                                                        return(
                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label>Nama Program</label>
                                            <input type="text" className="form-control" placeholder="Tulis Nama Program" {...register('name')} />
                                        </div>
                                        <div className="mb-3">
                                            <GridCols2>
                                                <div>
                                                    <label>Status</label>
                                                    <select className="form-select"  {...register('status')} required>
                                                        <option value="sosialisasi">Sosialisasi</option>
                                                        <option value="kampanye">Kampanye Terbuka</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>Kategori</label>
                                                    <select className="form-select"  {...register('category')} required>
                                                        <option value="kampanye">Program Kampanye</option>
                                                        <option value="non">Program Non Kampaye</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>Tempat Pelaksanaan</label>
                                                    <input type="text" className="form-control" placeholder="Tulis Tempat Pelaksanaan" {...register('tmpt_pelaksanaan')} required />
                                                </div>
                                                <div>
                                                    <label>Tanggal Pelaksanaan</label>
                                                    <input type="date" className="form-control" {...register('tgl_pelaksanaan')} required />
                                                </div>
                                            </GridCols2>
                                        </div>
                                        <div className="mb-3">
                                            <label>Rencana Anggaran</label>
                                            <CurrencyInput
                                                id="input-example"
                                                name="input-name"
                                                prefix='Rp. '
                                                className='form-control'
                                                placeholder="Please enter a number"
                                                defaultValue={0}
                                                decimalsLimit={2}
                                                onValueChange={(value) => handleNominal(value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <FormTitle title={'INFORMASI TAMBAHAN'} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Deskripsi</label>
                                        <textarea className="form-control" placeholder="Tulis Deskripsi"  {...register('description')} style={{height: '100px'}}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label>Upload File Pengajuan</label>
                                        <input type="file" className="form-control px-2 py-1" multiple  {...register('files')} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Upload Pamflet</label>
                                        <input type="file" className="form-control px-2 py-1" multiple  {...register('pamflet')} />
                                    </div>
                                    <div className="flex justify-end">
                                        <ButtonPrimary name={'Simpan Data'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GridCols2>
                </form>
            </div>
        </Program>
    )
}

export default ProgramForm
