import React from 'react'
import Caleg from '../Caleg'
import ButtonSuccess from '../../../components/button/ButtonSuccess'
import { useForm } from 'react-hook-form'
import GridCols2 from '../../../components/grid/GridCols2'
import FormTitle from '../../../components/title/FormTitle'
import Loading from '../../../components/loading/Loading'

const CalegData = ({ caleg, onUpdateProfile, message, loading }) => {
    const {register, handleSubmit} = useForm({
        defaultValues: caleg
    })
    return (
        <Caleg>
            <div>
                { loading ? <Loading /> : '' }
                <div className="mt-10 md:mt-0">
                    <div className="profile user-profile">
                        <div className="profiles_banner">
                            <img src={caleg ? caleg.banner : ""} alt="" />
                        </div>
                        <div className="profiles_content">
                            <div className="profile_avatar">
                                <div className="profile_avatar_holder"> 
                                    <img src={caleg ? caleg.photo: ""} alt="" />
                                </div>
                            </div>

                            <div className="profile_info text-center">
                                <h1> { caleg ? caleg.name: "" } </h1>
                                <p> { caleg ? caleg.nama_partai : "" } { caleg ? `( ${ caleg.singkatan_partai } )` : "" }</p>
                                <p> { caleg ? caleg.provinsi : "" } | { caleg ? caleg.kabupaten : "" } | { caleg ? `Dapil ${caleg.dapil}` : "" }</p>
                            </div>
                        </div>
                    </div>

                    {/* form */}
                    <form onSubmit={handleSubmit(onUpdateProfile)}>
                        <GridCols2>
                            <div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <FormTitle title={'Personal Data'} />
                                        <div className="mb-3">
                                            <label>Nama Lengkap</label>
                                            <input type="text" className="form-control" placeholder="Tulis Nama Lengkap" {...register('name')} required />
                                        </div>
                                        <div className="mb-3">
                                            <label>Alamat</label>
                                            <input type="text" className="form-control" placeholder="Tulis Alamat" {...register('address')} required />
                                        </div>
                                        <div className="mb-3">
                                            <GridCols2>
                                                <div>
                                                    <label>Tempat Lahir</label>
                                                    <input type="text" className="form-control" placeholder="Tulis Tempat Lahir" {...register('tmpt_lhr')} required />
                                                </div>
                                                <div>
                                                    <label>Tanggal Lahir</label>
                                                    <input type="date" className="form-control" {...register('tgl_lhr')} required />
                                                </div>
                                            </GridCols2>
                                        </div>
                                        <div className="mb-3">
                                            <label>Riwayat Pendidikan</label>
                                            <textarea className="form-control" style={{height: '80px'}} {...register('rwyt_pddkn')} placeholder="Pisah dengan tanda koma ( , )" ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label>Riwayat Pekerjaan</label>
                                            <textarea className="form-control" style={{height: '80px'}} {...register('rwyt_pkrjn')} placeholder="Pisah dengan tanda koma ( , )" ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label>Riwayat Organisasi</label>
                                            <textarea className="form-control" style={{height: '80px'}} {...register('rwyt_org')} placeholder="Pisah dengan tanda koma ( , )" ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <FormTitle title={'HAK AKSES'} />
                                        <div className="mb-3">
                                            <label>Username</label>
                                            <input type="text" className="form-control" placeholder="Tulis Username" {...register('username')} required />
                                            <span className="text-red-400 text-xs">{ message.username ? message.username: '' }</span>
                                        </div>
                                        <div className="mb-3">
                                            <label>Password</label>
                                            <input type="text" className="form-control" placeholder="Tulis Password" {...register('password')} />
                                            <span className="text-red-400 text-xs">{ message.password ? message.password: '' }</span>
                                        </div>
                                        <div className="mb-3">
                                            <label>Konfirmasi Password</label>
                                            <input type="text" className="form-control" placeholder="Konfirmasi Password" {...register('password_confirmation')} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <FormTitle title={'DATA PARTAI'} />
                                        <div className="mb-3">
                                            <label>Nama Partai</label>
                                            <input type="text" className="form-control" placeholder="Tulis Nama Partai" {...register('nama_partai')} required />
                                        </div>
                                        <div className="mb-3">
                                            <GridCols2>
                                                <div>
                                                    <label>Singkatan Partai</label>
                                                    <input type="text" className="form-control" placeholder="Tulis Singkatan Partai" {...register('singkatan_partai')} required />
                                                </div>
                                                <div>
                                                    <label>Status</label>
                                                    <input type="text" className="form-control" defaultValue={'DPR RI'} disabled />
                                                </div>
                                            </GridCols2>
                                        </div>
                                        <div className="mb-3">
                                            <GridCols2>
                                                <div>
                                                    <label>Provinsi</label>
                                                    <input type="text" className="form-control" defaultValue={caleg.provinsi ? caleg.provinsi : ''} disabled />
                                                </div>
                                                <div>
                                                    <label>Kabupaten</label>
                                                    <input type="text" className="form-control" defaultValue={caleg.kabupaten ? caleg.kabupaten : ''} disabled />
                                                </div>
                                            </GridCols2>
                                        </div>
                                        <div className="mb-3">
                                            <GridCols2>
                                                <div>
                                                    <label>Dapil</label>
                                                    <input type="number" min={1} className="form-control" placeholder="Tulis Dapil" {...register('dapil')} required />
                                                </div>
                                                <div>
                                                    <label>Nomor Urut</label>
                                                    <input type="number" min={1} className="form-control" placeholder="Tulis Nomor Urut" {...register('no_urut')} required />
                                                </div>
                                            </GridCols2>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <FormTitle title={'INFORMASI LAINNYA'} />
                                        <div className="mb-3">
                                            <label>Visi</label>
                                            <textarea className="form-control" {...register('visi')} placeholder="Tulis Visi"></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label>Misi</label>
                                            <textarea className="form-control" {...register('misi')} placeholder="Tulis Misi" style={{height: '80px'}}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label>Slogan</label>
                                            <textarea className="form-control" {...register('slogan')} placeholder="Tulis Slogan" ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label>Upload Foto</label>
                                            <input type="file" className="form-control px-2 py-1" accept="image/png, image/jpg, image/jpeg" {...register('new_photo')} />
                                        </div>
                                        <div className="mb-3">
                                            <label>Upload Banner</label>
                                            <input type="file" className="form-control px-2 py-1" accept="image/png, image/jpg, image/jpeg" {...register('new_banner')} />
                                        </div>
                                        <div className="flex justify-end">
                                            <ButtonSuccess name={'Update Data'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GridCols2>
                    </form>
                </div>
            </div>
        </Caleg>
    )
}

export default CalegData
