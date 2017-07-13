import Mock from 'mockjs';

//用户表
const LoginUsers=[
    {
        id:1,
        username:'zzh',
        password:'123456',
        logo:'后台管理',
        avatar:require('../assets/vue.jpg')
    },{
        id:2,
        username:'whh',
        password:'666666',
        logo:'后台管理',
        avatar:require('../assets/userInfo.jpg')
    }
];

//房态表
const RoomStateTable =[];

for(let i=0;i<30;i++){
    RoomStateTable.push(Mock.mock({
        ls:Mock.mock('@natural'),
        oddNum:Mock.Random.date(),
        'roomNum|1000-3000':1000,
        'roomType|1':[
            '小床房','大床房','精致阳光双床房','情侣房','标准双人间','标准单人间'
        ],
        name    : Mock.Random.cname(),
        phone: /^1[34578]\d{9}$/,
        checkInTime:Mock.Random.date(),
        operator    : Mock.Random.cname(),
        'states|1':[
            '入住','预留','预订','空房','打扫'
        ],
        xfje:Mock.Random.float(0, 10000, 0, 2),
        ysje:Mock.Random.float(0, 10000, 0, 2)
    }))
}

const OrderTable=[];
for(let i=0;i<100;i++){
    OrderTable.push(Mock.mock({
        ls:Mock.mock('@natural'),
        oddNum:Mock.Random.date(),
        'roomNum|1000-3000':1000,
        'roomType|1':[
            '小床房','大床房','精致阳光双床房','情侣房','标准双人间','标准单人间'
        ],
        name    : Mock.Random.cname(),
        phone: /^1[34578]\d{9}$/,
        checkInTime:Mock.Random.date(),
        operator    : Mock.Random.cname(),
        'states|1':[
            '入住','预留','预订','空房','打扫'
        ],
        xfje:Mock.Random.float(0, 10000, 0, 2),
        ysje:Mock.Random.float(0, 10000, 0, 2)
    }))
}

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    ls:Mock.mock('@natural'),
    oddNum:Mock.Random.date(),
    'roomNum|1000-3000':1000,
    'roomType|1':[
            '小床房','大床房','精致阳光双床房','情侣房','标准双人间','标准单人间'
        ],
    name: Mock.Random.cname(),
    phone: /^1[34578]\d{9}$/,
    operator    : Mock.Random.cname(),
    sex: Mock.Random.integer(0, 1),
    checkInTime:Mock.Random.date()
  }));
}

const PlanTable=[];

for(let i=0;i<5;i++){
    PlanTable.push(Mock.mock({
        id:Mock.Random.guid(),
        money:Mock.mock('@string("number", 3, 4)'),                                //查询的类型需要是字符串
        'giveMoney|10-100':10,
        giveScore: 100,
        'switchValue|1': true
    }));
}

export {LoginUsers,RoomStateTable,OrderTable,Users,PlanTable};