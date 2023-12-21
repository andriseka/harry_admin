import React, { useEffect, useState } from 'react'
import JadwalKampanye from '../../../../resources/views/home/jadwal/JadwalKampanye'
import { useDispatch } from 'react-redux';
import { getProgramPosting } from '../../../model/program/programSlice';

function JadwalKampanyeController() {
    const dispatch = useDispatch();
    const [program, setPogram] = useState([]);
    const [pagination, setPagination] = useState([]); 

    const getDataProgram = async(page) => {
        try {
            const response = await dispatch(getProgramPosting(page)).unwrap().catch((err) => {});
            setPogram(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataProgram(1)
    }, [])
    return (
        <JadwalKampanye 
            program={program}
            pagination={pagination}
        />
    )
}

export default JadwalKampanyeController
