import React, { useEffect } from 'react'
import Timses from '../Timses'
import FormTitle from '../../../../components/title/FormTitle'
import GridCols2 from '../../../../components/grid/GridCols2'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../../../../components/button/ButtonPrimary'
import Loading from '../../../../components/loading/Loading'

const TimsesForm = ({ onSubmit, error, loading }) => {
    const {register, handleSubmit} = useForm();

    // preview foto
    let foto = document.getElementById("foto");
    let previewFoto = document.getElementById("preview-foto");
    if (foto) {
        foto.addEventListener("change", function(e) {
            let file = this.files[0];
            let preview = URL.createObjectURL(file); 
            previewFoto.innerHTML = "<img src='"+preview+"' class='mt-3 w-64 h-64 rounded-full' />"
        });
    }


    return (
        <Timses>
            <div>
                { loading ? <Loading /> : '' }
                <div className="card max-w-xl mx-auto">
                    <div className="card-body">
                        <FormTitle title={'BUAT STRUKTUR'} />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <GridCols2>
                                    <div>
                                        <label>Nama Lengkap</label>
                                        <input type="text" className="form-control" placeholder="Tulis Nama Lengkap" {...register('name')} required />
                                    </div>
                                    <div>
                                        <label>Alamat</label>
                                        <input type="text" className="form-control" placeholder="Tulis Alamat" {...register('address')} />
                                    </div>
                                    <div>
                                        <label>Jenis Kelamin</label>
                                        <select className="form-select" {...register('gender')} required>
                                            <option value="L">Laki Laki</option>
                                            <option value="P">Perempuan</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Nomor Handphone</label>
                                        <input type="text" className="form-control" placeholder="Tulis Nomor Handphone" {...register('phone')} required />
                                        <span className="text-red-400 text-xs">{ error.phone ? 'Nomor sudah digunakan' : ''}</span>
                                    </div>
                                    <div>
                                        <label>Posisi</label>
                                        <select className="form-select" {...register('posisi')} required>
                                            <option value="timses">Tim Sukses</option>
                                            <option value="accountant">Keuangan</option>
                                            <option value="assessment">Assessment</option>
                                            <option value="sanksi">Sanksi</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Jabatan</label>
                                        <select className="form-select" {...register('jabatan')} required>
                                            <option value="ketua">Ketua</option>
                                            <option value="anggota">Anggota</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Upload Dokumen</label>
                                        <input type="file" className="form-control px-2 py-1" accept="image/png, image/jpg, image/jpeg" {...register('docs')} />
                                    </div>
                                    <div>
                                        <label>Upload Foto</label>
                                        <input id="foto" type="file" className="form-control px-2 py-1" accept="image/png, image/jpg, image/jpeg" {...register('photo')} />
                                        <div id="preview-foto">

                                        </div>
                                    </div>
                                    <div>
                                        <label>Username</label>
                                        <input type="text" className="form-control" placeholder="Tulis Username" {...register('username')} required />
                                        <span className="text-red-400 text-xs">{ error.username ? 'Username sudah digunakan' : ''}</span>
                                    </div>
                                    <div>
                                        <label>Password</label>
                                        <input type="text" className="form-control" placeholder="Tulis Password" {...register('password')} required />
                                    </div>
                                </GridCols2>
                            </div>
                            <div className="flex justify-end">
                                <ButtonPrimary name={'Simpan Data'} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Timses>
    )
}

export default TimsesForm
