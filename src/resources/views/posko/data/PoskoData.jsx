import React from 'react'
import Posko from '../Posko'

// maps
import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import tileWebMap from 'highcharts/modules/tiledwebmap'

// icon
import pin_icon from '../../../../public/icons/location.png'


tileWebMap(Highcharts);
const PoskoData = ({ posko }) => {

    if (typeof window !== 'undefined') {
        HighchartsMap(Highcharts);
    }

    console.log(posko);

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
            center: [106.84214524143, -6.1777716474747395],
            zoom: 10
        },
        tooltip: {
            useHTML: true,
            pointFormat: "<span>{point.title}</span> <img src='{point.image}' class='w-full h-24' /> {point.desc}"
        },
        legend: {
            enabled: true,
            title: {
              text: 'Giat Relawan'
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
    
        series: posko
    }

    return (
        <Posko>
             <div>
                <HighchartsReact
                    constructorType={'mapChart'}
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </Posko>
    )
}

export default PoskoData
