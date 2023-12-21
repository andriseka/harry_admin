import React, { useEffect, useRef, useState } from 'react'
import RelawanData from '../../../resources/views/organisasi/relawan/data/RelawanData'
import RelawanForm from '../../../resources/views/organisasi/relawan/form/RelawanForm'
import { useDispatch, useSelector } from 'react-redux'
import { getDapil } from '../../model/dapil/dapilSlice';
import { getDesa } from '../../model/wilayah/desaSlice';
import toast from 'react-hot-toast';
import { getDptByStatus } from '../../model/dpt/dptSlice';
import RelawanFormDetail from '../../../resources/views/organisasi/relawan/form/detail/RelawanFormDetail';
import RelawanDetail from '../../../resources/views/organisasi/relawan/data/RelawanDetail';

function RelawanController({ view }) {
    const dispatch = useDispatch();
    const refDesa = useRef(false);

    const [formData, setFormData] = useState({
        kecamatan_id: '', desa_id: '', name: ''
    })

    const dapil = useSelector(state => state.dapil.dapil);
    const desa = useSelector(state => state.desa.desa);
    const [dpt, setDpt] = useState([]);
    const [pagination, setPagination] = useState([]);

    // get data
    const getDataDapil = async() => {
        try {
            await dispatch(getDapil()).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    const getDataDesa = async(kec_id) => {
        try {
            await dispatch(getDesa(kec_id)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    const getDataDptByStatus = async(data) => {
        try {
            const response = await dispatch(getDptByStatus(data)).unwrap().catch((err) => {});
            setDpt(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }      
    }

    useEffect(() => {
        getDataDapil();
    }, []);

    // handle
    const handleDapil = (e) => {
        if (e) {
            refDesa.current.clearValue();
            setFormData({
                kecamatan_id: e.value,
                desa_id: '',
                name: ''
            })
            getDataDesa(e.value)
        }
    }

    const handleDesa = (e) => {
        if (e) {
            setFormData({
                ...formData,
                desa_id: e.value,
            })
        }
    }

    const handleName = (e) => {
        setFormData({
            ...formData,
            name: e.target.value
        })
    }

    const handleSearch = () => {
        const code = formData.kecamatan_id + '.' + formData.desa_id;
        const data = {
            code: code,
            name: formData.name,
            page: 1
        }
        return getDataDptByStatus(data);
    }

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama', {icon: '🙏'});
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terkahir', {icon: '🙏'});
        } else {
            const code = formData.kecamatan_id + '.' + formData.desa_id;
            const data = {
                code: code,
                name: formData.name,
                page: page
            }
            return getDataDptByStatus(data);
        }
    }

    if (view === 'form') {
        return (
            <RelawanForm 
                dapil={dapil}
                desa={desa}
                dpt={dpt}
                pagination={pagination}
                handleDapil ={handleDapil}
                handleDesa={handleDesa}
                handleName={handleName}
                handleSearch={handleSearch}
                handlePagination={handlePagination}
                refDesa={refDesa}
            />
        )
    } else if (view === 'form-detail') {
        return (
            <RelawanFormDetail />
        )
    } else if (view === 'data') {
        return (
            <RelawanData />
        )
    } else if (view === 'detail') {
        return (
            <RelawanDetail />
        )
    }
}

export default RelawanController
