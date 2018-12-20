import axios from 'axios'


axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = 'bearer '+ localStorage.getItem('currentUser_token');
axios.defaults.baseURL = '/api';

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit('users/clearUser');
                    router.replace({
                        path: '/',
                        query: {redirect: router.currentRoute.fullPath}
                    });
                    break;
                case 403:
                    // 403 无权限，跳转到首页
                    router.replace({
                        path: '/base/welcome',
                        query: {redirect: router.currentRoute.fullPath}
                    });
                    break;
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        /*return Promise.reject(error.response.data)*/
        return Promise.reject('');
    });

export default axios;