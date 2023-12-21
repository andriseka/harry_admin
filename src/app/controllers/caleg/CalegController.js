import React, { useRef, useState } from 'react'
import CalegForm from '../../../resources/views/caleg/form/CalegForm'
import CalegData from '../../../resources/views/caleg/data/CalegData'
import { useDispatch, useSelector } from 'react-redux';
import { getKabupaten } from '../../model/wilayah/kabupatenSlice';
import { postCaleg, updateCaleg } from '../../model/caleg/calegSlice';
import { imageResizer } from '../../../utils/imageResizer';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function CalegController({ view }) {
    const dispatch = useDispatch();
    const refKabupaten = useRef(false);
    const [select, setSelect] = useState({
        provinsi: '',
        provinsi_id: '',
        kabupaten: '',
        kabupaten_id: ''
    })

    const caleg = JSON.parse(localStorage.getItem('caleg'));
    const provinsi = JSON.parse(localStorage.getItem('provinsi'));
    const kabupaten = useSelector(state => state.kabupaten.kabupaten);
    const { loading, message } = useSelector(state => state.caleg);

    // params
    const { username } = useParams();

    // handle action
    const handleProvinsi = async(e) => {
        if (e) {
            setSelect({
                ...select,
                provinsi: e.label,
                provinsi_id: e.value
            })
            refKabupaten.current.clearValue();
            try {
                await dispatch(getKabupaten(e.value)).unwrap();
            } catch (error) {
                
            }
        }
    }

    const handleKabupaten = (e) => {
        if (e) {
            setSelect({
                ...select,
                kabupaten: e.label,
                kabupaten_id: e.value
            })
        }
    }

    // submit
    const onSubmit = async(data) => {
        if (data.photo.length > 0) {
            data.photo = await imageResizer(data.photo[0], 240, 240).catch((err) => {});
        } else {
            data.photo = ''
        }

        if (data.banner.length > 0) {
            data.banner = await imageResizer(data.banner[0], 978, 258).catch((err) => {});
        } else {
            data.banner = ''
        }

        data = {
            ...data,
            ...select
        }
        try {
            const response = await dispatch(postCaleg(data)).unwrap();
            if (response.status === 400) {
                toast.error('Periksa kembali inputan Anda');
            }
            if (response.status === 201) {
                return window.location.href = `/${username}/caleg/data`
            }
           
        } catch (error) {
            
        }
    }

    // update data
    const onUpdateProfile = async(data) => {
        if (data.new_photo.length > 0) {
            data.new_photo = await imageResizer(data.new_photo[0], 240, 240).catch((err) => {});
        } else {
            data.new_photo = ''
        }

        if (data.new_banner.length > 0) {
            data.new_banner = await imageResizer(data.new_banner[0], 978, 258).catch((err) => {});
        } else {
            data.new_banner = ''
        }

        data = {
            ...data,
            photo: data.new_photo,
            banner: data.new_banner
        }
        try {
            const response = await dispatch(updateCaleg(data)).unwrap();
            if (response.status === 400) {
                toast.error('Periksa kembali inputan Anda');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            if (response.status === 200) {
                toast.success('Profile berhasil diperbaharui');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            
        }
    }

    if (view === 'form') {
        return (
            <CalegForm 
                refKabupaten={refKabupaten}
                provinsi={provinsi}
                kabupaten={kabupaten}
                handleProvinsi={handleProvinsi}
                handleKabupaten={handleKabupaten}
                onSubmit={onSubmit}
                loading={loading}
                message={message}
            />
        )
    } else if (view === 'data') {
        return (
            <CalegData 
                caleg={caleg}
                onUpdateProfile={onUpdateProfile}
                message={message}
                loading={loading}
            />
        )
    }
}

export default CalegController
