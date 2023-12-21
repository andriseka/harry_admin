import React, { useEffect, useState } from 'react'
import ProgramHome from '../../../../resources/views/home/program/ProgramHome'
import { useDispatch, useSelector } from 'react-redux';
import { getProgramPosting } from '../../../model/program/programSlice';

function PorgramHomeController() {
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
        <ProgramHome 
            program={program}
            pagination={pagination}
        />
    )
}

export default PorgramHomeController
