import React, { useState } from 'react'
import Pengumuman from '../Pengumuman'
import FormTitle from '../../../components/title/FormTitle'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../../../components/button/ButtonPrimary'
import { useDispatch } from 'react-redux'
import { postPengumuman } from '../../../../app/model/pengumuman/pengumumanSlice'
import Loading from '../../../components/loading/Loading'
import { useParams } from 'react-router-dom'

const PengumumanForm = () => {
    const dispatch = useDispatch();
    const { username } = useParams();

    const {register, handleSubmit} = useForm();
    const[loading, setLoading] = useState(false);

    const onSubmit = async(data) => {
        setLoading(true)
        data = {
            ...data,
            user_id: 0,
            name: 'Admin',
            status: 'admin'
        }
        try {
            const response = await dispatch(postPengumuman(data)).unwrap().catch((err) => {});
            if (response.status === 201) {
                return window.location.href = `/${username}/pengumuman/data`
            }
        } catch (error) {
            
        }
    }

    return (
        <Pengumuman>
            { loading ? <Loading /> : '' }
            <div>
                <div className="card max-w-xl mx-auto">
                    <div className="card-body">
                        <div>
                            <FormTitle title={'BUAT PENGUMUMAN'} />
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label>Judul</label>
                                <input type="text" className="form-control" placeholder="Tulis Judul" {...register('title')} required />
                            </div>
                            <div className="mb-3">
                                <label>Kepada</label>
                                <select className="form-select" {...register('to')} required>
                                    <option value="all">Semua</option>
                                    <option value="korcam">Korrdinator Kecamatan</option>
                                    <option value="kordes">Koordinator Desa</option>
                                    <option value="korwe">Koordinator RW</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>Pesan</label>
                                <textarea style={{height: '100px'}} className="form-control" { ...register('isi') } required placeholder="Tulis Isi Pengumuman"></textarea>
                            </div>
                            <div className="flex justify-end">
                                <ButtonPrimary name={'Simpan Data'} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Pengumuman>
    )
}

export default PengumumanForm
