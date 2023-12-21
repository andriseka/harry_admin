import React, { useEffect, useState } from 'react'
import Program from '../Program'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getProgramDetail, postValidasiLaporan } from '../../../../app/model/program/programSlice';
import FormTitle from '../../../components/title/FormTitle';
import GridCols2 from '../../../components/grid/GridCols2';
import { useForm } from 'react-hook-form';
import ButtonSuccess from '../../../components/button/ButtonSuccess'
import Loading from '../../../components/loading/Loading';

const ProgramDetail = () => {
    const dispatch = useDispatch();
    const { username, validasi_code } = useParams();
    const [detail, setDetail ] = useState([]);
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit} = useForm();

    const getDataDetail = async(code) => {
        try {
            const response = await dispatch(getProgramDetail(code)).unwrap().catch((err) => {});
            setDetail(response.data);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetail(validasi_code);
    }, []);

    const handleCancle = () => {
        return window.location.href = `/${username}/program/validasi`
    }

    const onUpdateValidasiLaporan = async(data) => {
        setLoading(true);
        const dataUpload = {
            code: validasi_code,
            file: data.laporan[0]
        }
        try {
            const response = await dispatch(postValidasiLaporan(dataUpload)).unwrap().catch((err) => {});
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
        <Program>
            { loading ? <Loading /> : '' }
            <div>
                <div className="flex justify-between mb-5">
                    <h1 className="text-xl text-gray-600 font-bold">VALIDASI PROGRAM</h1>
                    <span className="text-orange-500 hover:text-orange-600 cursor-pointer" onClick={handleCancle}>Kembali</span>
                </div>
                <GridCols2>
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <FormTitle title={'INFORMASI PROGRAM'} />
                                </div>
                                <div>
                                    <div className="mb-3">
                                        <label>Pengusul</label>
                                        <input type="text" className="form-control" placeholder={detail.pengusul ? detail.pengusul : ''} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label>Nama Program</label>
                                        <input type="text" className="form-control" placeholder={detail.name ? detail.name : ''} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <GridCols2>
                                            <div>
                                                <label>Status</label>
                                                <input type="text" className="form-control" placeholder={detail.status ? detail.status : ''} disabled />
                                            </div>
                                            <div>
                                                <label>Kategori</label>
                                                <input type="text" className="form-control" placeholder={detail.category ? detail.category : ''} disabled />
                                            </div>
                                            <div>
                                                <label>Tempat Pelaksanaan</label>
                                                <input type="text" className="form-control" placeholder={detail.tmpt_pelaksanaan ? detail.tmpt_pelaksanaan : ''} disabled />
                                            </div>
                                            <div>
                                                <label>Tanggal Pelaksanaan</label>
                                                <input type="date" className="form-control" defaultValue={detail.tgl_pelaksanaan ? detail.tgl_pelaksanaan : ''} disabled />
                                            </div>
                                        </GridCols2>
                                    </div>
                                    <div className="mb-3">
                                        <label>Rencana Anggaran</label>
                                        <input type="text" className="form-control" placeholder={detail.anggaran ? detail.anggaran : ''} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <FormTitle title={'INFORMASI TAMBAHAN'} />
                                </div>
                                <div className="mb-3">
                                    <label>Deskripsi</label>
                                    <textarea className="form-control" placeholder={detail.description ? detail.description : ''} disabled style={{height: '100px'}}></textarea>
                                </div>
                                <div className="flex mb-3">
                                    <div className="me-3">
                                        <label className="block">File Pengajuan</label>
                                        <a href={ detail.files ? detail.files : '' } target="_blank" className="text-blue-400">Lihat File Pengajuan</a>
                                    </div>
                                    <div className="me-3">
                                        <label className="block">Bukti Penyerahan Anggaran</label>
                                        <a href={ detail.bukti ? detail.bukti : '' } target="_blank" className="text-blue-400">Lihat Bukti</a>
                                    </div>
                                    <div className="me-3">
                                        <label className="block">Metode</label>
                                        <span>{ detail.payment_status === 'cash' ? 'Cash' : 'Transfer' }</span>
                                    </div>
                                </div>
                                {
                                    detail.laporan ?  
                                    <div className="mb-3">
                                        <label className="block">Laporan</label>
                                        <a href={detail.laporan} className="text-blue-500 hover:text-blue-600" target="_blank">Lihat Laporan</a>
                                    </div> : 
                                    <form onSubmit={handleSubmit(onUpdateValidasiLaporan)}>
                                        <div className="mb-3">
                                            <label>Upload Laporan</label>
                                            <input type="file" className="form-control px-3 py-1" {...register('laporan')} required  />
                                        </div>
                                        <div className="flex justify-end">
                                            <ButtonSuccess name={'Validasi Program'} />
                                        </div>
                                    </form>
                                }
                                
                            </div>
                        </div>
                    </div>
                </GridCols2>
            </div>
        </Program>
    )
}

export default ProgramDetail
