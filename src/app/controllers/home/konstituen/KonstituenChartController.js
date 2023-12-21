import React, { useEffect, useState } from 'react'
import KonstituenChart from '../../../../resources/views/home/konstituen/KonstituenChart'
import { useDispatch } from 'react-redux';
import { getTotalKonstituen } from '../../../model/chart/konstituen/konstituenChartSlice';

function KonstituenChartController() {
    const dispatch = useDispatch();
    const [groupKecamatan, setGroupKecamatan] = useState([]);
    const [detail, setDetail] = useState([]);
    const [total, setTotal] = useState({
        total: ''
    })
 
    const getDataTotalKonstituen = async() => {
        try {
            const response = await dispatch(getTotalKonstituen()).unwrap().catch((err) => {});
            setTotal(response.total)
            setGroupKecamatan(response.data.map((i) => ({
                name: i.kecamatan,
                y: i.total,
                z: i.total,
                drilldown: i.kecamatan
            })))
            setDetail(response.data.map((i) => ({
                colorByPoint: true,
                name: i.kecamatan,
                id: i.kecamatan,
                data: i.desa.map((j) => ({
                    name: j.name,
                    y: j.total,
                    z: j.total
                }))
            })))
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataTotalKonstituen();
    }, []);
    return (
        <KonstituenChart 
            groupKecamatan={groupKecamatan}
            detail={detail}
            total={total}
        />
    )
}

export default KonstituenChartController
