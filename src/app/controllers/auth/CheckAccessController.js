import React, { useEffect } from 'react'
import Loading from '../../../resources/components/loading/Loading'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { checkLogin } from '../../model/auth/authSlice';
import { getProvinsi } from '../../model/wilayah/provinsiSlice';
import { getCaleg } from '../../model/caleg/calegSlice';

function CheckAccessController() {
    const dispatch = useDispatch();

    const { username } = useParams();

    const checkAccess = async() => {
        try {
            const response = await dispatch(checkLogin(username)).unwrap();
            if (response.status === 200) {
                toast.success('Login berhasil');
                if (response.data.jabatan === 'admin' && response.data.posisi === 'admin') {
                    await dispatch(getProvinsi()).unwrap();
                    await dispatch(getCaleg()).unwrap();
                    setTimeout(() => {
                        return window.location.href = `/${response.data.username}/home/program` 
                    }, 1000);
                }
            } else {
                toast.error('Periksa kembali data login Anda');
                setTimeout(() => {
                    return window.location.href = '/'; 
                }, 1000);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        checkAccess(); 
    }, []);

    return (
        <div>
            <Toaster position="top-right" />
            <Loading />
        </div> 
    )
}

export default CheckAccessController
