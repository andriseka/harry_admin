import React, { useEffect, useRef, useState } from 'react'
import DapilAreaForm from '../../../resources/views/dapil/area/form/DapilAreaForm'
import DapilAreaData from '../../../resources/views/dapil/area/data/DapilAreaData'
import { useDispatch, useSelector } from 'react-redux'
import { getKecamatan } from '../../model/wilayah/kecamatanSlice';
import { getDesa } from '../../model/wilayah/desaSlice';
import toast from 'react-hot-toast';
import { getDapil, postDapil } from '../../model/dapil/dapilSlice';
import { useParams } from 'react-router-dom';
import { filterTps, getTps } from '../../model/tps/tpsSlice';

function DapilAreaController({ view }) {
    const dispatch = useDispatch();
    const caleg = JSON.parse(localStorage.getItem('caleg'));
    const [select, setSelect] = useState({
        kecamatan_id: '',
        kecamatan: ''
    })
    const [filter, setFilter] = useState(false);
    const [selectFilter, setSelectFilter] = useState({
        kecamatan_id: '',
        desa_id: ''
    })

    const [lock, setLock] = useState(false);
    const [loading, setLoading] = useState(false);
    const [desa, setDesa] = useState([]);
    const [dapil, setDapil] = useState([]);
    const [optionDesa, setOptioanDesa] = useState([]);

    const refDesa = useRef(false);
    const { username } = useParams();

    // data array
    const kecamatan = useSelector(state => state.kecamatan.kecamatan);
    const { tps, pagination } = useSelector(state => state.tps);

    // get data
    const getDataKecamatan = async() => {
        try {
            await dispatch(getKecamatan(caleg.kabupaten_id)).unwrap().catch(() => {});
        } catch (error) {
            
        }
    }

    const getDataDapil = async() => {
        try {
            const response = await dispatch(getDapil()).unwrap().catch((err) => {});
            setDapil(response.map((i) => ({value: i.kecamatan_id, label: i.kecamatan})));
        } catch (error) {
            
        }
    }

    const getDataDesa = async(kecamatan_id) => {
        try {
           const response =  await dispatch(getDesa(kecamatan_id)).unwrap().catch((err) => {});
        //    setDesa(response);
        return response;
        } catch (error) {
            
        }
    }

    const getDataTps = async(page) => {
        try {
            await dispatch(getTps(page)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    const getTpsFilter = async(data) => {
        try {
            await dispatch(filterTps(data)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataKecamatan();
        getDataDapil();
        getDataTps(1);
    }, []);

    // handle 
    const handleKecamatan = (e) => {
        if (e) {
            setSelect({
                kecamatan_id : e.value,
                kecamatan: e.label
            })
        }
    }

    const handleLock = async() => {
        if (select.kecamatan_id !== '') {
            try {
                const response  = await getDataDesa(select.kecamatan_id);
                setDesa(response);
                setLock(true);
            } catch (error) {
                
            }
        } else {
            toast('Silahkan Pilih Kecamatan', {icon: '🙏'})
        }
    }

    const handleUnlock = () => {
        setLock(false);
        setDesa([]);
    }

    // submit
    const onSubmit = async(data) => {
        setLoading(true)
        data = {
            ...data,
            ...select
        }

        try {
            const response = await dispatch(postDapil(data)).unwrap().catch((err) => {
                
            });
            if (response.status === 201) {
                toast.success('Data berhasil disimpan');
                setTimeout(() => {
                    return window.location.href = `/${username}/dapil/area/data` 
                }, 1000);
            }

            console.log(response);
        } catch (error) {
            
        }
    }


    // data
    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama', {icon: '🙏'})
        } else if (page === pagination.last_page + 1) {
            toast('Anda berapa di halaman terakhir',{icon: '🙏'});
        } else {
            return getDataTps(page);
        }
    }

    const handleDapil = async(e) => {
        if (e) {
            refDesa.current.clearValue();
            try {
                const response = await getDataDesa(e.value);
                setOptioanDesa(response.map((i) => ({ value: i.id, label: i.name })))
                setSelectFilter({
                    kecamatan_id: e.value,
                    desa_id: ''
                })
            } catch (error) {
                
            }
        }
    }

    const handleDesa = (e) => {
        if (e) {
            setSelectFilter({
                ...selectFilter,
                desa_id: e.value
            })
        }
    }

    const handleLockFilter = async() => {
        if (selectFilter.kecamatan_id !== '') {
            setFilter(true);
            const data = {
                code: selectFilter.kecamatan_id + '.' + selectFilter.desa_id,
                page: 1
            }
            return getTpsFilter(data);
        } else {
            toast('Silahakan isi kecamatan', {icon: '🙏'})
        }
    }

    const handleUnlockFilter = () => {
        setFilter(false);
        return getDataTps(1);
    }

    const handlePaginationFilter = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama', {icon: '🙏'})
        } else if (page === pagination.last_page + 1) {
            toast('Anda berapa di halaman terakhir',{icon: '🙏'});
        } else {
            const data = {
                code: selectFilter.kecamatan_id + '.' + selectFilter.desa_id,
                page: page
            }
            return getTpsFilter(data);
        }
    }

    if (view === 'form') {
        return (
            <DapilAreaForm 
                kecamatan={kecamatan}
                desa={desa}
                handleKecamatan={handleKecamatan}
                handleLock={handleLock}
                handleUnlock={handleUnlock}
                lock={lock}
                onSubmit={onSubmit}
                loading={loading}
            />
        )
    } else if (view === 'data') {
        return (
            <DapilAreaData 
                refDesa={refDesa}
                dapil={dapil}
                optionDesa={optionDesa}
                tps={tps}
                handleDapil={handleDapil}
                handleDesa={handleDesa}
                pagination={pagination}
                handlePagination={handlePagination}
                handleLockFilter={handleLockFilter}
                handleUnlockFilter={handleUnlockFilter }
                filter={filter}
                handlePaginationFilter={handlePaginationFilter}
            />
        )
    }
}

export default DapilAreaController
