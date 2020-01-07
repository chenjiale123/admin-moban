import request from '../utils/request';

export const login = (ph,pwd) => {
    return request({
        url: '/api/QianYi/login?loginPhone='+ph+'&loginPwd='+pwd ,
        method: 'post',
       
    });
};