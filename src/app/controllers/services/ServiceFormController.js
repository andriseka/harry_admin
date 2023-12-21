import React, { useEffect, useState } from 'react'
import ServiceFormAdd from '../../../resources/views/services/form/add/ServiceFormAdd'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getDptDetail } from '../../model/dpt/dptSlice';
import { Camera, CameraResultType } from '@capacitor/camera';

import { b64toBlob } from '../../../resources/components/b64toblob/b64toblob'
import { imageResizer } from '../../../utils/imageResizer'
import { storeService } from '../../model/service/serviceSlice';
import toast from 'react-hot-toast';


function ServiceFormController() {
    const dispatch = useDispatch();

    // param
    const { username, dpt_id } = useParams();

    // array data
    const [detail, setDetail] = useState([]);
    const [videoPreview, setVideoPreview] = useState('');
    const [picture, setPicture] = useState({
        ktp: '',
        kk: '',
        pm: '',
        photo: ''
    })
    const [upload, setUpload] = useState({
        ktp: '',
        kk: '',
        pm: '',
        photo: '',
    })

    const [loading, setLoading] = useState(false);

    // get data
    const getDataDetailDpt = async() => {
        try {
            const response = await dispatch(getDptDetail(dpt_id)).unwrap().catch((err) => {});
            setDetail(response.data);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetailDpt();
    }, []);

    // handle gambar / video
    const handleKtp = async() => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64
            });
            let imageUrl = image.base64String;
            
            let blob = b64toBlob(imageUrl, 'image/png');
            let file = new File([blob], 'ktp.png', {
                type: blob.type,
                lastModified: new Date().getTime()
            })

            const resize = await imageResizer(file, 400, 200);

            setUpload({
                ...upload,
                ktp: resize
            })

            setPicture({
                ...picture,
                ktp: 'data:image/png;base64,' + imageUrl,
            });
        } catch (error) {
            
        }
    }

    const handleKK = async() => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64
            });
            var imageUrl = image.base64String;

            let blob = b64toBlob(imageUrl, 'image/png');
            let file = new File([blob], 'ktp.png', {
                type: blob.type,
                lastModified: new Date().getTime()
            })

            const resize = await imageResizer(file, 400, 200);

            setUpload({
                ...upload,
                kk: resize
            })

            setPicture({
                ...picture,
                kk: 'data:image/png;base64,' + imageUrl,
            });
        } catch (error) {
            
        }
    }

    const handlePM = async() => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64
            });
            var imageUrl = image.base64String;

            let blob = b64toBlob(imageUrl, 'image/png');
            let file = new File([blob], 'ktp.png', {
                type: blob.type,
                lastModified: new Date().getTime()
            })

            const resize = await imageResizer(file, 400, 200);

            setUpload({
                ...upload,
                pm: resize
            })

            setPicture({
                ...picture,
                pm: 'data:image/png;base64,' + imageUrl,
            });
        } catch (error) {
            
        }
    }

    const handlePhoto = async() => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64
            });
            var imageUrl = image.base64String;

            let blob = b64toBlob(imageUrl, 'image/png');
            let file = new File([blob], 'photo.png', {
                type: blob.type,
                lastModified: new Date().getTime()
            })

            const resize = await imageResizer(file, 400, 200);

            setUpload({
                ...upload,
                photo: resize
            })

            setPicture({
                ...picture,
                photo: 'data:image/png;base64,' + imageUrl,
            });
        } catch (error) {
            
        }
    }

    let video = document.getElementById("video");  
    const handleVideo = () => {  
        video.click()

        video.addEventListener("change", function(e) {
            let video = e.target.files[0]
            if (video.type !== 'video/mp4') {
                alert('Silahkan gunakan video dengan format .mp4')
            } else {
                let videoSrc = URL.createObjectURL(video);
                setVideoPreview(videoSrc)
            }
        })
    }

    const onSubmit = async(data) => {
        setLoading(true);
        toast('Mohon bersabar. Tunggu beberapa detik untuk proses upload file');

        const video = data.video[0];
        data = {
            ...upload,
            video: video,
            dpt_id: dpt_id
        }

        try {
            const response = await dispatch(storeService(data)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 400) {
                    toast.error('Periksa kembali file Anda');
                    setTimeout(() => {
                       return window.location.reload(); 
                    }, 1000);
                }

                if (response.status === 201) {
                    toast.success('Data berhasil disimpan');
                    setTimeout(() => {
                        return window.location.href = `/${username}/service/data` 
                    }, 1000);
                }
            }
        } catch (error) {
            
        }
       
    }

    const handleBack = () => {
        return window.location.href = `/${username}/service/form`
    }

    return (
        <ServiceFormAdd 
            detail={detail}
            picture={picture}
            handleKtp={handleKtp}
            handleKK={handleKK}
            handlePM={handlePM}
            handleVideo={handleVideo}
            handlePhoto={handlePhoto}
            videoPreview={videoPreview}
            handleBack={handleBack}
            onSubmit={onSubmit}
            loading={loading}
        />
    )
}

export default ServiceFormController
