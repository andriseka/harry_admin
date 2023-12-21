import React from 'react';
import Home from '../Home'
import BarChartRelawan from './BarChartRelawan';

const RelawanChart = ({
    groupKecamatan, detail, total
}) => {
    return (
        <Home>
            <div>
                <div className="card">
                    <div className="card-body">
                        <BarChartRelawan total={total} title={'GRAFIK RELAWAN'} data={groupKecamatan} series={detail} />
                    </div>
                </div>
            </div>
        </Home>
    )
}

export default RelawanChart
