import axios from "axios";

const instanceapi = axios.create({
    baseURL: 'https://api.maspram.id/api',
    withCredentials: true
});

instanceapi.defaults.headers.common['token_access_verified'] = '$2y$12$jzCmQWipK5ZhkqVEdrKLC.XZpuOTaxw3Vh/swXvdr6aDt3gPjnOpG';
instanceapi.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default instanceapi;