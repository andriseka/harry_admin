import React, { useState } from 'react'
import Layouts from '../../../../layouts/Layouts'
import FormTitle from '../../../../../components/title/FormTitle'
import ButtonPrimary from '../../../../../components/button/ButtonPrimary'
import { useDispatch } from 'react-redux'
import { getExceptUsernameRelawan, moveRelawan } from '../../../../../../app/model/relawan/relawanSlice'
import { useParams } from 'react-router-dom'
import Loading from '../../../../../components/loading/Loading'
import GridCols2 from '../../../../../components/grid/GridCols2'

const RelawanMoveData = ({ detail, relawan_username }) => {
    const dispatch = useDispatch();
    const [inputName, setInputName] = useState({
        name: ''
    })

    const { username } = useParams();
    const [relawan, setRelawan] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputName = (e) => {
        setInputName({
            name: e.target.value
        })
    }

    const handleSearchRelawan = async () => {
        try {
            const data = {
                username: relawan_username,
                name: inputName.name,
                page: 1
            }
            const response = await dispatch(getExceptUsernameRelawan(data)).unwrap().catch((err) => { });
            setRelawan(response.data);
        } catch (error) {

        }
    }

    const handleMoveData = async (relawan_new_id) => {
        setLoading(true);
        const data = {
            relawan_username: relawan_username,
            new_relawan_id: relawan_new_id
        }
        try {
            const response = await dispatch(moveRelawan(data)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 200) {
                    return window.location.href = `/${username}/organisasi/relawan/data`;
                }
            }
        } catch (error) {
            
        }
    }

    const handleBack = () => {
        return window.location.href = `/${username}/organisasi/relawan/data`;
    }

    return (
        <Layouts>
            { loading ? <Loading /> : '' }
            <div>
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <FormTitle title={'PINDAH RELAWAN'} /> 
                    </div>
                    <div>
                        <span onClick={handleBack} className="text-orange-500 hover:text-orange-600 cursor-pointer">Kembali</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <FormTitle title={'PERSONAL DATA RELAWAN'} />
                                </div>
                                <div>
                                    <div className="mb-3">
                                        <label>Nama Lengkap</label>
                                        <input type="text" className="form-control" placeholder={detail.name ? detail.name : ''} disabled />
                                    </div>
                                    <GridCols2>
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
                                    </GridCols2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <FormTitle title={'CARI DATA RELAWAN'} />
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
                                                                    <span onClick={() => handleMoveData(data.id)} className="cursor-pointer bg-green-500 hover:bg-green-600 text-white rounded-full px-3 py-1">
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
                </div>
            </div>
        </Layouts>
    )
}

export default RelawanMoveData
