import React from 'react'
import { useForm } from 'react-hook-form'
import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import tileWebMap from 'highcharts/modules/tiledwebmap'
import { Button } from '@mui/material';
import FormTitle from '../../../components/title/FormTitle';
import { CameraAltRounded } from '@mui/icons-material';
import pin_icon from '../../../../public/icons/location.png'
import Posko from '../Posko';
import { Toaster } from 'react-hot-toast';
import Loading from '../../../components/loading/Loading';

tileWebMap(Highcharts);

const PoskoForm = ({ onSubmit, takePicture, picture, lat, long, loading }) => {
    const { register, handleSubmit } = useForm();

    if (typeof window !== 'undefined') {
        HighchartsMap(Highcharts);
    }


    const options = {
        chart : {
            margin: 0
        },
        title: {
            text: ''
        },
        navigation: {
            buttonOptions: {
                align : 'left',
                theme: {
                    stroke: '#e6e6e6'
                }
            }
        },
        mapNavigation : {
            enabled: true,
            buttonOptions: {
                alignTo : 'spacingBox'
            }
        },
        mapView: {
            center: [long, lat],
            zoom: 15
        },
        tooltip: {
            pointFormat: '{point.name}'
        },
        legend: {
            enabled: true,
            title: {
              text: 'Tambah Posko'
            },
            align: 'left',
            symbolWidth: 20,
            symbolHeight: 20,
            itemStyle: {
              textOutline: '1 1 1px rgba(255,255,255)'
            },
            backgroundColor: 'rgba(255,255,255,0.8)',
            float: true,
            borderColor: '#e6e6e6',
            borderWidth: 1,
            borderRadius: 2,
            itemMarginBottom: 5
        },
        
        plotOptions: {
        mappoint: {
            dataLabels: {
            enabled: false
            }
        }
        },
    
        series: [
            {
                type: 'tiledwebmap',
                name: 'Lokasi Posko',
                provider: {
                    type: 'OpenStreetMap'
                },
                showInLegend: false
            },
            {
                type: 'mappoint',
                name: 'Lokasi Anda',
                marker: {
                    symbol : `url(${pin_icon})`,
                    width: 30,
                    height: 30
                },
                data: [
                    {
                        name: 'Lokasi Anda',
                        lon: long ,
                        lat: lat
                    },
                ]
            },
        ]
    }

    return (
        <Posko>
            <Toaster position="top-right" />
            { loading ? <Loading /> : '' }
            <div className="mb-5">
                <HighchartsReact
                    constructorType={'mapChart'}
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <FormTitle title={'Tambah Lokasi Posko'} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Judul</label>
                                        <input type="text" className="form-control" placeholder="Tulis Judul" {...register('title')} required  />
                                    </div>
                                    <div className="mb-3">
                                        <label>Status</label>
                                        <select className="form-select" {...register('status')} required>
                                            <option value="">-- Pilih Status --</option>
                                            <option value="posko">Posko</option>
                                            <option value="banner">Banner</option>
                                            <option value="stiker">Stiker</option>
                                            <option value="baliho">Baliho</option>
                                            <option value="spanduk">Spanduk</option>
                                            <option value="lainnya">Lainnya</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Keterangan</label>
                                        <textarea style={{height: '80px'}} className="form-control" {...register('desc')} placeholder="Tulis Keterangan"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <FormTitle title={'Informasi Lainnya'} />
                                    </div>
                                    <div className="mb-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label>Longitude</label>
                                                <input type="text" className="form-control" placeholder={ `${lat ? lat : ''}` } disabled={ lat !== '' ? true : false } />
                                            </div>
                                            <div>
                                                <label>Latitude</label>
                                                <input type="text" className="form-control" placeholder={ `${long ? long : ''}` } disabled={ long !== '' ? true : false } />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <Button onClick={takePicture}  fullWidth variant="contained" startIcon={<CameraAltRounded />}>
                                            Ambil Foto
                                        </Button>
                                    </div>
                                    <div className="mb-5">
                                        { picture ? <img src={ picture } alt="" className="w-full h-full rounded-md" /> : '' }
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" variant="contained" className="bg-green-500" color="success"  >
                                            Simpan Data
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </Posko>
    )
}

export default PoskoForm
