import{d as Y,bY as V,aT as A,aV as _,a_ as s,o as R,b as k,A as d,O as o,bJ as t,u,c$ as y,d0 as w,d1 as x,N as p,bR as C}from"./index-iSRBwhZQ.js";const N="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAmCAYAAAAycj4zAAAEIElEQVR42u2bf0gTYRjHJYiKiIhiJkFkmCJBEQUR/iFRkVGRhBQVUf2ZZQoVJGFmIpUYTgspk5B+YGmUhJH9tLJSYmSbPzYtm+WvETqbyuZ22572Tu7ldtttd+ftdjfugQeO97648f34vs/zvLAYUEJSEaNYoAAJa3yo2OKXUQFkU2u2X8oBBpd1WQAJZr6UwYQyXS5QYuiGswmpQWFrNpNOHVvNKkUFwtVkKUGZCRAuRosBJSaYuSl7CgWHos08j5Mab1eVMiYfo21mgOYCJ9xPdcCN5XYoi7ODWjWdkt4hoWAIDYUOhI3pbDRUKNYRgNtrHBgAPSVdQyIJhM1/Px0MGyhN55zY/Nc5BDSpd8mny4r0DuEabKBUJP7BQN5dS5fXHBJtQFCUL5PH8RT1RxYu0qooAfJo1iKcCAQxMQlnknbA86QNUDdHBY/nx0HT5t3Q96BWuKKeWApfthVBd2EZ6LIuQHv2RegtrYIxjY5TUaeDCHdB/67NwInC5bLB8HAN6A1ZoNXtB137QfjZmw/msY/8214qkK1pufBi9UafNWp+2nsYUj5nzajtdU3Z4UfJLZ81arakFXHaRZECQhAWMBiyfdaoaewrBrfbyX0w9DE8/RBULlgBw41vwO1yeRM9NySswxpN5ukZAemrqoHuousw2fMLPN/Y+xkj71t8NNb+IVZ/11pegZMKgLpOptBAjMar0KU/AePjbZ43bm+iZ7RGavoHKrlfnVCBPF0cD9YBfzNspr9wd2Es1lk6DbyB6PNKwGmb8tMM1b/Emv57T1iB4FJDhABDBdLecQQcjlE/DUH8874jdTZbP38gnYXFMJg8EfBysaPgCtZ9y8nlDWS0+Wtgw34PYo3hklryQEymOkadyVSLdQODd/gD6Ylv9ZqPoNBvecfadFj3an0qbyCOMUtgkef4IjWoyEv9yLJajczfy/OO1HX3nOUPZCB52iz6LvH6RRBYhzqvcMwhpEZ3Mo+zWWK0vb5dlptRh4o5qUOdF28gJIhAQKha1A6HEwifAVJ8IOy0qB3mDQR1PGTQoYi5Q+QBRIQdYta0MQIRqoZECxCrtTf8NQR1UkxAhOqyogUI6qTC3mWhOcQ2ZPIDgtbqVQmCzCHRAmR6DjH7adBaR+cxYeYQNKmjqXywodHbcaGagp4bVq4VbFKPFiDkpG6xaPCkjp679MeFm9TtI6Mh77JQcVeAZADhHBf+LosOxDv6T0xCe/5leDZ3PdTOXhLwtlcBQrntNT0EveGUp73dx+u2V3WzKzgQpqKuBLc5RAEiUyAhjywFiAJEAcL3LksBIgKQunlLcUYCyNHuJpxSD63uAM6wAQl0TIkFhA4hklC2V+/0S7Ei6A92IgUjklCYzBcLSsR/QRXKdDGhhDJdDCgKEI5mhxvKfwXRebmfQ5hoAAAAAElFTkSuQmCC",E={class:"login"},h={class:"login-form"},v=Y({__name:"index",setup(D){const c=V(),l=A({username:"Admin",password:"123456",remember:!0,code:"phfp"}),n=_(!1),g=A({username:[{required:!0,message:"请输入用户名"}],password:[{required:!0,message:"请输入密码"}],remember:[{required:!1}],code:[{required:!0,message:"请输入验证码"}]});function B(){l.username=="Admin"&&l.password=="123456"&&l.code=="phfp"&&(n.value=!0,setTimeout(()=>{n.value=!1,localStorage.setItem("token","test-token"),c.replace("/home")},1e3))}return(J,e)=>{const m=s("el-input"),r=s("el-form-item"),i=s("el-col"),Q=s("el-row"),b=s("el-checkbox"),f=s("el-button"),U=s("el-form");return R(),k("div",E,[d("div",h,[e[8]||(e[8]=d("h2",{class:"title"},"Ep-Admin",-1)),o(U,{model:l,rules:g},{default:t(()=>[o(r,{prop:"username"},{default:t(()=>[o(m,{modelValue:l.username,"onUpdate:modelValue":e[0]||(e[0]=a=>l.username=a),"prefix-icon":u(y),placeholder:"账号",size:"large"},null,8,["modelValue","prefix-icon"])]),_:1}),o(r,{prop:"password"},{default:t(()=>[o(m,{modelValue:l.password,"onUpdate:modelValue":e[1]||(e[1]=a=>l.password=a),"prefix-icon":u(w),placeholder:"密码",size:"large"},null,8,["modelValue","prefix-icon"])]),_:1}),o(r,{prop:"code",class:"code-item"},{default:t(()=>[o(Q,{gutter:12},{default:t(()=>[o(i,{span:17},{default:t(()=>[o(m,{modelValue:l.code,"onUpdate:modelValue":e[2]||(e[2]=a=>l.code=a),"prefix-icon":u(x),placeholder:"验证码",size:"large"},null,8,["modelValue","prefix-icon"])]),_:1}),o(i,{span:7},{default:t(()=>e[4]||(e[4]=[d("img",{src:N,class:"code-img"},null,-1)])),_:1})]),_:1})]),_:1}),o(r,{prop:"remember",class:"reme-item"},{default:t(()=>[o(b,{modelValue:l.remember,"onUpdate:modelValue":e[3]||(e[3]=a=>l.remember=a)},{default:t(()=>e[5]||(e[5]=[p("记住我")])),_:1},8,["modelValue"]),o(f,{type:"primary",link:""},{default:t(()=>e[6]||(e[6]=[p("忘记密码?")])),_:1})]),_:1}),o(r,null,{default:t(()=>[o(f,{type:"primary",loading:n.value,style:{width:"100%"},size:"large",onClick:B},{default:t(()=>e[7]||(e[7]=[p(" 登录 ")])),_:1},8,["loading"])]),_:1})]),_:1},8,["model","rules"])]),e[9]||(e[9]=d("div",{class:"copyright-wrap"},[d("p",{class:"en"},"copyright@2023 ep-admin All Rights Reserved"),d("p",{class:"cn"},"ep-admin 版权所有")],-1))])}}}),Z=C(v,[["__scopeId","data-v-b00818e0"]]);export{Z as default};
