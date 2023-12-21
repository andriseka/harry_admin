import React from 'react'
import Financial from '../Financial'
import FormTitle from '../../../components/title/FormTitle'
import GridCols2 from '../../../components/grid/GridCols2'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../../../components/button/ButtonPrimary'
import Loading from '../../../components/loading/Loading'
import CurrencyInput from 'react-currency-input-field';

const FinancialForm = ({
    handleNominal, onSubmit, loading
}) => {
    const {register, handleSubmit} = useForm();
    return (
        <Financial>
            { loading ? <Loading /> : '' }
            <div>
                <div className="card max-w-xl mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <FormTitle title={'BUAT FINANCIAL'} />
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <GridCols2>
                                        <div>
                                            <label>Tanggal</label>
                                            <input type="date" className="form-control" {...register('date')} required />
                                        </div>
                                        <div>
                                            <label>Status</label>
                                            <select className="form-select" {...register('status')} required>
                                                <option value="masuk">Uang Masuk</option>
                                                <option value="keluar">Uang Keluar</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>Nama Transaksi</label>
                                            <input type="text" className="form-control" placeholder="Keterangan" {...register('name')} required />
                                        </div>
                                        <div>
                                            <label>Nominal</label>
                                            <CurrencyInput
                                                id="input-example"
                                                name="input-name"
                                                prefix='Rp. '
                                                className='form-control'
                                                placeholder="Please enter a number"
                                                defaultValue={0}
                                                decimalsLimit={2}
                                                onValueChange={(value) => handleNominal(value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label>Metode Pembayaran</label>
                                            <select className="form-select" {...register('payment_method')} required>
                                                <option value="cash">Cash</option>
                                                <option value="transfer">Transfer</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>Bukti</label>
                                            <input type="file" className="form-control px-2 py-1" accept="image/png,image/jpg,image/jpeg" {...register('bukti')} required />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label>Keterangan</label>
                                            <textarea className="form-control" placeholder="Tulis Keterangan" style={{height: '80px'}} {...register('description')} required></textarea>
                                        </div>
                                    </GridCols2>
                                </div>
                                <div className="flex justify-end">
                                    <ButtonPrimary name={"Simpan Data"} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Financial>
    )
}

export default FinancialForm
