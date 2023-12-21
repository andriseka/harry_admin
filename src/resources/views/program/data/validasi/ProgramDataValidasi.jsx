import React, { useEffect, useState } from 'react'
import Program from '../../Program'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getProgramDetail, updateValidasiProgram } from '../../../../../app/model/program/programSlice';
import GridCols2 from '../../../../components/grid/GridCols2';
import FormTitle from '../../../../components/title/FormTitle';
import ButtonSuccess from '../../../../components/button/ButtonSuccess';
import { useForm } from 'react-hook-form';
import Loading from '../../../../components/loading/Loading';
import { imageResizer } from '../../../../../utils/imageResizer';

const ProgramDataValidasi = () => {
    const dispatch = useDispatch();
    const { program_code, username } = useParams();

    const {register, handleSubmit} = useForm();
    const [detail, setDetail] = useState([]);

    const [loading, setLoading] = useState(false);

    const getDataDetail = async() => {
        try {
            const response = await dispatch(getProgramDetail(program_code)).unwrap().catch((err) => {});
            if (response.status === 404) {
                return window.location.href = `/${username}/program/data`;
            }

            if (response.status === 200) {
                setDetail(response.data);
            }
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetail();
    }, []);

    // handle
    const validasiData = async(data) => {
        setLoading(true);
        data.bukti = await imageResizer(data.bukti[0], 400, 600).catch((err) => {});

        data = {
            bukti : data.bukti,
            code: program_code,
            payment_method: data.payment_method
        }
        try {
            const response = await dispatch(updateValidasiProgram(data)).unwrap().catch((err) => {});
            if (response.status === 200) {
                return window.location.href = `/${username}/program/validasi`
            }
        } catch (error) {
            
        }
    }

    const handleCancle = () => {
        return window.location.href = `/${username}/program/data`
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
                                <div className="mb-3">
                                    <label className="block">File Pengajuan</label>
                                    <a href={ detail.files ? detail.files : '' } target="_blank" className="text-blue-400">Lihat File Pengajuan</a>
                                </div>
                                <form onSubmit={handleSubmit(validasiData)}>
                                    <div className="mb-3">
                                        <label>Upload Bukti Penyerahan Anggaran</label>
                                        <input type="file" accept="image/png, image/jpg, image/jpeg" className="form-control px-2 py-1" {...register('bukti')} required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Metode Pembayaran</label>
                                        <select className="form-select" {...register('payment_method')} required>
                                            <option value="cash">Cash</option>
                                            <option value="transfer">Transfer</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end">
                                        <ButtonSuccess name={'Validasi'} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </GridCols2>
            </div>
        </Program>
    )
}

export default ProgramDataValidasi
