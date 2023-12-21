import React, { useEffect } from 'react'
import Auth from '../../../resources/views/auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { postLogin } from '../../model/auth/authSlice';
import { getProvinsi } from '../../model/wilayah/provinsiSlice';
import { getCaleg } from '../../model/caleg/calegSlice';
import { getSlider } from '../../model/slider/sliderSlice';

function AuthController() {
    const dispatch = useDispatch();

    // response data
    const {loading, error} = useSelector(state => state.auth);
    const slider = useSelector(state => state.slider.slider);

    const getDataSlider = async() => {
        try {
            await dispatch(getSlider()).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    // handle submit
    const onSubmit = async(data) => {
        try {
            const response = await dispatch(postLogin(data)).unwrap();    
            if (response.status === 200) {
                if (response.data.posisi === 'admin') {
                    await dispatch(getProvinsi()).unwrap();
                    await dispatch(getCaleg()).unwrap();
                    return window.location.href = `/${response.data.username}`;
                }
            }
        } catch (error) {
            if (error.status === 400) {
                toast.error('Periksa kembali username dan password Anda')
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        }
    }

    useEffect(() => {
        getDataSlider();
    }, []);

    return (
        <Auth 
            slider={slider}
            onSubmit={onSubmit}
            loading={loading}
            error={error}
        />
    )
}

export default AuthController
