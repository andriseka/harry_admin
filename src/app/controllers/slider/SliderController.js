import React, { useEffect, useState } from 'react'
import Slider from '../../../resources/views/slider/Slider'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSlider, getSlider, postSlider } from '../../model/slider/sliderSlice';

function SliderController() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const slider = useSelector(state => state.slider.slider);

    const getDataSlider = async() => {
        try {
            await dispatch(getSlider()).unwrap().catch((err) => {});
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataSlider();
    }, []);

    const onSubmit = async(data) => {
        setLoading(true);
        data.slider = data.slider[0];
        try {
            const response = await dispatch(postSlider(data)).unwrap().catch((err)=>{});
            if (response) {
                setLoading(false);
                if (response.status === 201) {
                    return window.location.reload();
                }
            }
        } catch (error) {
            
        }
    }

    const onDelete = async(id) => {
        setLoading(true);
        try {
            const response = await dispatch(deleteSlider(id)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 200) {
                    return window.location.reload();
                }
            }
        } catch (error) {
            
        }
    }

    return (
        <Slider 
            slider={slider}
            onSubmit={onSubmit}
            loading={loading}
            onDelete={onDelete}
        />
    )
}

export default SliderController
