export default function fetchs (opt, type = 'json', time = '120000') { // 接收json格式， 120s后超时
  return new Promise((resolve, reject) => {
    let timer = setTimeout(()=> {
      console.log('fetch timeout');
      clearTimeout(timer);
      timer = null;
    }, time);
    let options = { credentials: 'include' }; // 发送cookie
    Object.assign(options, opt);
    let url = options.url;
    if(url) {
      fetch(url, options).then((res) => {
        if(res.ok) {
          switch(type) {
            case 'text': return res.text();
            case 'json': 
            default: return res.json();
          }
        }
      }).then((res) => {
        clearTimeout(timer);
        timer = null;
        resolve(res);
      }).catch((e) => {
        console.log(e);
      });
    }else {
      console.log('url is undefined');
    }
  });
}