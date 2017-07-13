import axios from 'axios';

let base = '';

//登录验证
export const requestLogin = params => { 
    return axios.post(`${base}/login`, params)
        .then(res => res.data); 
    };

//获取房间状态
export const roomState =params=>{
    return axios.get(`${base}/Home/RoomState`,{
        params:params
    });
};

//获取客人订单表
export const order=params=>{
    return axios.get(`${base}/Home/Order`,{
        params:params
    });
};

export const getUserList = params => {
	return axios.get(`${base}/user/list`, {
		params: params
	});
};

export const getUserListPage = params => {
	return axios.get(`${base}/user/listpage`, {
		params: params
	});
};

//获取方案列表
export const getPlan = params =>{
    return axios.get(`${base}/Home/Member`,{
        params:params
    });
};

//新增方案
export const addPlan=params =>{
    return axios.get(`${base}/Home/Add`,{
        params:params
    });
};

//编辑方案
export const editPlan=params=>{
    return axios.get(`${base}/Home/Edit`,{
        params:params
    });
};

//删除方案
export const deletPlan=params=>{
    return axios.get(`${base}/Home/Delet`,{
        params:params
    });
};