export const formatDate = (date, fmt = "yyyy-MM-dd hh:mm:ss") => {

    var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), //时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds(), //毫秒
    }

    if (!date || date == null) return null;

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}
export const formatOptions = (arr) => {
    let cache = {}
    let options = []
    for (let item of arr) {
        if (cache[item.name]) {
            //有缓存
            let index = cache[item.name].index
            options[index].children.push({ value: item.type, label: item.type, stock_id: item.id })

        } else {
            //首次推入数据以及记录位置
            let index = options.push({ value: item.name, label: item.name, children: [{ value: item.type, label: item.type, stock_id: item.id }] }) - 1
            //记录缓存
            cache[item.name] = { name: item.name, index: index }

        }
    }
    return options
}

export const formatAmount = (num) => {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
//设备检测


export const userAgent = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}


