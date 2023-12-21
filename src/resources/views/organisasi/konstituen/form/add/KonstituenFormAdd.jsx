import React, { useEffect, useState } from 'react'
import Layouts from '../../../../layouts/Layouts'
import { useDispatch } from 'react-redux'
import { searchNameRelawan } from '../../../../../../app/model/relawan/relawanSlice';
import GridCols2 from '../../../../../components/grid/GridCols2';
import FormTitle from '../../../../../components/title/FormTitle';
import ButtonPrimary from '../../../../../components/button/ButtonPrimary';
import { getDptDetail } from '../../../../../../app/model/dpt/dptSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { postKonstiten } from '../../../../../../app/model/konstituen/konstituenSlice';
import Loading from '../../../../../components/loading/Loading'
import { Button } from '@mui/material';
import { CameraAltRounded } from '@mui/icons-material';
import { Camera, CameraResultType } from '@capacitor/camera';
import { b64toBlob } from '../../../../../components/b64toblob/b64toblob'
import { imageResizer } from '../../../../../../utils/imageResizer'

const KonstituenFormAdd = () => {
    const dispatch = useDispatch();

    const [inputName, setInputName] = useState({
        name: ''
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { username,  dpt_kons_id } = useParams();

    const [relawan, setRelawan] = useState([]);
    const[detail, setDetail] = useState([]);
    const [pagination, setPagination] = useState([]);

    const [picture, setPicture] = useState('');
    const [phone, setPhone] = useState('')

    const [upload, setUpload] = useState('');

    // get data
    const getDataRelawan = async(data) => {
        try {
            const response = await dispatch(searchNameRelawan(data)).unwrap().catch((err) => {});
            setRelawan(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    const getDataDetailDpt = async() => {
        try {
            const response = await dispatch(getDptDetail(dpt_kons_id)).unwrap().catch((err) => {});
            setDetail(response.data);
        } catch (error) {
            
        }
    }

    const postDataKonstituen = async(data) => {
        try {
            const response = await dispatch(postKonstiten(data)).unwrap().catch((err) => {});
            if (response.status === 201) {
                setLoading(false);
                return window.location.href = `/${username}/organisasi/konstituen/data`;
            }
        } catch (error) {
            
        }
    }


    const handleInputName = (e) => {
        setInputName({
            name: e.target.value
        })
    }
    
    const handleSearchRelawan = () => {
        const data = {
            name: inputName.name,
            page :1
        }
        return getDataRelawan(data);
    }

    const takePicture = async() => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64,
            });
            let imageUrl = image.base64String;
            setUpload(imageUrl);

            setPicture('data:image/png;base64,' + imageUrl);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetailDpt();
    }, []);

    const handelTelephone = (e) => {
        if (e) {
            setPhone(e.target.value)
        }
    }
      

    const handlePostKonstituen = async(relawan_id) => {
        setLoading(true);

        let blob = b64toBlob(upload, "image/png");
        const file = new File([blob], 'photo.png', {
            type: blob.type,
            lastModified: new Date().getTime()
        });

        const resize = await imageResizer(file, 256, 256);
        const data = {
            image : resize,
            phone: phone,
            relawan_id: relawan_id,
            dpt_id: dpt_kons_id
        }
        return postDataKonstituen(data);
    }

    const handleBack = () => {
        return window.location.href = `/${username}/organisasi/konstituen/form`;
    }

    return (
        <Layouts>
            { loading ? <Loading /> : '' } 
            <div>
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <FormTitle title={'TAMBAH DATA KONSTITUEN'} />
                    </div>
                    <div>
                        <span onClick={handleBack} className="text-orange-500 hover:text-orange-600 cursor-pointer">Kembali</span>
                    </div>
                </div>
                <GridCols2>
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <FormTitle title={'PERSONAL DATA DPT'} />
                                </div>
                                <div>
                                    <GridCols2>
                                        <div>
                                            <label>Nama Lengkap</label>
                                            <input type="text" className="form-control" placeholder={detail.name ? detail.name : ''} disabled />
                                        </div>
                                        <div>
                                            <label>Jenis Kelamin</label>
                                            <input type="text" className="form-control" 
                                                placeholder={
                                                    detail.gender === 'L' ? 'Laki Laki' :
                                                    detail.gender === 'P' ? 'Perempuan' :
                                                    ''
                                                } 
                                                disabled 
                                            />
                                        </div>
                                        <div>
                                            <label>Usia</label>
                                            <input type="text" className="form-control" placeholder={detail.usia ? `${detail.usia} Tahun` : ''} disabled />
                                        </div>
                                        <div>
                                            <label>Kecamatan</label>
                                            <input type="text" className="form-control" placeholder={detail.kecamatan ? detail.kecamatan : ''} disabled />
                                        </div>
                                        <div>
                                            <label>Desa</label>
                                            <input type="text" className="form-control" placeholder={detail.desa ? detail.desa : ''} disabled />
                                        </div>
                                        <div>
                                            <label>RT</label>
                                            <input type="text" className="form-control" placeholder={detail.rt ? detail.rt : ''} disabled />
                                        </div>
                                        <div>
                                            <label>RW</label>
                                            <input type="text" className="form-control" placeholder={detail.rw ? detail.rw : ''} disabled />
                                        </div>
                                        <div className="mb-3">
                                            <label>TPS</label>
                                            <input type="text" className="form-control" placeholder={detail.tps ? detail.tps : ''} disabled />
                                        </div>
                                    </GridCols2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="card mb-3">
                            <div className="card-body">
                                <div>
                                    <FormTitle title={'INFORMASI TAMBAHAN'} />
                                </div>
                                <div className="mb-3">
                                    <label>Telephone</label>
                                    <input type="text" className="form-control" placeholder="Tulis Nomor Telephone" onChange={handelTelephone} required />
                                </div>
                                <div className="mb-3">
                                    <Button onClick={takePicture}  fullWidth variant="contained" startIcon={<CameraAltRounded />}>
                                        Ambil Foto
                                    </Button>
                                </div>
                                <div className="flex justify-center">
                                    { picture ? <img src={ picture } alt="" className="rounded-full h-64 w-64" /> : '' }
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <FormTitle title={'CARI RELAWAN'} />
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-5">
                                        <div className="w-10/12 me-3">
                                            <label>Cari Relawan</label>
                                            <input type="text" className="form-control" placeholder="Cari Nama Relawan" onChange={handleInputName} />
                                        </div>
                                        <div>
                                            <ButtonPrimary name={'Cari'} onClick={handleSearchRelawan} />
                                        </div>
                                    </div>

                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-600 uppercase th-color">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3" style={{ width: "5%" }}>
                                                        No
                                                    </th>
                                                    <th scope="col" className="px-4 py-3">
                                                        Nama
                                                    </th>
                                                    <th scope="col" className="px-4 py-3">
                                                        Kecamatan
                                                    </th>
                                                    <th scope="col" className="px-4 py-3">
                                                        Desa
                                                    </th>
                                                    <th scope="col" className="px-4 py-3 text-center">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    relawan.map((data) => {
                                                        return (
                                                            <tr key={data.no} className="bg-white border-b dark:border-gray-700 text-gray-600">
                                                                <td className="px-4 py-3">
                                                                    {data.no}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {data.name}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {data.kecamatan}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {data.desa}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <span onClick={() => handlePostKonstituen(data.id)} className="cursor-pointer bg-green-500 hover:bg-green-600 text-white rounded-full px-3 py-1">
                                                                        Pilih
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </GridCols2>
            </div>
        </Layouts>
    )
}

export default KonstituenFormAdd
