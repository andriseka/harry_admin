import React, { useEffect, useState } from 'react'
import DptChart from '../../../../resources/views/home/dpt/DptChart'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalDpt } from '../../../model/chart/dpt/dptChartSlice';
import { getVotingTotal } from '../../../model/chart/dpt/votingBlockChartSlice';

function DptChartController() {
    const dispatch = useDispatch();
    const [groupKecamatan, setGroupKecamatan] = useState([]);
    const [detail, setDetail] = useState([]);
    const [voting, setVoting] = useState([]);
    const [totalVoting, setTotalVoting] = useState([]);
    const [total, setTotal] = useState({
        total: ''
    })
 
    const getDataTotalDpt = async() => {
        try {
            const response = await dispatch(getTotalDpt()).unwrap().catch((err) => {});
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

    const getDataVotingTotal = async() => {
        try {
            const response = await dispatch(getVotingTotal()).unwrap().catch((err) => {});
            setTotalVoting(response.total);
            setVoting(response.data.map((i) => ({
                name: `${i.desa}( ${i.kecamatan} )`,
                y: i.total
            })));
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataTotalDpt();
        getDataVotingTotal();
    }, []);

    return (
        <DptChart 
            groupKecamatan={groupKecamatan}
            detail={detail}
            voting={voting}
            totalVoting={totalVoting}
            total={total}
        />
    )
}

export default DptChartController
