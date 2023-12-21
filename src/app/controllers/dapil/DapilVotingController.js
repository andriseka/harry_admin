import React, { useEffect, useRef, useState } from 'react'
import DapilVotingForm from '../../../resources/views/dapil/voting/form/DapilVotingForm'
import DapilVotingData from '../../../resources/views/dapil/voting/data/DapilVotingData'
import { useDispatch, useSelector } from 'react-redux'
import { getDapil } from '../../model/dapil/dapilSlice';
import { getDesa } from '../../model/wilayah/desaSlice';
import toast from 'react-hot-toast';
import { getVb, postVB } from '../../model/dapil/votingBlockSlice';
import { useParams } from 'react-router-dom';

function DapilVotingController({ view }) {
    const dispatch = useDispatch();

    const [select, setSelect] = useState({
        kecamatan_id: '', kecamatan: '', desa_id: '', desa: ''
    })
    const [loading, setLoading] = useState(false);
    const refDesa = useRef(false);

    const {username} = useParams();

    const dapil = useSelector(state => state.dapil.dapil);
    const desa = useSelector(state => state.desa.desa);
    const { vb, pagination } = useSelector(state => state.vb);

    // get data
    const getDataDapil = async() => {
        try {
            await dispatch(getDapil()).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    const getDataDesa = async(kecamatan_id) => {
        try {
            await dispatch(getDesa(kecamatan_id)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    const getDataVB = async(page) => {
        try {
            await dispatch(getVb(page)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDapil();
        getDataVB(1);
    }, []);

    // handle
    const handleDapil = (e) => {
        if (e) {
            setSelect({
                kecamatan_id: e.value,
                kecamatan: e.label,
                desa_id: '',
                desa: ''
            })
            refDesa.current.clearValue();
            return getDataDesa(e.value);
        }
    }

    const handleDesa = (e) => {
        if (e) {
            setSelect({
                ...select,
                desa_id: e.value,
                desa: e.label
            })
        }
    }

    // submit
    const onSubmit = async() => {
        if (select.kecamatan_id !== '' && select.desa_id !== '') {
            setLoading(true);
            const data = {
                ...select
            }
            try {
                const response = await dispatch(postVB(data)).unwrap().catch((err) => {});
                if (response.status === 201) {
                    return window.location.href = `/${username}/dapil/voting-block/data`;
                } else {
                    setLoading(false);
                    toast.error('Data sudah diinputkan');
                }
            } catch (error) {
                
            }
        } else {
            toast('Silahkan isi kecamatan dan desa', {icon: '🙏'});
        }
    }

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berapa di halaman pertama', {icon: '🙏'});
        } else if(page === pagination.last_page + 1) {
            toast('Anda berapa di halaman terkahir', {icon: '🙏'});
        } else {
            return getDataVB(page);
        }
    }

    if (view === 'form') {
        return (
            <DapilVotingForm 
                dapil={dapil}
                desa={desa}
                handleDapil={handleDapil}
                handleDesa={handleDesa}
                refDesa={refDesa}
                onSubmit={onSubmit}
                loading={loading}
            />
        )
    } else if (view === 'data') {
        return (
            <DapilVotingData 
                vb={vb}
                pagination={pagination}
                handlePagination={handlePagination}
            />
        )
    }
}

export default DapilVotingController
