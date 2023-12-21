import React, { useEffect, useState } from 'react'
import Layouts from '../../../layouts/Layouts'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDetailKonstituen, updateKonstituen } from '../../../../../app/model/konstituen/konstituenSlice'
import { useForm } from 'react-hook-form'
import FormTitle from '../../../../components/title/FormTitle'
import GridCols2 from '../../../../components/grid/GridCols2'
import ButtonSuccess from '../../../../components/button/ButtonSuccess'
import { Camera, CameraResultType } from '@capacitor/camera'
import { Button } from '@mui/material'
import Loading from '../../../../components/loading/Loading'
import toast, { Toaster } from 'react-hot-toast'

import { b64toBlob } from '../../../../components/b64toblob/b64toblob'
import { imageResizer } from '../../../../../utils/imageResizer'


const KonstituenDataDetail = () => {
    const dispatch = useDispatch();
    const { username, code_konstituen } = useParams();
    const [loading, setLoading] = useState(false);

    const[detail, setDetail] = useState([]);

    const getDataDetailKonstitue = async() => {
        try {
            const response = await dispatch(getDetailKonstituen(code_konstituen)).unwrap().catch((err) => {});
            if (response.status === 404) {
                toast.error('Data tidak ditemukan');
                setTimeout(() => {
                   window.location.href = `/${username}/organisasi/konstituen/data` 
                }, 1000);
            }   

            if (response.status === 200) {
                setDetail(response.data)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetailKonstitue();
    }, []);

    const {register, handleSubmit} = useForm();

    const onUpdate = async(data) => {
        setLoading(true);
        data = {
            phone: data.phone,
            id: detail.id
        }

        try {
            const response = await dispatch(updateKonstituen(data)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 200) {
                    window.location.reload();
                }

                if (response.status === 400) {
                    toast.error('Periksa kembali telephone Anda');
                }
            }
        } catch (error) {
            
        }
    }

    const back = () => {
        return window.location.href = `/${username}/organisasi/konstituen/data`
    }

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
                image: resize,
                id: detail.id
            }
            const response = await dispatch(updateKonstituen(data)).unwrap().catch((err) => {});
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
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h1 className="text-lg font-bold text-gray-600">{ detail.name ? detail.name : '' } </h1>
                </div>
                <div>
                    <span className="text-orange-500 cursor-pointer" onClick={back}>Kembali</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                    <div className="card">
                        <div className="card-body">
                            <div className="flex justify-center mb-3">
                                <div>
                                    <img src={ picture.length > 0 ? picture : detail.image } alt="" className="w-64 h-64 mb-3 rounded-full" />
                                    <div className="flex justify-end mb-3">
                                        <span onClick={takePicture} className="cursor-pointer px-3 py-1 bg-orange-500 rounded-full text-white text-xs">Update Foto</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-lg font-bold text-gray-600"> { detail.name ? detail.name : '' } </span> <br />
                                        <span className="text-base text-gray-600">
                                            Konstituen
                                        </span> &nbsp; <br /> <br />
                                        <a href={`https://wa.me/${detail.phone ? detail.phone : ''}`} target="_blank" className="bg-green-500 hover:bg-green-600 text-white hover:text-white rounded-full px-3 py-2">
                                            { detail.phone ? detail.phone : '' }
                                        </a>
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
                                        <input type="text" className="form-control" placeholder={detail.name ? detail.name : ''} disabled />
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
                                        <label>Usia</label>
                                        <input type="text" className="form-control" placeholder={detail.usia ? detail.usia + ' Tahun' : ''} disabled />
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
                                        <label>RT</label>
                                        <input type="text" className="form-control" placeholder={detail.rt ? detail.rt : ''} disabled />
                                    </div>
                                    <div>
                                        <label>RW</label>
                                        <input type="text" className="form-control" placeholder={detail.rw ? detail.rw  : ''} disabled />
                                    </div>
                                    <div>
                                        <label>TPS</label>
                                        <input type="text" className="form-control" placeholder={detail.tps ? detail.tps  : ''} disabled />
                                    </div>
                                    <div>
                                        <label>Nomor Handphone</label>
                                        <input type="text" className="form-control" placeholder={detail.phone ? detail.phone : 'Kosong'} {...register('phone')} />
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
        </Layouts>
    )
}

export default KonstituenDataDetail
