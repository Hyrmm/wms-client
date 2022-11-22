
let options = [
    {
        value: "可乐",
        label: "可乐",
        children: [
            { value: "1", label: "330ml" },
            { value: "2", label: "550ml" },
        ],
    },
    {
        value: "雪碧",
        label: "雪碧",
        children: [{ value: "1", label: "330ml" }],
    },
]


function optionsFormat(arr) {
    let cache = {}
    let options = []
    for (let item of arr) {
        if (cache[item.name]) {
            //有缓存
            let index = cache[item.name].index
            options[index].children.push({ value: item.id, label: item.type })

        } else {
            //首次推入数据以及记录位置
            let index = options.push({ value: item.name, label: item.name, children: [{ value: item.id, label: item.type }] }) - 1
            //记录缓存
            cache[item.name] = { name: item.name, index: index }

        }
    }
    return options
}