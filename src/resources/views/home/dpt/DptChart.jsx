import React from 'react'
import Home from '../Home'
import BarChartDpt from './BarChartDpt'
import BarChartVoting from './BarChartVoting'
import PieChartDpt from './PieChartDpt'

const DptChart = ({
    groupKecamatan, detail, voting, total, totalVoting
}) => {
    console.log(groupKecamatan);
    return (
        <Home>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <PieChartDpt total={total} data={groupKecamatan} series={detail} />
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <BarChartDpt total={total} title={'GRAFIK DPT'} data={groupKecamatan} series={detail} />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <BarChartVoting data={voting} total={totalVoting} />
                    </div>
                </div>
            </div>
        </Home>
    )
}

export default DptChart
