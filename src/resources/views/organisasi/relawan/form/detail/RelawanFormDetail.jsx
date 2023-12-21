import React, { useEffect, useState } from 'react'
import Layouts from '../../../../layouts/Layouts'
import FormTitle from '../../../../../components/title/FormTitle'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDptDetail } from '../../../../../../app/model/dpt/dptSlice'
import GridCols2 from '../../../../../components/grid/GridCols2'
import ButtonPrimary from '../../../../../components/button/ButtonPrimary'
import { getAllTimses } from '../../../../../../app/model/timses/timsesSlice'
import { useForm } from 'react-hook-form'
import { imageResizer } from '../../../../../../utils/imageResizer';
import { postRelawan } from '../../../../../../app/model/relawan/relawanSlice'
import Loading from '../../../../../components/loading/Loading'

const RelawanFormDetail = () => {
    const dispatch = useDispatch();
    const { dpt_id } = useParams();
    const {username} = useParams();

    const[detail, setDetail] = useState([]);
    const [timses, setTimses] = useState([]);

    const {register, handleSubmit} = useForm();
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);


    // get data
    const getDataDetailDpt  = async() => {
        try {
            const response = await dispatch(getDptDetail(dpt_id)).unwrap().catch((err) => {});
            if (response.status === 404) {
                return window.location.href = `/${username}/organisasi/relawan/form`;
            }
            if (response.status === 200) {
                setDetail(response.data);
            }
        } catch (error) {
            
        }
    }

    const getDataTimses = async() => {
        try {
            const response = await dispatch(getAllTimses()).unwrap().catch((err) => {});
            setTimses(response);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetailDpt();
        getDataTimses();
    }, []);

    // submit
    const onSubmit = async(data) => {
        setLoading(true);
        if (data.docs.length > 0) {
            data.docs = await imageResizer(data.docs[0], 780, 400);
        } else {
            data.docs = ''
        }

        if (data.photo.length ) {
            data.photo = await imageResizer(data.photo[0], 256, 256);
        } else {
            data.photo = ''
        }

        data = {
            ...data,
            dpt_id: dpt_id
        }  

        try {
            const response = await dispatch(postRelawan(data)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 201) {
                    return window.location.href = `/${username}/organisasi/relawan/data`
                }
                if (response.status === 400) {
                    setError(response.message);
                }
            }
        } catch (error) {
            setLoading(false);
        }
    }

    const cancleForm = () => {
        return window.location.href = `/${username}/organisasi/relawan/form`
    }

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
        <Layouts>
            <div>
                { loading ? <Loading /> : '' }
                <div className="card max-w-xl mx-auto">
                    <div className="card-body">
                        <div className="flex justify-between items-top">
                            <FormTitle title={'TAMBAH RELAWAN'} />
                            <div>
                                <span onClick={cancleForm} className="cursor-pointer bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-full">
                                    Batalkan
                                </span>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <GridCols2>
                                    <div>
                                        <label>Nama Lengkap</label>
                                        <input type="text" className="form-control" placeholder={detail.name ? detail.name : ''} disabled />
                                    </div>
                                    <div>
                                        <label>Jenis Kelamin</label>
                                        <input type="text" className="form-control" 
                                            placeholder={detail.gender === 'P' ? 'Perempuan' : detail.gender === 'L' ? 'Laki Laki' : ''} 
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label>Usia</label>
                                        <input type="text" className="form-control" placeholder={detail.usia ? `${detail.usia} Tahun` : ''} disabled />
                                    </div>
                                    <div>
                                        <label>Kecamatan</label>
                                        <input type="text" className="form-control" placeholder={detail.kecamatan ? detail.kecamatan : ''} disabled />
                                    </div>
                                    <div>
                                        <label>Desa</label>
                                        <input type="text" className="form-control" placeholder={detail.desa ? detail.desa : ''} disabled />
                                    </div>
                                    <div>
                                        <label>Tps</label>
                                        <input type="text" className="form-control" placeholder={detail.tps ? detail.tps : ''} disabled />
                                    </div>
                                    <div>
                                        <label>RT</label>
                                        <input type="text" className="form-control" placeholder={detail.rt ? detail.rt : ''} disabled />
                                    </div>
                                    <div>
                                        <label>Rw</label>
                                        <input type="text" className="form-control" placeholder={detail.rw ? detail.rw : ''} disabled />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label>Tim Sukses</label>
                                        <select className="form-select" {...register('timses_id')} required>
                                            <option value="">-- Pilih Tim Sukses --</option>
                                            {
                                                timses.map((data) => {
                                                    return (
                                                        <option key={data.id} value={data.id}>{ data.name }</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label>Nomor Handphone</label>
                                        <input type="text" className="form-control" placeholder="Tulis Nomor Handphone" {...register('phone')} required />
                                        <span className="text-red-400 text-xs">{ error.phone ? 'Nomor handphone sudah di gunakan' : '' }</span>
                                    </div>
                                    <div>
                                        <label>Target Konstituen</label>
                                        <input type="number" min={1} className="form-control" placeholder="Target Konstituen" {...register('target')} required />
                                    </div>
                                    <div>
                                        <label>Posisi</label>
                                        <input type="text" className="form-control" placeholder={'Relawan'} disabled />
                                    </div>
                                    <div>
                                        <label>Jabatan</label>
                                        <select className="form-select" {...register('jabatan')} required>
                                            <option value="anggota">Anggota</option>
                                            <option value="korcam">Koordinator Kecamatan</option>
                                            <option value="kordes">Koordinator Desa</option>
                                            <option value="korwe">Koordinator RW</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Username</label>
                                        <input type="text" className="form-control" defaultValue={'Username default Nomor HP'} disabled required />
                                    </div>
                                    <div>
                                        <label>Password</label>
                                        <input type="text" className="form-control" placeholder={'Tulis Password'} {...register('password')} required />
                                    </div>
                                    <div>
                                        <label>Upload Dokumen</label>
                                        <input type="file" accept="image/png, image/jpg, image/jpeg" className="form-control px-2 py-1" {...register('docs')} />
                                    </div>
                                    <div>
                                        <label>Upload Foto</label>
                                        <input id="foto" type="file" accept="image/png, image/jpg, image/jpeg" className="form-control px-2 py-1" {...register('photo')} />
                                        <div id="preview-foto">

                                        </div>
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
        </Layouts>
    )
}

export default RelawanFormDetail
