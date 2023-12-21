import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Verification = (props) => {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const provinsi = JSON.parse(localStorage.getItem('provinsi'));
    const caleg = JSON.parse(localStorage.getItem('caleg'));

    const { username } = useParams();

    const [verified, setVerified] = useState(false);

    const checkUserData = () => {
        if (! user_data || user_data === null) {
            return window.location.href = '/';
        } else {
            if (user_data.username === username && user_data.posisi === 'admin') {
                setVerified(true);
            } else {
                return window.location.href = '/';
            }
        }
    }

    const checkProvinsiData = () => {
        if (! provinsi || provinsi === null) {
            setVerified(false);
            return window.location.href = '/';
        } else {
            setVerified(true);
        }
    }

    const checkCalegData = () => {
        if (! caleg || caleg === null) {
            setVerified(false);
            return window.location.href = '/';
        } else {
            setVerified(true);
        }
    }

    useEffect(() => {
        checkUserData();
        checkProvinsiData();
        checkCalegData();
    }, [verified]);

    return (
        <React.Fragment>
            { verified ? props.children : '' }
        </React.Fragment>
    )
}

export default Verification
