import React from 'react'
import GradeA from '../../../resources/views/organisasi/relawan/grade/GradeA'
import GradeB from '../../../resources/views/organisasi/relawan/grade/GradeB'
import GradeC from '../../../resources/views/organisasi/relawan/grade/GradeC'
import GradeD from '../../../resources/views/organisasi/relawan/grade/GradeD'

function RelawanGradeController({ view }) {
    if (view === 'a') {
        return (
            <GradeA />
        )
    } else if (view === 'b') {
        return (
            <GradeB />
        )
    } else if (view === 'c') {
        return (
            <GradeC />
        )
    } else if (view === 'd') {
        return (
            <GradeD />
        )
    }
}

export default RelawanGradeController
