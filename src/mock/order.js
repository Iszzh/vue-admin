import Mock from 'mockjs';

export default Mock.mock('/order', {
    'tableData|30-50':[{
        'ls':Mock.mock('@natural'),
        'oddNum':'@date("yyyy yy y MM M dd d")',
        'roomNum|1000-3000':1000,
        'roomType|1':[
            '小床房','大床房','精致阳光双床房','情侣房','标准双人间','标准单人间'
        ],
        'name'    : '@cname',
        'phone': /^1[34578]\d{9}$/,
        'checkInTime':'@date',
        'operator'    : '@cname',
        'states|1':[
            '入住','预留','预订','空房','打扫'
        ],
        'xfje':'@float(0, 10000, 0, 2)',
        'ysje':'@float(0, 10000, 0, 2)'
    }],
     "options": [{
          "value": "选项1",
          "floor": "全部"
        }, {
          "value": "选项2",
          "floor": "一楼"
        }, {
          "value": "选项3",
          "floor": "二楼"
        }, {
          "value": "选项4",
          "floor": "三楼"
        }, {
          "value": "选项5",
          "floor": "四楼"
        }],
    "houseOptions":[{
          "houseValue": "选项1",
          "house": "全部"
        }, {
          "houseValue": "选项2",
          "house": "精致阳光大房床"
        }, {
          "houseValue": "选项3",
          "house": "大床房"
        }, {
          "houseValue": "选项4",
          "house": "小床房"
        }, {
          "houseValue": "选项5",
          "house": "情侣房"
        },{
          "houseValue":"选项6",
          "house":"标准双人间"
        },{
          "houseValue":"选项7",
          "house":"标准单人间"
        }],
    "payOptions": [{
          "value": "选项1",
          "payTypes": "现金"
        }, {
          "payValue": "选项2",
          "payTypes": "银行卡"
        }, {
          "payValue": "选项3",
          "payTypes": "网上支付"
        }, {
          "payValue": "选项4",
          "payTypes": "微信支付"
        }, {
          "payValue": "选项5",
          "payTypes": "支付宝支付"
        }],
        "typeOptions": [{
        "typeOptionsValue": "选项一",
        "types": "全部"
    }, {
        "typeOptionsValue": "选项二",
        "types": "在住客人"
    }, {
        "typeOptionsValue": "选项三",
        "types": "今日预离"
    }, {
        "typeOptionsValue": "选项四",
        "types": "已退房"
    }, {
        "typeOptionsValue": "选项五",
        "types": "房租催缴"
    }, {
        "typeOptionsValue": "选项六",
        "types": "挂单客人"
    }, {
        "typeOptionsValue": "选项七",
        "types": "撤单客人"
    }, {
        "typeOptionsValue": "选项八",
        "types": "预订客人"
    }],
    "houseOptions": [{
        "value": "选项1",
        "house": "全部"
    }, {
        "value": "选项2",
        "house": "精致阳光大房床"
    }, {
        "value": "选项3",
        "house": "大床房"
    }, {
        "value": "选项4",
        "house": "小床房"
    }, {
        "value": "选项5",
        "house": "情侣房"
    }, {
        "value": "选项6",
        "house": "标准双人间"
    }, {
        "value": "选项7",
        "house": "标准单人间"
    }]
    
});