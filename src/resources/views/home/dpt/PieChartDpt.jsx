import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import variablePie from 'highcharts/modules/variable-pie'

variablePie(Highcharts)

const PieChartDpt = ({ series, data, total }) => {

    const options = {
        chart: {
            type: 'variablepie'
        },
        title: {
            text: 'GRAFIK TOTAL DAFTAR PEMILIH TETAP'
        },
        subtitle: {
            text: '<span> Dapil 01 Jakarta Timur  </span> </br> <span> Total ' + total + ' DPT </span>'
        },
        accessibility: {
            enabled: false
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: `Total ${total} DPT`
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> DPT<br/>'
        },
        series: [
            {
                name: 'Grafik Total DPT',
                colorByPoint: true,
                colors: [
                    '#c0ca33',
                    '#00897b',  
                    '#ffb300',
                ],
                data: data,
            }
        ],
        drilldown: {
            breadcrumbs: {
                position: {
                    align: 'right'
                }
            },
            series: series,
        }
    }
    return (
        <HighchartsReact 
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default PieChartDpt
