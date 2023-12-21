import React, { useEffect, useRef, useState } from 'react'
import DptForm from '../../../resources/views/dpt/form/DptForm'
import DptData from '../../../resources/views/dpt/data/DptData'
import { useDispatch, useSelector } from 'react-redux'
import { getDapil } from '../../model/dapil/dapilSlice';
import { getDesa } from '../../model/wilayah/desaSlice';
import { getTpsByCode } from '../../model/tps/tpsSlice';
import { getDpt, getDptFilter, getDptSearchName, postDpt } from '../../model/dpt/dptSlice';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function DptController({ view }) {
    const dispatch = useDispatch();
    const refDapil = useRef(false);
    const refDesa = useRef(false);
    const refTps = useRef(false);

    const  [selectForm, setSelectForm ] = useState({
        kecamatan_id: '', kecamatan :'', desa_id: '', desa: '', tps_id: '', tps: ''
    })
    const [filter, setFilter] = useState(false);
    const [search, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const { username } = useParams();


    const dapil = useSelector(state => state.dapil.dapil);
    const desa = useSelector(state => state.desa.desa);
    const tps = useSelector(state => state.tps.tps);
    const { dpt, pagination } = useSelector(state => state.dpt);

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

    const getDataTpsByCode = async(code) => {
        try {
            await dispatch(getTpsByCode(code)).unwrap().catch((err) => {})
        } catch (error) {
            
        }
    }

    const getDataDpt = async(page) => {
        try {
            await dispatch(getDpt(page)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }
    
    const getDataDptFilter = async(data) => {
        try {
            await dispatch(getDptFilter(data)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    const getDataDptSearchName = async(data) => {
        try {
            await dispatch(getDptSearchName(data)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDapil();
        getDataDpt(1);
    }, []);

    // handle
    const handleDapil = (e) => {
        if (e) {
            refDesa.current.clearValue();
            refTps.current.clearValue();
            setSelectForm({
                kecamatan: e.label,
                kecamatan_id: e.value,
                desa: '',
                desa_id: '',
                tps: '',
                tps_id: ''
            })
            getDataDesa(e.value)
        }
    }   

    const handleDesa = (e) => {
        if (e) {
            refTps.current.clearValue();
            const code = selectForm.kecamatan_id + '.' + e.value;

            getDataTpsByCode(code)
            setSelectForm({
                ...selectForm,
                desa: e.label,
                desa_id: e.value,
                tps: '',
                tps_id: ''
            })
        }
    }

    const handleTps = (e) => {
        if (e) {
            setSelectForm({
                ...selectForm,
                tps: e.label,
                tps_id: e.value
            })
        }
    }
    
    // submit
    const onSubmit = async(data) => {
        try {
            setLoading(true);
            data = {
                ...data,
                ...selectForm
            }
            const response =  await dispatch(postDpt(data)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 400) {
                    toast.error('Silahkan cek kembali data Anda');
                }
                if (response.status === 201) {
                    return window.location.href = `/${username}/dpt/data`;
                }
            }
        } catch (error) {

        }
    }

    // data dpt
    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama', {icon: '🙏'});
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terkahir', {icon: '🙏'});
        } else {
            return getDataDpt(page);
        }
    }

    const handleName = (e) => {
        setSelectForm({
            ...selectForm,
            name: e.target.value
        })
    }

    const handleFilter = () => {
        if (selectForm.kecamatan_id !== '') {     
            setFilter(true)
            if (selectForm.tps_id === '') {
                selectForm.tps_id = ''
            } else {
                selectForm.tps_id = '.'+selectForm.tps_id;
            }
            const code = selectForm.kecamatan_id + '.' + selectForm.desa_id + selectForm.tps_id;
            const data = {
                code: code,
                name: selectForm.name,
                page: 1
            }
            return getDataDptFilter(data);
        } else if (selectForm.kecamatan_id === '' && selectForm.name !== null) {
            setFilter(true)
            setSearch(true);
            const data = {
                name: selectForm.name,
                page: 1
            }
            return getDataDptSearchName(data);
        }
        else {
            toast('Silahkan ini option terlebih dahulu', {icon: '🙏'})
        }
    }

    const handleUnlock = () => {
        refDapil.current.clearValue();
        refDesa.current.clearValue();
        refTps.current.clearValue();
        setSelectForm({
            kecamatan_id: '', kecamatan :'', desa_id: '', desa: '', tps_id: '', tps: '', name: selectForm.name
        });
        setFilter(false);
        setSearch(false);

        return getDataDpt(1);
    }

    const handlePaginationFilter = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama', {icon: '🙏'});
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terkahir', {icon: '🙏'});
        } else {
            const code = selectForm.kecamatan_id + '.' + selectForm.desa_id + selectForm.tps_id;
            const data = {
                code: code,
                name: selectForm.name,
                page: page
            }
            return getDataDptFilter(data);
        }
    }

    const handlePaginationSearch = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama', {icon: '🙏'});
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terkahir', {icon: '🙏'});
        } else {
            const data = {
                name: selectForm.name,
                page: page
            }
            return getDataDptSearchName(data);
        }
    }


    if (view === 'form') {
        return (
            <DptForm 
                refDesa={refDesa}
                refTps={refTps}
                dapil={dapil}
                desa={desa}
                tps={tps}
                handleDapil={handleDapil}
                handleDesa={handleDesa}
                handleTps={handleTps}
                onSubmit={onSubmit}
                loading={loading}
            />
        )
    } else if(view === 'data') {
        return (
            <DptData 
                refDapil={refDapil}
                refDesa={refDesa}
                refTps={refTps}
                dpt={dpt}
                dapil={dapil}
                desa={desa}
                tps={tps}
                pagination={pagination}
                handlePagination={handlePagination}
                handlePaginationFilter={handlePaginationFilter}
                handlePaginationSearch={handlePaginationSearch}
                handleDapil={handleDapil}
                handleDesa={handleDesa}
                handleTps={handleTps}
                handleName={handleName}
                handleFilter={handleFilter}
                handleUnlock={handleUnlock}
                filter={filter}
                search={search}
            />
        )
    }
}

export default DptController
