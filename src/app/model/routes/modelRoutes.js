import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import provinsiReducer from "../wilayah/provinsiSlice";
import kabupatenReducer from "../wilayah/kabupatenSlice";
import calegReducer from "../caleg/calegSlice";
import kecamatanReducer from "../wilayah/kecamatanSlice";
import desaReducer from "../wilayah/desaSlice";
import dapilReducer from "../dapil/dapilSlice";
import tpsReducer from "../tps/tpsSlice";
import votingBlockRecuder from "../dapil/votingBlockSlice";
import floatingBlockReducer from "../dapil/floatingBlockSlice";
import dptReducer from "../dpt/dptSlice";
import timsesReducer from "../timses/timsesSlice";
import programReducer from "../program/programSlice";
import financialReducer from "../financial/financialSlice";
import relawanReducer from "../relawan/relawanSlice";
import konstituenReducer from "../konstituen/konstituenSlice";
import dptChartReducer from "../chart/dpt/dptChartSlice";
import konstituenChartReducer from "../chart/konstituen/konstituenChartSlice";
import relawanChartReducer from "../chart/relawan/relawanChartSlice";
import votingBlockChartReducer from "../chart/dpt/votingBlockChartSlice";
import sliderReducer from "../slider/sliderSlice";
import pengumumanReducer from "../pengumuman/pengumumanSlice";
import poskoReducer from "../posko/poskoSlice";
import serviceReducer from "../service/serviceSlice";

const modelRoutes = combineReducers({
    auth : authReducer,
    provinsi: provinsiReducer,
    kabupaten : kabupatenReducer,
    kecamatan: kecamatanReducer,
    desa : desaReducer,
    caleg: calegReducer,
    dapil: dapilReducer,
    tps: tpsReducer,
    vb: votingBlockRecuder,
    fb: floatingBlockReducer,
    dpt: dptReducer,
    timses: timsesReducer,
    program : programReducer,
    financial : financialReducer,
    relawan : relawanReducer,
    konstituen: konstituenReducer,
    dpt_chart: dptChartReducer,
    konstituen_chart : konstituenChartReducer,
    relawan_chart : relawanChartReducer,
    voting_chart : votingBlockChartReducer,
    slider : sliderReducer,
    pengumuman: pengumumanReducer,
    posko : poskoReducer,
    service : serviceReducer
});

export default modelRoutes;