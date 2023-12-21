import React, { useEffect, useState } from 'react'
import RelawanMoveData from '../../../resources/views/organisasi/relawan/grade/move/RelawanMoveData'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getDetailRelawan } from '../../model/relawan/relawanSlice';

function RelawanMoveDataController() {
    const { username, relawan_username } = useParams();
    const dispatch = useDispatch();
    const [detail, setDetail] = useState([]);

    const navigate = useNavigate();

    const checkData = async() => {
        try {
            const response = await dispatch(getDetailRelawan(relawan_username)).unwrap().catch((err) => {});
            if (response.status === 404) {
                return navigate(-1);
            }
            if (response.status === 200) {
                setDetail(response.data);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        checkData();
    }, [])

    return (
        <RelawanMoveData 
            detail={detail}
            relawan_username={relawan_username}
        />
    )
}

export default RelawanMoveDataController
