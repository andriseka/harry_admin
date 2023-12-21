import React, { useEffect } from 'react'
import KonstituenForm from '../../../resources/views/organisasi/konstituen/form/KonstituenForm'
import KonstituenData from '../../../resources/views/organisasi/konstituen/data/KonstituenData'
import { useDispatch, useSelector } from 'react-redux'
import { getKonstituen } from '../../model/konstituen/konstituenSlice';
import toast from 'react-hot-toast';

function KonstituenController({ view }) {
    const dispatch = useDispatch();
    const { konstituen, pagination } = useSelector(state => state.konstituen);

    // get data
    const getDataKonstituen = async(page) => {
        try {
            await dispatch(getKonstituen(page)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataKonstituen(1);
    }, []);

    // pagination
    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berapa di halaman pertama', {icon: '🙏'});
        } else if(page === pagination.last_page + 1) {
            toast('Anda berapa di halaman terkahir', {icon: '🙏'});
        } else {
            return getDataKonstituen(page);
        }
    }

    if (view === 'form') {
        return (
            <KonstituenForm />
        )
    } else if (view === 'data') {
        return (
            <KonstituenData 
                konstituen={konstituen}
                pagination={pagination}
                handlePagination={handlePagination}
            />
        )
    }
}

export default KonstituenController
