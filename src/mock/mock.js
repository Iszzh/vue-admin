import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers,RoomStateTable,OrderTable,Users,PlanTable} from './users';
let _RoomStateTable=RoomStateTable;
let _OrderTable=OrderTable;
let _Users=Users;
let _PlanTable=PlanTable;

//引入mockjs，在添加事件的时候，可以添加一些随机数据==>对应下面的方案添加id
import Mock from 'mockjs';


export default{
    mock(){
    
        let mock =new MockAdapter(axios);
    
        mock.onGet('/success').reply(200, {
        msg: 'success'
        });
        // mock error request
        mock.onGet('/error').reply(500, {
        msg: 'failure'
        });
    
        //登录
        mock.onPost('/login').reply(config=>{
            let {username,password}=JSON.parse(config.data);
            return new Promise((resolve,reject)=>{
                let users =null;
                setTimeout(()=>{
                    let hasUser=LoginUsers.some(u=>{
                        if(u.username===username && u.password===password){                     //检查登录账号和密码
                            users=JSON.parse(JSON.stringify(u));
                            users.password=undefined;
                            return true;
                        }
                    });
                    if (hasUser) {
                        resolve([200, { code: 200, msg: '请求成功', users }]);
                    } else {
                        resolve([200, { code: 500, msg: '账号或密码错误' }]);
                    }
                },1000);
            })
        })

        //房态图
        mock.onGet('/Home/RoomState').reply(config=>{
            let{roomstates}=config.params;
            let mockRoomstates=_RoomStateTable.filter(u=>{                                      //console.log(roomstates)
                if(roomstates&&u.roomType.indexOf(roomstates)==-1)return false;                 //根据房间状态进行搜索
                return true;
            });
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve([200,{
                        tableData:mockRoomstates
                    }]);
                },1000);
            })
        })

        //方案列表
        mock.onGet('/Home/Member').reply(config=>{
            let {money}=config.params;
            let mockPlanTable=_PlanTable.filter(u=>{
                //console.log(u.money.indexOf)   u.money需要是字符串类型
                if(money&&u.money.indexOf(money)==-1)return false;
                return true;
            });
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve([200,{
                        tableData:mockPlanTable
                    }]);
                },1000);
            })
        })

        //增加方案
        mock.onGet('/Home/Add').reply(config=>{
            let { money,giveMoney,giveScore,rechargeValue}=config.params;
            _PlanTable.push({
                //页面添加方案时，没有id进行添加，下面的id通过mock随机获取，删除单个数据的时候，会根据id进行删除==>对应顶上的mockjs
                id:Mock.Random.guid(),
                money:money,
                giveMoney:giveMoney,
                giveScore:giveScore,
                switchValue:rechargeValue
            });
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve([200,{
                        code:200,
                        msg:'新增成功'
                    }]);
                },500);
            })
        })

        //编辑方案
        mock.onGet('Home/Edit').reply(config=>{
            let {id,money,giveMoney,giveScore,switchValue}=config.params;
            _PlanTable.some(u=>{
                if(u.id===id){
                    u.money=money;
                    u.giveMoney=giveMoney;
                    u.giveScore=giveScore;
                    u.switchValue=switchValue;
                    return true;
                }
            });
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve([200,{
                        code:200,
                        msg:'修改成功'
                    }]);
                },500);
            });
        })

        //删除方案
        mock.onGet('Home/Delet').reply(config=>{
            let {id}=config.params;
            _PlanTable=_PlanTable.filter(u=>u.id!==id);
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve([200,{
                        code:200,
                        msg:'删除成功'
                    }]);
                },500);
            })
        })

        //获取用户列表（分页）
        mock.onGet('/user/listpage').reply(config => {
            let {page,name} = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name)== -1) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                resolve([200, {
                    total: total,
                    users: mockUsers
                }]);
                }, 1000);
            });
        });

    }
}