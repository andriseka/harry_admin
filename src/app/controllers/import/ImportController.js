import React, { useEffect, useState } from 'react'
import Import from '../../../resources/views/import/Import'
import { useDispatch } from 'react-redux'
import { getDapil } from '../../model/dapil/dapilSlice';
import { getDesa } from '../../model/wilayah/desaSlice';
import { getTpsByCode } from '../../model/tps/tpsSlice';

function ImportController() {
    const dispatch = useDispatch();
    const [dapil, setDapil] = useState([]);
    const [desa, setDesa] = useState([]);
    const [tps, setTps] = useState([]);

    const [select, setSelect] = useState({
        kecamatan_id: '', desa_id: '', tps_id: ''
    })
    const [download, setDownload] = useState(false);

    const getDataDapil = async() => {
        try {
            const response = await dispatch(getDapil()).unwrap().catch((err) => {});
            setDapil(response.map((i) => ({ value: i.kecamatan_id, label: i.kecamatan })))
        } catch (error) {
            
        }
    }

    const getDataDesa = async(kec_id) => {
        try {
            const response = await dispatch(getDesa(kec_id)).unwrap().catch((err) => {});
            setDesa(response.map((i) => ({ value: i.id, label: i.name })));
        } catch (error) {
            
        }
    }

    const getDataTps = async(code) => {
        try {
            const response = await dispatch(getTpsByCode(code)).unwrap().catch((err) => {});
            setTps(response.map((i) => ({ value: i.id, label: 'TPS ' + i.tps })))
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDapil();
    }, []);

    // handle desa
    const handleDapil = (e) => {
        if (e) {
            setSelect({
                kecamatan_id: e.value,
                desa_id: '',
                tps_id: ''
            })
            return getDataDesa(e.value);
        }
    }

    const handleDesa = (e) => {
        if (e) {
            setSelect({
                kecamatan_id: e.value,
                desa_id: e.value,
                tps_id: ''
            })
            const code = select.kecamatan_id + '.' + e.value;
            return getDataTps(code);
        }
    }

    const handleTps = (e) => {
        if (e) {
            setSelect({
                ...select,
                tps_id: e.value
            })
        }
    }

    const handleDownload = () => {
        setDownload(true);
    }

    return (
        <Import 
            dapil={dapil}
            desa={desa}
            tps={tps}
            handleDapil={handleDapil}
            handleDesa={handleDesa}
            handleTps={handleTps}
            handleDownload={handleDownload}
            download={download}
        />
    )
}

export default ImportController
