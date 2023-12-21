import React, { useEffect, useState } from 'react'
import ProgramForm from '../../../resources/views/program/form/ProgramForm'
import ProgramData from '../../../resources/views/program/data/ProgramData'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTimses } from '../../model/timses/timsesSlice';
import { getProgram, postProgram } from '../../model/program/programSlice';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { imageResizer } from '../../../utils/imageResizer';
import ProgramDataValidasi from '../../../resources/views/program/data/validasi/ProgramDataValidasi';
import ProgramDetail from '../../../resources/views/program/data/ProgramDetail';

function ProgramController({ view }) {
    const dispatch = useDispatch();

    const { username } = useParams();
    const[nominal, setNominal] = useState({
        anggaran : ''
    });

    const [timses, setTimses] = useState([]);
    const [loading, setLoading] = useState(false);

    const { program, pagination } = useSelector(state => state.program);

    // get data
    const getDataAllTimses = async() => {
        try {
            const response = await dispatch(getAllTimses()).unwrap().catch((err) => {});
            setTimses(response)
        } catch (error) {
            
        }
    }

    const getDataProgram = async(data) => {
        try {
            await dispatch(getProgram(data)).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataAllTimses();
        getDataProgram({ validasi: 'tidak', page :1 });
    }, []);

    const handleNominal = (nominal) => {
        setNominal({
            anggaran: nominal
        })
    }  

    // submit
    const onSubmit = async(data) => {
        setLoading(true)
        if (data.files.length > 0) {
            data.files = data.files[0];
        } else {
            data.files = ''
        }

        if (data.pamflet.length > 0) {
            data.pamflet = await imageResizer(data.pamflet[0], 400, 780);
        } else {
            data.pamflet = ''
        }

        data = {
            ...data,
            ...nominal
        }

        try {
            const response = await dispatch(postProgram(data)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 201) {
                    return window.location.href = `/${username}/program/data`;
                }
                if (response.status === 400) {
                    toast.error('Silahkan cek kembali data Anda');
                }
            }
        } catch (error) {
            setLoading(false);
        }
    }     

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama', {icon : '🙏'});
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terakhir', {icon : '🙏'});
        } else {
            return getDataProgram(page);
        }
    }

    if (view === 'form') {
        return (
            <ProgramForm 
                timses={timses}
                onSubmit={onSubmit}
                loading={loading}
                handleNominal={handleNominal}
            />
        )
    } else if(view === 'data') {
        return (
            <ProgramData 
                program={program}
                pagination={pagination}
                handlePagination={handlePagination}
            />
        )
    } else if (view === 'validasi') {
        return (
            <ProgramDataValidasi />
        )
    } else if (view === 'detail') {
        return (
            <ProgramDetail />
        )
    }
}

export default ProgramController
