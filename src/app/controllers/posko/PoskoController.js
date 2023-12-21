import React, { useEffect, useState } from 'react'
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';
import { useDispatch } from 'react-redux';
import { getPosko, postPosko } from '../../model/posko/poskoSlice';
import toast from 'react-hot-toast';
import PoskoForm from '../../../resources/views/posko/form/PoskoForm';
import PoskoData from '../../../resources/views/posko/data/PoskoData';

// pin
import red_location from '../../../public/icons/red_icon.png'
import black_location from '../../../public/icons/black_icon.png'
import magenta_location from '../../../public/icons/magenta_icon.png'
import orange_location from '../../../public/icons/orange_icon.png'
import blue_location from '../../../public/icons/blue_icon.png'
import green_location from '../../../public/icons/green_icon.png'

function PoskoController({ view }) {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

     // take picture
     const [picture, setPicture] = useState('');
     const [upload, setUpload] = useState('');
     const [location, setLocation] = useState({
         lat: '',
         long: ''
     })
     
    const takePicture = async () => {
         try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64
            });
            var imageUrl = image.base64String;
            setUpload(imageUrl)
            setPicture('data:image/png;base64,' + imageUrl);
         } catch (error) {
             
         }
    }

    const printCurrentPosition = async () => {
        try {
             const coordinates = await Geolocation.getCurrentPosition();
             setLocation({ lat: coordinates.coords.latitude, long: coordinates.coords.longitude })
        } catch (error) {
             setLocation({lat: '', long: ''})
             alert('Silahkan aktifkan GPS Anda dan reload halaman')
        }
    };

    // get data
    const [posko, setPosko] = useState([]);
    const getDataPosko = async() => {
        try {
            const response = await dispatch(getPosko()).unwrap().catch((err) => {});
            const remapp = [
                {
                    type: 'tiledwebmap',
                    name: 'Giat Relawan',
                    provider: {
                        type: 'OpenStreetMap'
                    },
                    showInLegend: false
                }
            ]
            response.data.map((i) => (
                
                remapp.push({
                    type: 'mappoint',
                    name: i.status === 'banner' ? 'Banner' : 
                        i.status === 'posko' ? 'Posko' : 
                        i.status === 'baliho' ? 'Baliho' :
                        i.status === 'stiker' ? 'Stiker' : 
                        i.status === 'spanduk' ? 'Spanduk' :
                        i.status === 'lainnya' ? 'Lainnya' : '' ,
                    marker: {
                        symbol : i.status === 'banner' ? `url(${red_location})` : 
                                i.status === 'posko' ? `url(${green_location})` : 
                                i.status === 'baliho' ? `url(${blue_location})` :
                                i.status === 'stiker' ? `url(${orange_location})` : 
                                i.status === 'spanduk' ? `url(${magenta_location})` :
                                i.status === 'lainnya' ? `url(${black_location})` : '' ,
                        width: 30,
                        height: 30
                    },
                    data : i.posko.map((j) => ({
                        name: j.name,
                        lon : JSON.parse(j.long),
                        lat: JSON.parse(j.lat),
                        image: j.image,
                        desc : j.desc
                    }))
                })
            ))

            setPosko(remapp)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        printCurrentPosition();
        getDataPosko();
    }, []);

    const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    const onSubmit = async(data) => {
        setLoading(true);

        let blob = b64toBlob(upload, "image/png");
        let formData = new FormData();

        formData.append('image', blob);
        formData.append('desc', data.desc);
        formData.append('lat', location.lat);
        formData.append('long', location.long);
        formData.append('title', data.title);
        formData.append('status', data.status);

        try {
            const response = await dispatch(postPosko(formData)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 201) {
                    toast.success('Data berhasil ditambahkan');
                    window.location.reload();
                }
            }
        } catch (error) {
            
        }
       
    }

    if (view === 'form') {
        return (
            <PoskoForm 
                onSubmit={onSubmit}
                picture={picture}
                takePicture={takePicture}
                lat={location.lat}
                long={location.long}
                loading={loading}
            />
        )
    } else if (view === 'data') {
        return (
            <PoskoData 
                posko={posko}
            />
        )
    }
}

export default PoskoController
