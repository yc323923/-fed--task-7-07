import axios from 'axios';


export const request = axios.create({
    baseURL:"https://conduit.productionready.io"
})

//通过插件机制获取上下文对象
export default (context)=>{
    const {user} = context.store.state
    console.log(user,111)
    //请求拦截器
    //任何请求都要经过请求拦截器‘//我们可以在请求拦截器重做一些公共的业务处理，例如同意设置token
    request.interceptors.request.use(function(config){
        if(user && user.token){
            config.headers.Authorization = `Token ${user.token}`
        }
        return config;
    },function(error){
        //请求失败（请求还未发出去）
        return Promise.reject(error)
    })

    
}
