import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown.js";

drilldown(Highcharts);

const BarChartRelawan = ({ series, data, total }) => {
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'GRAFIK TOTAL DAFTAR RELAWAN'
        },
        subtitle: {
            text: '<span> Dapil 01 Jakarta Timur  </span> </br> <span> Total ' + total + ' Relawan </span>'
        },
        accessibility: {
            enabled: false
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: `Total ${total} Relawan`
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
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> Relawan<br/>'
        },
        series: [
            {
                name: 'Grafik Total Relawan',
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

export default BarChartRelawan
