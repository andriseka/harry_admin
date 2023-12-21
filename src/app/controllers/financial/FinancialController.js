import React, { useEffect, useState } from 'react'
import FinancialForm from '../../../resources/views/financial/form/FinancialForm'
import FinancialData from '../../../resources/views/financial/data/FinancialData'
import { useDispatch, useSelector } from 'react-redux'
import { getFinancial, getFinancialBtStaus, postFinancial } from '../../model/financial/financialSlice';
import { imageResizer } from '../../../utils/imageResizer';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import FinancialDetail from '../../../resources/views/financial/data/FinancialDetail';

function FinancialController({ view }) {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const { username }= useParams();

    const [nominal, setNominal] = useState({
        nominal : ''
    })

    const handleNominal = (nominal) => {
        setNominal({
            nominal: nominal
        })
    }

    const onSubmit = async(data) => {
        setLoading(true);

        data.bukti = await imageResizer(data.bukti[0], 400, 780).catch((err) => {});

        data = {
            ...data,
            ...nominal
        }

        try {
            const response = await dispatch(postFinancial(data)).unwrap().catch((err) => {});
            if (response) {
                if (response.status === 201) {
                    return window.location.href = `/${username}/financial/data`;
                }
            }
        } catch (error) {
            
        }
    }


    if (view === 'form') {
        return (
            <FinancialForm 
                handleNominal={handleNominal}
                onSubmit={onSubmit}
                loading={loading}
            />
        )
    } else if(view === 'data') {
        return (
            <FinancialData />
        )
    } else if (view === 'detail') {
        return (
            <FinancialDetail />
        )
    }
}

export default FinancialController
