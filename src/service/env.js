const env = {
    theme: '1', //主题配色 1：blue
}
if (process.env.VUE_APP_ENV === 'production') {
    env.BASEURL = 'https://api.jiankangyouyi.com';
    env.BASEURLHAIXIN = 'https://api.jiankangyouyi.com';

} else {
    env.BASEURL = 'https://api.hbox2.jiankangyouyi.com';
    env.BASEURLHAIXIN = 'https://api.jiankangyouyi.com';
}
export {
    env
}