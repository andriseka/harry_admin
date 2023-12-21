import React, { useCallback, useEffect, useRef, useState } from 'react'
import Layouts from '../../../layouts/Layouts'
import FormTitle from '../../../../components/title/FormTitle'
import Webcam from "react-webcam";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import Loading from '../../../../components/loading/Loading';

const ServiceFormAdd = ({
    detail, picture, handleKtp,handleKK, handlePM, handleVideo, videoPreview, handleBack, handlePhoto, onSubmit,
    loading
}) => {

    const {register, handleSubmit} = useForm();

    return (
        <Layouts>
            <Toaster position="top-right" />
            { loading ? <Loading /> : '' }
            <div className="flex justify-between items-center mb-3 md:mb-5">
                <div>
                    <h1 className="text-xl text-gray-600 font-bold">FORM LAYANAN INFORMASI</h1>
                </div>
                <div>
                    <span className="text-orange-500 cursor-pointer" onClick={handleBack}>Kembali</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <FormTitle title={'Informasi Penerima Bantuan'} />
                            </div>

                            <div className="mb-3">
                                <label>Nama Penerima</label>
                                <input type="text" className="form-control" placeholder={ detail.name ? detail.name: '' } disabled />
                            </div>
                            <div className="mb-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label>Jenis Kelamin</label>
                                        <input type="text" className="form-control" placeholder={ detail.gender === 'L' ? 'Laki Laki' : 'Perempuan'} disabled />
                                    </div>
                                    <div>
                                        <label>Usia</label>
                                        <input type="text" className="form-control" placeholder={ detail.usia ? `${detail.usia} Tahun` : ''} disabled />
                                    </div>
                                    <div>
                                        <label>Kecamatan</label>
                                        <input type="text" className="form-control" placeholder={ detail.kecamatan ? detail.kecamatan : ''} disabled />
                                    </div>
                                    <div>
                                        <label>Desa</label>
                                        <input type="text" className="form-control" placeholder={ detail.desa ? detail.desa : ''} disabled />
                                    </div>
                                    <div>
                                        <label>RT</label>
                                        <input type="text" className="form-control" placeholder={ detail.rt ? detail.rt : ''} disabled />
                                    </div>
                                    <div>
                                        <label>RW</label>
                                        <input type="text" className="form-control" placeholder={ detail.rw ? detail.rw : ''} disabled />
                                    </div>
                                    <div>
                                        <label>TPS</label>
                                        <input type="text" className="form-control" placeholder={ detail.tps ? `TPS ${detail.tps}` : ''} disabled />
                                    </div>
                                    <div>
                                        <label>Status</label>
                                        <input type="text" className="form-control" placeholder={ detail.status === 'tidak' ? 'Tidak Konstituen / Relawan' : 'Konstituen / Relawan'} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <FormTitle title={'Informasi Tambahan'} />
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label className="">Upload KTP</label>
                                    <span onClick={handleKtp} className="block w-full border rounded-md py-2 font-bold px-3 cursor-pointer">
                                        Upload KTP
                                    </span>
                                    {
                                        picture.ktp ? 
                                        <div className="mt-2">
                                            <img src={ picture.ktp } alt="" className="w-full h-64 rounded" />
                                        </div> : ''
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="">Upload KK</label>
                                    <span onClick={handleKK} className="block w-full border rounded-md py-2 font-bold px-3 cursor-pointer">
                                        Upload KK
                                    </span>
                                    {
                                        picture.kk ? 
                                        <div className="mt-2">
                                            <img src={ picture.kk } alt="" className="w-full h-64 rounded" />
                                        </div> : ''
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="">Upload PM 1</label>
                                    <span onClick={handlePM} className="block w-full border rounded-md py-2 font-bold px-3 cursor-pointer">
                                        Upload PM 1
                                    </span>
                                    {
                                        picture.pm ? 
                                        <div className="mt-2">
                                            <img src={ picture.pm } alt="" className="w-full rounded h-64" />
                                        </div> : ''
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="">Upload Foto</label>
                                    <span onClick={handlePhoto} className="block w-full border rounded-md py-2 font-bold px-3 cursor-pointer">
                                        Upload Foto
                                    </span>
                                    {
                                        picture.photo ? 
                                        <div className="mt-2">
                                            <img src={ picture.photo } alt="" className="w-full rounded h-64" />
                                        </div> : ''
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="">Upload Video</label>
                                    <span onClick={handleVideo} className="block w-full border rounded-md py-2 font-bold px-3 cursor-pointer">
                                        Upload Video
                                    </span>
                                    <input type="file" accept="video/mp4" id="video" {...register('video')} hidden />
                                    {
                                        videoPreview ?
                                        <div className="mt-3">
                                            <video src={ videoPreview } autoPlay muted className="w-full"></video>
                                        </div> :''
                                    }
                                
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" variant="contained" color="primary">
                                        Simpan Data
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    )
}

export default ServiceFormAdd
