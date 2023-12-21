import React, { useState } from 'react'
import Layouts from '../../../layouts/Layouts'
import { useNavigate, useParams } from 'react-router-dom'
import FormTitle from '../../../../components/title/FormTitle'
import GridCols2 from '../../../../components/grid/GridCols2'
import ButtonSuccess from '../../../../components/button/ButtonSuccess'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateTimses } from '../../../../../app/model/timses/timsesSlice'
import { imageResizer } from '../../../../../utils/imageResizer'
import Loading from '../../../../components/loading/Loading'
import Korwe from '../../relawan/organisasi/Korwe'
import Korcam from '../../relawan/organisasi/Korcam'
import Kordes from '../../relawan/organisasi/Kordes'
import { Camera, CameraResultType } from '@capacitor/camera'

import { b64toBlob } from '../../../../components/b64toblob/b64toblob'
import toast, { Toaster } from 'react-hot-toast'

const TimsesDataDetail = ({ detail }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const { username, timses } = useParams();

    const {register, handleSubmit} = useForm();

    const handleBack = () => {
        return window.location.href = `/${username}/organisasi/timses/data`;
    }

    const onUpdate = async(data) => {
        setLoading(true);
        if (data.photo.length > 0) {
            data.photo = await imageResizer(data.photo[0], 256, 256).catch((err) => {});
        } else {
            data.photo = ''
        }

        if (data.docs.length > 0) {
            data.docs = await imageResizer(data.docs[0], 780, 400).catch((err) => {});
        } else {
            data.docs = ''
        }
        if (data.username === '') {
            data.username = timses
        } else {
            data.username = data.username
        }

        data = {
            ...data,
            username: timses,
            new_username: data.username
        }
        try {
            const response = await dispatch(updateTimses(data)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response) {
                    setLoading(false);
                    if (response.status === 200) {
                        return window.location.href = `/${username}/organisasi/timses/data/${data.new_username}`
                    }
                }
            }
        } catch (error) {
            
        }
    }

    // update foto
    const [picture, setPicture] = useState('');
    const takePicture = async() => {
        try {
            const image = await Camera.getPhoto({
                quality: 30,
                allowEditing: true,
                resultType: CameraResultType.Base64
            });
            let imageUrl = image.base64String;

            // temp
            setPicture('data:image/png;base64,'+ imageUrl);

            let upload = b64toBlob(imageUrl, 'image/png');
            const file = new File([upload], 'photo.png', {
                type: upload.type,
                lastModified: new Date().getTime()
            });

            const resize = await imageResizer(file, 256, 256);    
            const data = {
                photo: resize,
                username: timses
            }
            const response = await dispatch(updateTimses(data)).unwrap().catch((err) => {});
            if (response.status === 200) {
                toast.success('Foto berhasil diperbaharui');
                setTimeout(() => {
                   window.location.reload(); 
                }, 1000);
            }
        } catch (error) {
            
        }

    }

    return (
        <Layouts>
            { loading ? <Loading /> : '' }
            <Toaster position="top-right" />
            <div>
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <span className="text-2xl font-bold text-gray-600">{ detail.name ? detail.name : '' }</span>
                    </div>
                    <div>
                        <span className="cursor-pointer text-orange-400 hover:text-orange-600" onClick={handleBack}>Kembali</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="flex justify-center mb-3">
                                <div className="mb-3">
                                    <img src={ picture.length > 0 ? picture : detail.photo } alt="" className="w-64 h-64 mb-3 rounded-full" />
                                    <div className="flex justify-end mb-3">
                                        <span onClick={takePicture} className="cursor-pointer px-3 py-1 bg-orange-500 rounded-full text-white text-xs">Update Foto</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-lg font-bold text-gray-600"> { detail.name ? detail.name : '' } </span> <br />
                                        <span className="text-base text-gray-600">
                                            { 
                                                detail.posisi === 'timses' ? 'Tim Sukses' :  
                                                detail.posisi === 'sanksi' ? 'Sanksi' :
                                                detail.posisi === 'assessment' ? 'Assessment' :  
                                                detail.posisi === 'accountant' ? 'Keuangan' :  ''
                                            }
                                        </span> &nbsp;
                                        <span className="text-base text-gray-600"> 
                                            { 
                                                detail.jabatan === 'ketua' ? '( Ketua )' : 
                                                detail.jabatan === 'anggota' ? '(Anggota )' : ''
                                            } 
                                        </span> <br /> <br />
                                        <a href={`https://wa.me/${detail.phone ? detail.phone : ''}`} target="_blank" className="bg-green-500 hover:bg-green-600 text-white hover:text-white rounded-full px-3 py-2">
                                            { detail.phone ? detail.phone : '' }
                                        </a>
                                        <div className="mt-6">
                                            <a href={ detail.docs ? detail.docs : '' } className="text-blue-500 hover:text-blue-600" target="_blank">Lihat Dokumen</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onUpdate)}>
                                <div>
                                    <FormTitle title={'PERSONAL DATA'} />
                                </div>
                                <div className="mb-3">
                                    <GridCols2>
                                        <div>
                                            <label>Nama Lengkap</label>
                                            <input type="text" className="form-control" defaultValue={detail.name ? detail.name : ''} disabled />
                                        </div>
                                        <div>
                                            <label>Jenis Kelamin</label>
                                            <input type="text" className="form-control" 
                                                defaultValue={
                                                    detail.gender === 'L' ? 'Laki Laki' :
                                                    detail.gender === 'P' ? 'Perempuan' : ''
                                                } 
                                                disabled 
                                            />
                                        </div>
                                        <div>
                                            <label>Alamat</label>
                                            <input type="text" className="form-control" defaultValue={detail.address ? detail.address : ''} disabled />
                                        </div>
                                        <div>
                                            <label>Nomor Handphone</label>
                                            <input type="text" className="form-control" defaultValue={detail.phone ? detail.phone : ''} required {...register('phone')} />
                                        </div>
                                        <div>
                                            <label>Username</label>
                                            <input type="text" className="form-control" defaultValue={detail.username ? detail.username : ''} {...register('username')} required />
                                        </div>
                                        <div>
                                            <label>Password</label>
                                            <input type="text" className="form-control" placeholder="********" {...register('password')} />
                                        </div>
                                        <div>
                                            <label>Update Foto</label>
                                            <input type="file" className="form-control px-3 py-1" accept="image/png,imgae/jpg,image/jpeg" {...register('photo')} />
                                        </div>
                                        <div>
                                            <label>Update Dokumen</label>
                                            <input type="file" className="form-control px-3 py-1" accept="image/png,imgae/jpg,image/jpeg"  {...register('docs')} />
                                        </div>
                                    </GridCols2>
                                </div>
                                <div className="flex justify-end">
                                    <ButtonSuccess name={'Update Data'} />
                                </div>     
                            </form>                               
                        </div>
                    </div>
                </div>
                
                {/* Koordinator */}
                <Korcam />
                <Kordes />
                <Korwe />

            </div>
        </Layouts>
    )
}

export default TimsesDataDetail
