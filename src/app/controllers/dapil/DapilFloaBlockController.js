import React, { useEffect } from 'react'
import DapilFloatingBlock from '../../../resources/views/dapil/floating/DapilFloatingBlock'
import { useDispatch, useSelector } from 'react-redux'
import { getFb } from '../../model/dapil/floatingBlockSlice';
import toast from 'react-hot-toast';

function DapilFloaBlockController() {
    const dispatch = useDispatch();

    const { fb, pagination } = useSelector(state => state.fb);

    // get data
    const getDataFb = async(page) => {
        try {
            await dispatch(getFb(page)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataFb(1);
    }, []);

    // handle
    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda sudah di halaman pertama', {icon: '🙏'})
        } else if (page === pagination.last_page + 1) {
            toast('Anda sudah di halaman terkahir', {icon: '🙏'})
        } else {
            return getDataFb(page);
        }
    }

    return (
        <DapilFloatingBlock 
            fb={fb}
            pagination={pagination}
            handlePagination={handlePagination}
        />
    )
}

export default DapilFloaBlockController
