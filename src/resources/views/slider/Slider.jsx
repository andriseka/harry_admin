import React from 'react'
import Layouts from '../layouts/Layouts'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../../components/button/ButtonPrimary';
import Loading from '../../components/loading/Loading';

const Slider = ({
    slider, onSubmit, onDelete, loading
}) => {
    const {register, handleSubmit} = useForm();
    return (
        <Layouts>
            { loading ? <Loading /> : '' }
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-600">BUAT SLIDER LOGIN</h1>                
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label>Slider ( 600 x 400 px )</label>
                                    <input type="file" className="form-control px-3 py-1" accept="image/png, image/jpg, image/jpeg" {...register('slider')} required />
                                </div>
                                <div className="flex justify-end">
                                    <ButtonPrimary name={'Simpan'} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {
                            slider.map((data) => {
                                return (
                                    <div key={data.id} className="card">
                                        <img src={data.slider} alt="" />
                                        <div className="card-body">
                                            <div className="text-center">
                                                <span onClick={() => onDelete(data.id)} className="text-red-500 hover:text-red-600 cursor-pointer">
                                                    Hapus
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layouts>
    )
}

export default Slider
