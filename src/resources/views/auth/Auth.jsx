import React, { useState } from 'react';
import banner1 from '../../../public/image/banner1.png';
import banner2 from '../../../public/image/banner2.png';
import ButtonPrimary from '../../components/button/ButtonPrimary';
import Loading from '../../components/loading/Loading';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { AccountCircle, LockPerson, Visibility, VisibilityOff } from '@mui/icons-material';

const Auth = ({ slider, onSubmit, loading, error }) => {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }


    return (
        <div className=" w-full h-screen">
            { loading ? <Loading /> : '' }
            <Toaster position="top-right" />
            <div className="w-full h-5/6 md:h-full flex justify-center items-center">
                <div className="card w-9/12 mx-auto">
                    <div className="grid grid-cols-1 grid-cols-3 gap-4">
                        <div className="md:col-span-2 col-span-3">
                            <div className="uk-position-relative uk-visible-toggle uk-light md:h-full h-52" tabIndex="-1" uk-slideshow="animation: push; autoplay: true; autoplay-interval: 3000; velocity: 0.5">
                                <ul className="uk-slideshow-items md:h-full h-52">
                                    {
                                        slider.map((data, index) => {
                                            return (
                                                <li key={index}>
                                                    <img src={data.slider} className="h-full w-full brightness-90" alt="Banner Sukses Kampanye" />
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <a className="uk-position-center-left uk-position-small uk-hidden-hover hidden" uk-slidenav-previous="true" uk-slideshow-item="previous"></a>
                                <a className="uk-position-center-right uk-position-small uk-hidden-hover hidden" uk-slidenav-next="true" uk-slideshow-item="next"></a>
                                <div className="uk-position-bottom-center uk-position-small">
                                    <ul className="uk-slideshow-nav uk-dotnav uk-flex-center"></ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 md:col-span-1">
                            <div className="card-body md:my-5 my-2">
                                <div className="mb-3 md:mb-7 hidden md:block">
                                    <span className="md:text-2xl text-xl block">Hello !</span>
                                    <span className="md:text-2xl text-xl font-bold">Selamat Pagi</span>
                                </div>
                                <div>
                                    <div className='text-center md:mb-5 mb-3'>
                                        <span className="text-lg font-semibold">Login ke aplikasi</span>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-5">
                                            {/* <label>Username</label>
                                            <input type="text" className="form-control" placeholder="Masukkan Username" {...register('username')}  required />
                                            <span className="text-xs text-red-400">{ error ? error : "" }</span> */}
                                            <TextField 
                                                size="medium"
                                                label="Username"
                                                placeholder="astrocloud"
                                                fullWidth
                                                { ...register('username') }
                                                id="username"
                                                InputProps={{
                                                    startAdornment : (
                                                        <InputAdornment position="start"> <AccountCircle /> </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            {/* <label>Password</label>
                                            <input type="password" className="form-control" placeholder="Masukkan Password" {...register('password')}  required /> */}
                                             <TextField 
                                                size="medium"
                                                label="Password"
                                                placeholder="*******"
                                                fullWidth
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                { ...register('password') }
                                                InputProps={{
                                                    startAdornment : (
                                                        <InputAdornment position="start"> <LockPerson /> </InputAdornment>
                                                    ),
                                                    endAdornment: 
                                                    <InputAdornment position="end"> 
                                                        <IconButton
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            style={{backgroundColor: 'transparent'}}
                                                        >
                                                             { showPassword ? <VisibilityOff /> : <Visibility /> }
                                                        </IconButton>
                                                    </InputAdornment>
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-center">
                                            <ButtonPrimary name={"Login"} type={"submit"} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
