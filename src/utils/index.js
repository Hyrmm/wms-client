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


