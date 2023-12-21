import React, { useEffect } from 'react'
import ProgramValidasi from '../../../resources/views/program/validasi/ProgramValidasi'
import { useDispatch, useSelector } from 'react-redux'
import { getProgram } from '../../model/program/programSlice';
import toast from 'react-hot-toast';

function ProgramValidasiController() {
    const dispatch = useDispatch();

    const getDataProgram = async(data) => {
        try {
            await dispatch(getProgram(data)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    const { program, pagination } = useSelector(state => state.program);

    useEffect(() => {
        getDataProgram({ validasi: 'validasi', page :1 });
    }, [])

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama', {icon : '🙏'});
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terakhir', {icon : '🙏'});
        } else {
            return getDataProgram(page);
        }
    }


    return (
        <ProgramValidasi 
            program={program}
            pagination={pagination}
            handlePagination={handlePagination}
        />
    )
}

export default ProgramValidasiController
