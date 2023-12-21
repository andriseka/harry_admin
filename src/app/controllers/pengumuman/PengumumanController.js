import React from 'react'
import PengumumanForm from '../../../resources/views/pengumuman/form/PengumumanForm'
import PengumumanData from '../../../resources/views/pengumuman/data/PengumumanData'

function PengumumanController({ view }) {
    if (view === 'form') {
        return (
            <PengumumanForm />
        )
    } else if (view === 'data') {
        return (
            <PengumumanData />
        )
    }
}

export default PengumumanController
