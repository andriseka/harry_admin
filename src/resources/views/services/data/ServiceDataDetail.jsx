import React, { useEffect, useState } from 'react'
import Layouts from '../../layouts/Layouts'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailService } from '../../../../app/model/service/serviceSlice';
import toast, { Toaster } from 'react-hot-toast';
import FormTitle from '../../../components/title/FormTitle';

const ServiceDataDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username, id } = useParams();

    const [service, setService] = useState([]);
    const getDataDetail = async() => {
        try {
            const response = await dispatch(getDetailService(id)).unwrap().catch((err) => {});
            if (response.status === 404) {
                toast.error('Data tidak ditemukan');
                setTimeout(() => {
                   window.location.href = `/${username}/service/data`;
                }, 1000);
            }

            if (response.status === 200) {
                setService(response.data);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetail();
    }, []);

    const handleBack = () => {
        return navigate(-1);
    }
     

    return (
        <Layouts>
            <Toaster position="top-right" />
            <div className="flex justify-between items-center mb-3 md:mb-5">
                <div>
                    <span className="text-xl font-bold text-gray-600">{ service.dpt }</span>
                </div>
                <div>
                    <span onClick={handleBack} className="text-orange-500 cursor-pointer">Kembali</span>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-1/2">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <FormTitle title={'Data Penerima Bantuan'} />
                            </div>
                            <div className="mb-3">
                                <label>Nama Lengkap</label>
                                <input type="text" className="form-control" placeholder={ service.dpt } disabled />
                            </div>
                            <div className="mb-3">
                                <label>Alamat</label>
                                <input type="text" className="form-control" placeholder={ service.address } disabled />
                            </div>
                            <div className="mb-3">
                                <label>Jenis Bantuan</label>
                                <input type="text" className="form-control" placeholder={ service.category } disabled />
                            </div>
                            <div className="mb-3">
                                <label>Pengusul</label>
                                <input type="text" className="form-control" placeholder={ service.relawan } disabled />
                            </div>
                            <div className="mb-3">
                                <FormTitle title={'Dokumen Penerima Bantuan'} />
                            </div>

                            <div className="mb-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label>KTP</label>
                                        <img src={ service.ktp } alt="" className="w-full h-48 rounded-md" />
                                    </div>
                                    <div>
                                        <label>KK</label>
                                        <img src={ service.kk } alt="" className="w-full h-48 rounded-md" />
                                    </div>
                                    <div>
                                        <label>PM 1</label>
                                        <img src={ service.pm } alt="" className="w-full h-48 rounded-md" />
                                    </div>
                                    <div>
                                        <label>Foto</label>
                                        <img src={ service.photo } alt="" className="w-full h-48 rounded-md" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label>Video</label>
                                        <video src={ service.video } autoPlay muted></video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    )
}

export default ServiceDataDetail
