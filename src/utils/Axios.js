// 目标：二次封装axios
// 小目标：封装GET  
import axios from 'axios';
// 导入axios
// import './loading.css';

// 02 创建基础URL
let baseUrl = "http://localhost:3000";

// 03 创建axios 实例
var http = axios.create({
    baseURL:baseUrl,
    timeout:5000,
})
// http 为通过 axios 创建的一个公用配置的axios实例
// 小思考，什么事情是在ajax发起请求前需要做的 showLoading，ajax请求完毕 hideLoading
//  ajax 异步，可以同时进行，如果同时进行，咱们的加载提示会一次显示多个，如果一个20ajax请求，
//  一次只显示一个加载提示
//  有些请求，不想出现加载提示怎么办呢？
let count = 0; //记录当前的ajax个数
//  请求提示
var showLoading = ()=>{
    // 显示加载提示
    if(count === 0){
        // 创建一个div
        var dom = document.createElement("div");
        dom.setAttribute("id","loading");
        // 设置dom的id为loading，
        var img = document.createElement("img");
        // 创建图片
        img.src = "data:image/gif;base64,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";
        // 指定图片src 通过base64 把图片转为代码形式（图片非常小才行，如果比较到还是要 require（图片地址））
        dom.appendChild(img);
        // dom 插入图片
        document.body.append(dom);
        // body插入com
        var str = `        
            display: flex;
            position: absolute;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            background-color: rgba(255,255,255,.8);
           `;
        dom.style = str;
        // 外部css 变成行内的css（css 比较收，如果比较多，要单独导出css）
      
    }
    count++;
   
}
var hideLoading = ()=>{
    count --;
    if(count===0){
        // 隐藏加载提示
        let dom = document.getElementById("loading");
        document.body.removeChild(dom);
        // 隐藏动漫
       
    }
  
}
// 小目标：请求拦截
http.interceptors.request.use(
    config =>{
        // 只有当允许显示loading 才显示showloading
        if(config.showLoading){
            showLoading();
        }
        return config},
    err=>{
        hideLoading();        
        return Promise.reject(err);
    }
)
// 响应拦截
http.interceptors.response.use(
    data=>{hideLoading();return data},
    err=>{
        
        if(err.response&&err.response.status===404){
            console.error("请求地址找不到");
        }else{
            console.error("请求错误")
        }
        hideLoading();
        return Promise.reject(err);
    }
)



// 04 封装GET方法
/**
 * axios get方法
 * 
 * @param {String} url   请求地址
 * @param {String} config   请求参数  howLoading是否显示加载提示框，默认为true
 */
let get = (url,config)=>{
    return new Promise((resolve,reject)=>{
        http({
            method:"GET",
            url,
            showLoading:true,
            ...config,
          
        })
        .then(res=>{
            resolve(res);
        })
        .catch(err=>reject(err))
    })
}


// 小目标 ：jsonp （axios不支持）
/**
 * Axios jsonp方法
 * 
 * @param {String} url  请求的地址
 * @param {String} callback 回调函数名称 默认值是 'callback'
 * @return {Promise} 返回一个承诺
 */
let jsonp = (url,callback="callback",config={showLoading:true})=>{
    if(config.showLoading){
        showLoading();
    }
   
    // 默认显示提示
    return new Promise((resolve,reject)=>{
        let script = document.createElement("script");
        // 创建一个script标签
        script.src = url+"&callback="+callback;
        // 指定src
        document.body.appendChild(script);
        // 插入script标签
        window[callback] = (data)=>{
            resolve(data);
            hideLoading();
            document.body.removeChild(script);
            // 返回数据data   // 隐藏loading // 移除script         
        }
        script.onerror = ()=>{
            reject(new Error(`获取${url}失败`));
            // 拒绝理由
            document.body.removeChild(script);
            // 移除script
            hideLoading();
            // 隐藏loading
        }
    })
}


// 小目标：实现 post请求
/**
 * axios post urlencoded方式
 * 
 * @param {String} url 
 * @param {Object} config 
 */
let post = (url,config)=>{
    return new Promise((resolve,reject)=>{
        http({
            url:url,
            method:"post",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            showLoading:true,
            ...config,

        })
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}

// 05 导出axios
export default {get,jsonp,post}

