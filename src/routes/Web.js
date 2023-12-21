import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthController from '../app/controllers/auth/AuthController'
import CheckAccessController from '../app/controllers/auth/CheckAccessController'
import CalegController from '../app/controllers/caleg/CalegController'
import DapilAreaController from '../app/controllers/dapil/DapilAreaController'
import DapilVotingController from '../app/controllers/dapil/DapilVotingController'
import DapilFloaBlockController from '../app/controllers/dapil/DapilFloaBlockController'
import DptController from '../app/controllers/dpt/DptController'
import TimsesController from '../app/controllers/organisasi/TimsesController'
import TimsesDetailController from '../app/controllers/organisasi/TimsesDetailController'
import RelawanController from '../app/controllers/organisasi/RelawanController'
import ProgramController from '../app/controllers/program/ProgramController'
import ProgramValidasiController from '../app/controllers/program/ProgramValidasiController'
import FinancialController from '../app/controllers/financial/FinancialController'
import RelawanGradeController from '../app/controllers/organisasi/RelawanGradeController'
import RelawanMoveDataController from '../app/controllers/organisasi/RelawanMoveDataController'
import KonstituenController from '../app/controllers/konstituen/KonstituenController'
import KonstituenAddController from '../app/controllers/konstituen/KonstituenAddController'
import KonstituenChartController from '../app/controllers/home/konstituen/KonstituenChartController'
import PorgramHomeController from '../app/controllers/home/program/PorgramHomeController'
import DptChartController from '../app/controllers/home/dpt/DptChartController'
import RelawanChartController from '../app/controllers/home/relawan/RelawanChartController'
import JadwalKampanyeController from '../app/controllers/home/jadwal/JadwalKampanyeController'
import SliderController from '../app/controllers/slider/SliderController'
import AbsensiController from '../app/controllers/absensi/AbsensiController'
import PengumumanController from '../app/controllers/pengumuman/PengumumanController'
import PoskoController from '../app/controllers/posko/PoskoController'
import KonstituenDataDetail from '../resources/views/organisasi/konstituen/data/KonstituenDataDetail'
import ImportController from '../app/controllers/import/ImportController'
import ServiceController from '../app/controllers/services/ServiceController'
import ServiceFormController from '../app/controllers/services/ServiceFormController'

function Web() {
    return (
        <Routes>
            <Route path='/' element={ <AuthController /> } />
            <Route path='/:username' element={ <CheckAccessController /> } />
            <Route path='/:username'>
                <Route path='home'>
                    <Route path='program' element={ <PorgramHomeController /> } />
                    <Route path='konstituen' element={ <KonstituenChartController /> } />
                    <Route path='dpt' element={ <DptChartController /> } />
                    <Route path='relawan' element={ <RelawanChartController /> } />
                    <Route path='jadwal' element={ <JadwalKampanyeController /> } />
                </Route>
                <Route path='caleg'>
                    <Route path='form' element={ <CalegController view={'form'} /> } />
                    <Route path='data' element={ <CalegController view={'data'} /> } />
                </Route>
                <Route path='dapil'>
                    <Route path='area'>
                        <Route path='form' element={ <DapilAreaController view={'form'} /> } />
                        <Route path='data' element={ <DapilAreaController view={'data'} /> } />
                    </Route>
                    <Route path='voting-block'>
                        <Route path='form' element={ <DapilVotingController view={'form'} /> } />
                        <Route path='data' element={ <DapilVotingController view={'data'} /> } />
                    </Route>
                    <Route path='floating-block' element={ <DapilFloaBlockController /> } />
                </Route>
                <Route path='dpt'>
                    <Route path='form' element={ <DptController view={'form'} /> } />
                    <Route path='data' element={ <DptController view={'data'} /> } />
                </Route>
                <Route path='organisasi'>
                    <Route path='timses'>
                        <Route path='form' element={ <TimsesController view={'form'} /> } />
                        <Route path='data' element={ <TimsesController view={'data'} /> } />
                        <Route path='data/:timses' element={ <TimsesDetailController /> } />
                    </Route>
                    <Route path='relawan'>
                        <Route path='form' element={ <RelawanController view={'form'} /> } />
                        <Route path='form/:dpt_id' element={ <RelawanController view={'form-detail'} /> } />
                        <Route path='data' element={ <RelawanController view={'data'} /> } />
                        <Route path='data/:relawan_username_detail' element={ <RelawanController view={'detail'} /> } />                        
                        {/* move data */}
                        <Route path='move/:relawan_username' element={ <RelawanMoveDataController /> } />

                        {/* grade */}
                        <Route path='grade'>
                            <Route path='a' element={ <RelawanGradeController view={'a'} /> } />
                            <Route path='b' element={ <RelawanGradeController view={'b'} /> } />
                            <Route path='c' element={ <RelawanGradeController view={'c'} /> } />
                            <Route path='d' element={ <RelawanGradeController view={'d'} /> } />
                        </Route>
                    </Route>
                    <Route path='konstituen'>
                        <Route path='form' element={ <KonstituenController view={'form'} /> } />
                        <Route path='form/:dpt_kons_id' element={ <KonstituenAddController /> } />
                        <Route path='data' element={ <KonstituenController view={'data'} /> } />
                        <Route path='data/:code_konstituen' element={ <KonstituenDataDetail /> } />
                    </Route>
                </Route>
                <Route path='program'>
                    <Route path='form' element={ <ProgramController view={'form'} /> } />
                    <Route path='data' element={ <ProgramController view={'data'} /> } />
                    <Route path='data/:program_code' element={ <ProgramController view={'validasi'} /> } />
                    <Route path='validasi' element={ <ProgramValidasiController /> } />
                    <Route path='validasi/:validasi_code' element={ <ProgramController view={'detail'} /> } />
                </Route>

                <Route path='service'>
                    <Route path='data' element={ <ServiceController view={'data'} /> } />
                    <Route path='data/:id' element={ <ServiceController view={'detail'} /> } />

                    <Route path='form' element={ <ServiceController view={'form'} /> } />
                    <Route path='form/:dpt_id' element={ <ServiceFormController /> } />
                </Route>

                <Route path='posko'>
                    <Route path='form' element={ <PoskoController view={'form'} /> } />
                    <Route path='data' element={ <PoskoController view={'data'} /> } />
                </Route>
                <Route path='financial'>
                    <Route path='form' element={ <FinancialController view={'form'} /> } />
                    <Route path='data' element={ <FinancialController view={'data'} /> } />
                    <Route path='data/:financial_code' element={ <FinancialController view={'detail'} /> } />
                </Route>
                <Route path='slider' element={ <SliderController /> } />
                <Route path='absensi'>
                    <Route path='form' element={ <AbsensiController view={'form'} /> } />
                    <Route path='data' element={ <AbsensiController view={'data'} /> } />
                </Route>
                <Route path='pengumuman'>
                    <Route path='form' element={ <PengumumanController view={'form'} /> } />
                    <Route path='data' element={ <PengumumanController view={'data'} /> } />
                </Route>
                
                <Route path='import' element={ <ImportController /> } />
            </Route>
        </Routes>
    )
}

export default Web
