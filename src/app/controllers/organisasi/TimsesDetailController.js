import React, { useEffect, useState } from 'react'
import TimsesDataDetail from '../../../resources/views/organisasi/timses/data/TimsesDataDetail'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTimsesDetail } from '../../model/timses/timsesSlice';
import toast from 'react-hot-toast';

const TimsesDetailController = () => {
    const dispatch = useDispatch();
    const { username, timses } = useParams();

    const [detail, setDetail] = useState([]);

     // get data detail
     const getDataTimsesDetail = async() => {
        try {
            const response = await dispatch(getTimsesDetail(timses)).unwrap().catch((err) => {});
            if (response.status === 404) {
                toast.error('Data tidak ditemukan');
                setTimeout(() => {
                   window.location.href = `/${username}/organisasi/timses/data` 
                }, 1200);
            }

            if (response.status === 200) {
                setDetail(response.data);
            }
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataTimsesDetail();
    }, []);

    return (
        <TimsesDataDetail 
            detail={detail}
        />
    )
}

export default TimsesDetailController
