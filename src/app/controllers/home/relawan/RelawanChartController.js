import React, { useEffect, useState } from 'react'
import RelawanChart from '../../../../resources/views/home/relawan/RelawanChart'
import { useDispatch } from 'react-redux';
import { getTotalRelawan } from '../../../model/chart/relawan/relawanChartSlice';

function RelawanChartController() {
    const dispatch = useDispatch();
    const [groupKecamatan, setGroupKecamatan] = useState([]);
    const [detail, setDetail] = useState([]);
    const [total, setTotal] = useState({
        total: ''
    })
 
    const getDataTotalRelawan = async() => {
        try {
            const response = await dispatch(getTotalRelawan()).unwrap().catch((err) => {});
            setTotal(response.total);

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
        getDataTotalRelawan();
    }, []);

    return (
        <RelawanChart 
            groupKecamatan={groupKecamatan}
            detail={detail}
            total={total}
        />
    )
}

export default RelawanChartController
