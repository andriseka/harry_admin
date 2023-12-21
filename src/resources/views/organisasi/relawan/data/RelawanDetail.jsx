import React, { useEffect, useState } from 'react';
import Layouts from '../../../layouts/Layouts';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailRelawan, updateDataRelawan } from '../../../../../app/model/relawan/relawanSlice';
import ButtonSuccess from '../../../../components/button/ButtonSuccess';
import FormTitle from '../../../../components/title/FormTitle';
import GridCols2 from '../../../../components/grid/GridCols2';
import { useForm } from 'react-hook-form';
import Kordes from '../organisasi/Kordes';
import Korwe from '../organisasi/Korwe';
import KonstituenByRelawan from '../organisasi/KonstituenByRelawan';
import { imageResizer } from '../../../../../utils/imageResizer';
import Loading from '../../../../components/loading/Loading';
import { Camera, CameraResultType } from '@capacitor/camera';
import { b64toBlob } from '../../../../components/b64toblob/b64toblob';
import toast, { Toaster } from 'react-hot-toast';

const RelawanDetail = () => {
    const dispatch = useDispatch();
    const [detail, setDetail] = useState([]);
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit} = useForm();

    const {username, relawan_username_detail } = useParams();
    const navigate = useNavigate();
    
    // get data
    const getDataDetail = async(relawan_username) => {
        try {
            const response = await dispatch(getDetailRelawan(relawan_username)).unwrap().catch((err) => {});
            if (response.status === 404) {
                toast.error('Data tidak ditemukan');
                setTimeout(() => {
                   window.location.href = `/${username}/organisasi/relawan/data` 
                }, 1000);
            }

            if (response.status === 200) {
                setDetail(response.data);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetail(relawan_username_detail);
    }, []);

    const handleBack = () => {
        return window.location.href = `/${username}/organisasi/relawan/data`
    }

    const onUpdate = async(data) => {
        setLoading(true);
        if (data.docs.length > 0) {
            data.docs = await imageResizer(data.docs[0], 780, 400).catch((err) => {});
        } else {
            data.docs = ''
        }

        if (data.username_update === '') {
            data.username_update = relawan_username_detail
        } else {
            data.username_update = data.username_update;
        }

        data = {
            ...data,
            username: relawan_username_detail,
            username_update: data.username_update
        }

        try {
            const response = await dispatch(updateDataRelawan(data)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 200) {
                    return window.location.href = `/${username}/organisasi/relawan/data/${data.username_update}`
                }
            }
        } catch (error) {
            
        }
    }

    // update picture
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
                username: relawan_username_detail,
                username_update : relawan_username_detail
            }
            const response = await dispatch(updateDataRelawan(data)).unwrap().catch((err) => {});
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
            <Toaster position="top-right" />
            { loading ? <Loading /> : '' }
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
                                    <img src={ picture.length > 0 ? picture : detail.photo } alt="" className="w-64 h-64 rounded-full mb-3" />
                                    <div className="flex justify-end mb-3">
                                        <span onClick={takePicture} className="cursor-pointer px-3 py-1 bg-orange-500 rounded-full text-white text-xs">Update Foto</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-lg font-bold text-gray-600"> { detail.name ? detail.name : '' } </span> <br />
                                        <span className="text-base text-gray-600"> 
                                            { 
                                                detail.jabatan === 'korcam' ? 'Koordinator Kecamatan' :  
                                                detail.jabatan === 'kordes' ? 'Koordinator Desa' :  
                                                detail.jabatan === 'korwe' ? 'Koordinator RW' :  
                                                detail.jabatan === 'anggota' ? 'Anggota' :  ''
                                            }
                                        </span>   &nbsp;
                                        <span className="text-base text-gray-600">
                                            ( Relawan )
                                        </span>
                                        <br /> <br />
                                        <a href={`https://wa.me/${detail.phone ? detail.phone : ''}`} target="_blank" className="bg-green-500 hover:bg-green-600 text-white hover:text-white rounded-full px-3 py-2">
                                            { detail.phone ? detail.phone : '' }
                                        </a>
                                        <div className="mt-5 mb-3">
                                            { `${detail.desa}, RT 0${detail.rt} / 0${detail.rw}, ${detail.kecamatan}` }
                                        </div>
                                        <div>
                                            <span>Target Konstituen : { detail.target ? detail.target : '' }</span>
                                        </div>
                                        <div className="mb-3">
                                            <span>Total Konstituen : { detail.total ? detail.total : '' }</span>
                                        </div>
                                        <div>
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
                                            <input type="text" className="form-control" defaultValue={detail.name ? `${detail.name} ( ${detail.usia} Tahun )` : ''} disabled />
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
                                            <label>Posisi</label>
                                            <input type="text" className="form-control" 
                                                defaultValue={'Relawan'} 
                                                disabled 
                                            />
                                        </div>
                                        <div>
                                            <label>Jabatan</label>
                                            <input type="text" className="form-control" 
                                                defaultValue={
                                                    detail.jabatan === 'korcam' ? 'Koordinator Kecamatan' :  
                                                    detail.jabatan === 'kordes' ? 'Koordinator Desa' :  
                                                    detail.jabatan === 'korwe' ? 'Koordinator RW' :  
                                                    detail.jabatan === 'anggota' ? 'Anggota' :  ''
                                                } 
                                                disabled 
                                            />
                                        </div>
                                        <div>
                                            <label>Alamat</label>
                                            <input type="text" className="form-control" 
                                                defaultValue={
                                                    detail.name ?
                                                    `${detail.desa}, RT 0${detail.rt} / 0${detail.rw}, ${detail.kecamatan}`
                                                    : ''
                                                } 
                                                disabled 
                                            />
                                        </div>
                                        <div>
                                            <label>Nomor Handphone</label>
                                            <input type="text" className="form-control" defaultValue={detail.phone ? detail.phone : ''} disabled />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label>Update Dokumen</label>
                                            <input type="file" className="form-control px-3 py-1" accept="image/png,imgae/jpg,image/jpeg"  {...register('docs')} />
                                        </div>
                                        <div>
                                            <label>Username</label>
                                            <input type="text" className="form-control" placeholder="Tulis Username" {...register('username_update')} defaultValue={detail.username ? detail.username : ''} required />
                                        </div>
                                        <div>
                                            <label>Password</label>
                                            <input type="text" className="form-control" placeholder="********" {...register('password')}  />
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
                
                {
                    detail.jabatan === 'korcam' ? 
                    <div>
                        <Kordes /> 
                        <Korwe />
                    </div> : 
                    detail.jabatan === 'kordes' ? 
                    <div>
                        <Korwe />
                    </div> : ''
                }

                {/* konstituen */}
                <div>
                    <KonstituenByRelawan relawan_username={relawan_username_detail} />
                </div>
            </div>
        </Layouts>
    )
}

export default RelawanDetail
