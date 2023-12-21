import React from 'react'
import Absensi from '../../../resources/views/absensi/Absensi'
import AbsesnsiData from '../../../resources/views/absensi/data/AbsesnsiData'
import AbsesnsiForm from '../../../resources/views/absensi/form/AbsesnsiForm'

function AbsensiController({ view }) {
    if (view === 'data') {
        return (
            <AbsesnsiData />
        )
    } else if (view === 'form') {
        return (
            <AbsesnsiForm />
        )
    }
}

export default AbsensiController
