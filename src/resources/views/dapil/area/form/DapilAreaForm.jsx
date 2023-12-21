import React from 'react'
import DapilArea from '../DapilArea'
import FormTitle from '../../../../components/title/FormTitle'
import Select from 'react-select'
import ButtonPrimary from '../../../../components/button/ButtonPrimary'
import ButtonDanger from '../../../../components/button/ButtonDanger'
import { useForm } from 'react-hook-form'
import Loading from '../../../../components/loading/Loading'

const DapilAreaForm = ({
    kecamatan, desa, handleKecamatan, handleLock, handleUnlock, lock, onSubmit, loading
}) => {
    const{register, handleSubmit, reset} = useForm();

    return (
        <DapilArea>
            <div>
                { loading ? <Loading /> : '' }
                <div className="card max-w-2xl mx-auto">
                    <div className="card-body">
                        <FormTitle title={'BUAT DAPIL'} />
                        <div className="flex justify-between items-end mb-5">
                            <div className="w-10/12 me-3">
                                <label>Kecamatan</label>
                                <Select 
                                    placeholder={'Kecamatan'}
                                    isDisabled={lock}
                                    options={kecamatan}
                                    onChange={handleKecamatan}
                                />
                            </div>
                            <div>
                                {
                                    lock ?  <ButtonDanger name={'Unlock'} onClick={() => handleUnlock(reset())}  />  :
                                    <ButtonPrimary name={'Lock'} onClick={handleLock}  /> 
                                }
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-gray-600 uppercase th-color">
                                            <tr>
                                                <th scope="col" className="px-6 py-3" style={{width:"5%"}}>
                                                    No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Desa
                                                </th>
                                                <th scope="col" className="px-6 py-3" style={{width:"25%"}}>
                                                    Jumlah TPS
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                desa.map((data, index) => {
                                                    return(
                                                        <tr key={index} className="bg-white border-b dark:border-gray-700 text-gray-600">
                                                            <td className="px-4 py-4">
                                                                {index+1}
                                                            </td>
                                                            <td className="px-4 py-4">
                                                                {data.name}
                                                                <input type="hidden" value={data.id}  {...register(`desa_id.${index}`)} />
                                                                <input type="hidden" value={data.name}  {...register(`desa.${index}`)} />
                                                            </td>
                                                            <td className="px-4 py-4">
                                                                <input type="number" min={1} className="form-control" placeholder="Jumlah TPS" required {...register(`jml_tps.${index}`)}  />
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-end">
                                    {
                                        lock ? <ButtonPrimary name={'Simpan Data'} /> : ''
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DapilArea>
    )
}

export default DapilAreaForm
