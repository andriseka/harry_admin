import React, { useEffect, useState } from 'react'
import Layouts from '../../layouts/Layouts'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getDetailFinancial } from '../../../../app/model/financial/financialSlice';
import FormTitle from '../../../components/title/FormTitle';
import GridCols2 from '../../../components/grid/GridCols2';

const FinancialDetail = () => {
    const { financial_code } = useParams();
    const navigate = useNavigate();

    const [detail, setDetail] = useState([]);
    const [program, setProgram] = useState([]);

    const dispatch = useDispatch();

    const getDataDetail = async() => {
        try {
            const response = await dispatch(getDetailFinancial(financial_code)).unwrap().catch((err) => {});
            setDetail(response.financial);
            setProgram(response.program);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetail();
    }, []);

    const handleback = () => {
        return navigate(-1);
    }

    return (
        <Layouts>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-xl font-bold text-gray-600"> { detail.name ? detail.name: ' ' } </h1>
                <span className="text-orange-500 hover:text-orange-600 cursor-pointer" onClick={handleback}>Kembali</span>
            </div>

            <div>
                <div className="card max-w-xl mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <FormTitle title={'DETAIL FINANCIAL'} />
                            </div>

                            <form>
                                <div className="mb-3">
                                    <GridCols2>
                                        <div>
                                            <label>Tanggal</label>
                                            <input type="text" className="form-control" defaultValue={detail.date ? detail.date: ''} disabled/>
                                        </div>
                                        <div>
                                            <label>Status</label>
                                            <input type="text" className="form-control" 
                                                defaultValue={
                                                    detail.status === 'masuk' ? 'Masuk' :
                                                    detail.status === 'keluar' ? 'Keluar' : ''
                                                } 
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label>Nama Transaksi</label>
                                            <input type="text" className="form-control" defaultValue={detail.name ? detail.name: ''} disabled/>
                                        </div>
                                        <div>
                                            <label>Nominal</label>
                                            <input type="text" className="form-control" defaultValue={detail.nominal ? detail.nominal: ''} disabled/>
                                        </div>
                                        <div>
                                            <label>Metode Pembayaran</label>
                                            <input type="text" className="form-control" 
                                                defaultValue={
                                                    detail.payment_method === 'cash' ? 'Cash' :
                                                    detail.payment_method === 'transfer' ? 'Transfer' : ''
                                                } 
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label>Bukti</label>
                                            <div>
                                                <a href={ detail.bukti ? detail.bukti : '' } target="_blank" className="text-blue-500 hover:text-blue-600">Lihat Bukti</a>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label>Keterangan</label>
                                            <textarea className="form-control" placeholder="Tulis Keterangan" defaultValue={ detail.description ? detail.description : ''} style={{height: '80px'}} disabled></textarea>
                                        </div>
                                    </GridCols2>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div>
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
                                    <span>Koordinat</span>
                                    <GridCols2>
                                        <div>
                                            <label>Latitude</label>
                                            <input type="text" className="form-control" placeholder={detail.latitude ? detail.latitude : ''} disabled />
                                        </div>
                                        <div>
                                            <label>Longitude</label>
                                            <input type="text" className="form-control" placeholder={detail.longitude ? detail.longitude : ''} disabled />
                                        </div>
                                    </GridCols2>
                                </div>
                                <div className="mb-3">
                                    <label>Deskripsi</label>
                                    <textarea className="form-control" placeholder={detail.description ? detail.description : ''} disabled style={{height: '100px'}}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="block">File Pengajuan</label>
                                    <a href="" className="text-blue-400">Download</a>
                                </div>
                                <form>
                                    <div className="mb-3">
                                        <label>Upload Bukti Penyerahan Anggaran</label>
                                        <input type="file" accept="image/png, image/jpg, image/jpeg" className="form-control px-2 py-1" required />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </GridCols2>
            </div> */}
        </Layouts>
    )
}

export default FinancialDetail
