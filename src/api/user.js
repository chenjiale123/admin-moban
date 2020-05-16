import request from '../utils/request';

export const login = (data) => {
    return request({
        url: '/api/login/login' ,
        method: 'post',
       data
    });
};

export const getCode = () => {
    return request({
        url: '/api/login/getRandcode' ,
        method: 'get',
        responseType: "arraybuffer"
    });
};