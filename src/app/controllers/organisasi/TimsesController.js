import React, { useEffect, useState } from 'react'
import TimsesForm from '../../../resources/views/organisasi/timses/form/TimsesForm'
import TimsesData from '../../../resources/views/organisasi/timses/data/TimsesData'
import { useDispatch, useSelector } from 'react-redux'
import { imageResizer } from '../../../utils/imageResizer';
import { getTimses, postTimses } from '../../model/timses/timsesSlice';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import TimsesDataDetail from '../../../resources/views/organisasi/timses/data/TimsesDataDetail';

function TimsesController({ view }) {
    const dispatch = useDispatch();

    const { timses, pagination } = useSelector(state => state.timses);

    const { username } = useParams();

    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);

    // get data
    const getDataTimses = async(page) => {
        try {
            await dispatch(getTimses(page)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataTimses(1);
    }, []);

    const onSubmit = async(data) => {
        setLoading(true);
        if (data.photo.length > 0) {
            data.photo = await imageResizer(data.photo[0], 256, 256).catch((err) => {});
        } else {
            data.photo = '';
        }

        if (data.docs.length > 0) {
            data.docs = await imageResizer(data.docs[0], 400, 780).catch((err) => {});
        } else {
            data.docs = '';
        }

        try {
            const response = await dispatch(postTimses(data)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 400) {
                    toast.error('Periksa kembali data Anda');
                    setError(response.message);
                }
                if (response.status === 201) {
                    return window.location.href = `/${username}/organisasi/timses/data`;
                }
            }
        } catch (error) {
            setLoading(false);
        }
    }

    // timses data
    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berapa di halaman pertama', {icon: '🙏'});
        } else if (page === pagination.last_page + 1) {
            toast('Anda berapa di halaman terakhir', {icon: '🙏'});
        } else {
            return getDataTimses(page);
        }
    }

    if (view === 'form') {
        return (
            <TimsesForm 
                onSubmit={onSubmit}
                loading={loading}
                error={error}
            />
        )
    } else if (view === 'data') {
        return (
            <TimsesData 
                timses={timses}
                pagination={pagination}
                handlePagination={handlePagination}
            />
        )
    }
}

export default TimsesController
