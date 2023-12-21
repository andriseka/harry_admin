import React, { useEffect, useRef, useState } from 'react'
import ServiceData from '../../../resources/views/services/data/ServiceData'
import ServiceForm from '../../../resources/views/services/form/ServiceForm'
import { useDispatch } from 'react-redux'
import { getDapil } from '../../model/dapil/dapilSlice';
import { getDesa } from '../../model/wilayah/desaSlice';
import { getDptFilterBantuan } from '../../model/dpt/dptSlice';
import toast from 'react-hot-toast';
import ServiceDataDetail from '../../../resources/views/services/data/ServiceDataDetail';

function ServiceController({ view }) {
    const dispatch = useDispatch();

    // array data
    const [dapil, setDapil] = useState([]);
    const [desa, setDesa] = useState([]);
    const [dpt, setDpt] = useState([]);
    const [pagination, setPagination] = useState([]);

    // select for filter
    const [select, setSelect] = useState({
        kecamatan_id: '',
        desa_id: '',
        name: ''
    })

    // ref
    const refDesa = useRef(false);

    // get data
    const getDataDapil = async() => {
        try {
            const response = await dispatch(getDapil()).unwrap().catch((err) => {});
            setDapil(response.map((i) => ({ value: i.kecamatan_id, label: i.kecamatan })));
        } catch (error) {
            
        }
    }

    const getDataDesa = async(kecamatan_id) => {
        try {
            const response = await dispatch(getDesa(kecamatan_id)).unwrap().catch((err) => {});
            setDesa(response.map((i) => ({ value: i.id, label: i.name })))
        } catch (error) {
            
        }
    }

    const getDataFilterDpt = async(data) => {
        try {
            const response = await dispatch(getDptFilterBantuan(data)).unwrap().catch((err) => {});
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
            setSelect({
                kecamatan_id: e.value,
                desa_id: '',
                name: ''
            })
            return getDataDesa(e.value);
        }
    }

    const handleDesa = (e) => {
        if (e) {
            setSelect({
                ...select,
                desa_id: e.value
            })
        }
    }

    const handleName = (e) => {
        if (e) {
            setSelect({
                ...select,
                name: e.target.value
            })
        }
    }

    const handleSearch = async() => {
        const data = {
            code: select.kecamatan_id + '.' + select.desa_id,
            name: select.name,
            page: 1
        }
        return getDataFilterDpt(data);
    }

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama');
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terakhir')
        } else {
            const data = {
                code: select.kecamatan_id + '.' + select.desa_id,
                name: select.name,
                page: page  
            }
            return getDataFilterDpt(data);
        }
    }

    if (view === 'data') {
        return(
            <ServiceData />
        )
    } else if(view === 'form') {
        return (
            <ServiceForm 
                refDesa={refDesa}
                dapil={dapil}
                desa={desa}
                dpt={dpt}
                pagination={pagination}
                handleDapil={handleDapil}
                handleDesa={handleDesa}
                handleName={handleName}
                handleSearch={handleSearch}
                handlePagination={handlePagination}
            />
        )
    } else if(view === 'detail') {
        return (
            <ServiceDataDetail />
        )
    }
}

export default ServiceController
