<template>
    <div class="overflow">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>房态图</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <div class="searchBox">
                <el-form :inline="true" :model="filters">
                    <strong>楼层：</strong>
                    <!-- 楼层选择框 -->
                    <el-form-item>
                        <el-select v-model="value" class="selectFloor" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.floor"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <strong>房型：</strong>
                    <!-- 房型选择框 -->
                    <el-form-item>
                        <el-select v-model="houseValue" class="selectRoom" placeholder="请选择">
                            <el-option
                            v-for="item in houseOptions"
                            :key="item.houseValue"
                            :label="item.house"
                            :value="item.houseValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 搜索框 -->
                    <el-form-item>
                        <el-input
                        class="searchInput"
                        placeholder="输入房间号、房间状态进行搜索"
                        v-model="filters.roomstates">
                        </el-input>
                    </el-form-item>
                    <!-- 搜索按钮 -->
                    <el-form-item>
                        <el-button type="primary" icon="search" @click="fetchData">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
        <!-- 循环房态图，v-loading、element-loading-text是“加载”，:class="item.class"是通过循环数据表里的字段绑定不同class的背景颜色 -->
        <el-card v-loading.fullscreen.lock="loading" element-loading-text="加载中" v-for="(item,index) in tableData" class="box-card" :key="index" 
            :class="item.states=='空房'?'bg-kf':''
                ||item.states=='打扫'?'bg-ds':''
                ||item.states=='入住'?'bg-rz':''
                ||item.states=='预订'?'bg-yd':''
                ||item.states=='预留'?'bg-yl':''" >
            <!-- @contextmenu是右键点击事件，prevent是阻止默认行为 -->
            <div class="text item" @click="dialog(item)" @contextmenu.prevent="rightClick(index)">
                <span class="roomIndex">{{ item.roomNum }}</span>             
                <div class="tableData"><span class="roomIndex">{{ item.states }}</span><span>{{ item.states=="空房"||item.states=="打扫"?'':item.name }}</span></div>
                <div class="tableData"><span>{{ item.roomType }}</span></div>
            </div>


            <!-- 状态为“入住”时，打开以下弹窗 -->
            <el-dialog :title="tableData.states" :visible.sync="checkOut">
                <!-- 表单域由from-item组件构成 -->
                <el-form >
                    <el-form-item class="floatLeft" label="入住房型：" :label-width="formLabelWidth">
                        <el-input class="housestates" v-model="tableData.roomType" :disabled="true" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="floatLeft" label="入住房号：" :label-width="formLabelWidth">
                        <el-input class="housestates" v-model="tableData.roomNum" :disabled="true" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="floatLeft" label="客人姓名：" :label-width="formLabelWidth">
                        <el-input class="housestates" v-model="tableData.name" :disabled="true" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="floatLeft" label="入住时间：" :label-width="formLabelWidth">
                        <el-input class="housestates" v-model="tableData.checkInTime" :disabled="true" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-table
                        v-loading="loading" 
                        element-loading-text="拼命加载中"
                        :data="tableData1"
                        height="250"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="ls"
                        label="入住流水号"
                        width="120px">
                        </el-table-column>
                        <el-table-column
                        prop="oddNum"
                        label="单号"
                        width="100px">
                        </el-table-column>
                        <el-table-column
                        prop="roomNum"
                        label="房号">
                        </el-table-column>
                        <el-table-column
                        prop="roomType"
                        label="房型">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名">
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="电话">
                        </el-table-column>
                        <el-table-column
                        prop="checkInTime"
                        label="入住时间">
                        </el-table-column>
                        <el-table-column
                        prop="operator"
                        label="操作员">
                        </el-table-column>
                    </el-table>
                    <el-form-item class="money" label="消费金额：" :label-width="formLabelWidth">
                        <el-input class="moneyInput" v-model="tableData.xfje" :disabled="true" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="money" label="已收金额：" :label-width="formLabelWidth">
                        <el-input class="moneyInput" v-model="tableData.ysje" :disabled="true" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="money" label="本次应收：" :label-width="formLabelWidth">
                        <el-input class="moneyInput" v-model="tableData.bcys" :disabled="true" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="" label="备注：" :label-width="formLabelWidth">
                        <el-input class="moneyInputText"  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="pay" label="支付方式：" :label-width="formLabelWidth">
                        <!-- 支付方式选择框 -->
                        <el-select class="payoptions" v-model="payValue" placeholder="请选择">
                            <el-option
                            v-for="item in payOptions"
                            :key="item.payValue"
                            :label="item.payTypes"
                            :value="item.payValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="pay" label="收款金额：" :label-width="formLabelWidth">
                        <el-input class="moneyInputText" type="number" 
                                    onKeypress="return (/[\d.]/.test(String.fromCharCode(event.keyCode)))" 
                                    step="0.01"
                                    placeholder="人民币 元" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-button :plain="true" type="info">商品入账</el-button>
                    <el-button :plain="true" type="info">费用入账</el-button>
                    <el-button :plain="true" type="info">退押金</el-button>
                </el-form>
                <!-- 弹窗底部按钮 -->
                <div slot="footer" class="dialog-footer">
                    <el-button @click="checkOut = false">取 消</el-button>
                    <el-button type="primary" @click="checkOut = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 状态为“空房”时，打开以下弹窗 -->
            <el-dialog :title="tableData.states" :visible.sync="checkIn">
                <!-- 表单域由from-item组件构成 -->
                <el-form >
                    <el-form-item label="入住房型：" :label-width="formLabelWidth">
                        <el-input v-model="tableData.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域" :label-width="formLabelWidth">
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="checkIn = false">取 消</el-button>
                    <el-button type="primary" @click="checkIn = false">确 定</el-button>
                </div>
            </el-dialog>

        </el-card>

    </div>
</template>

<script>
import {roomState} from '../../api/api.js'
  export default {
    methods:{
        dialog(item){
            //  先获取点击的值，再赋值给表单
            this.tableData.name=item.name;
            this.tableData.roomType=item.roomType;
            this.tableData.roomNum=item.roomNum;
            this.tableData.checkInTime=item.checkInTime;
            this.tableData.xfje=item.xfje.toFixed(2);
            this.tableData.ysje=item.ysje.toFixed(2);
            this.tableData.bcys=(item.xfje-item.ysje).toFixed(2);  //   保留两位小数
            if(item.states=="入住"){
                this.tableData.states="办理退房"
                this.checkOut=true;                                 //  上面已经获取到值，然后弹窗（办理退房）
            }else if(item.states=="预订"){
                this.$message.error('已“预订”，预订人“'+item.name+"”");
            }else if(item.states=="预留"){
                this.$message.error('已“预留”，预留人“'+item.name+"”");
            }else if(item.states=="打扫"){
                this.$message.error('当前状态为“打扫”，不能开房');
            }else if(item.states=="空房"){
                this.tableData.states="入住开房"
                this.checkIn=true;                                  //  弹窗（入住开房）
            }
            
        },
        //  搜索按钮点击事件
        ss(){
            console.log("ok");
        },
        rightClick(index){
            this.$notify.info({
                title:'右键点击事件',
                message:'右键点击了一下第'+(index+1)+'张卡片',
                duration:2000
            });
        },
        //  ajax获取json数据
        fetchData(){
            let para={
                roomstates:this.filters.roomstates
            };
            this.loading=true;
            roomState(para).then(res=>{
                this.tableData=res.data.tableData;
                this.loading=false;
            });
        },

    },
    //  生命周期mounted：将编译好的html挂载到页面完成后执行钩子函数。注意：mounted在整个实例生命内只执行一次
    mounted(){
        this.fetchData();
    },
    //  Vue 实例的数据对象
    data() {
      return {
        filters:{
            roomstates:''
        },
        options: [],                            //楼层选择框的数组
        value: '',                              //楼层选择框的 "value"
        houseOptions:[],                        //房型选择框的数组
        houseValue:'',                          //房型选择的 "value"
        tableData:[],                           //房态卡片数组
        loading:false,                           //默认进入页面进行加载
        checkOut:false,                         //默认办理退房弹窗为关闭状态
        checkIn:false,                          //默认入住开发弹窗为关闭状态
        formLabelWidth:'100px',                 //默认表单Label的宽
        payOptions:[],                          //支付选择框的数组
        payValue:'' ,                           //支付选择框的 "value"
        tableData1:[]                           //弹窗里的表格
      }
    }
  }
</script>

<style lang="scss">
$boxCardWidth:150px;
.box-card{
    width: $boxCardWidth;
    margin: 15px;
    float: left;
    cursor: pointer;
}
.el-card__body {
    padding: 10px 5px;
    color: #fff;
}
.bg-rz{
    background: #FF4949;
}
.bg-yd{
    background: #20A0FF;
}
.bg-yl{
    background: #F7BA2A;
}
.bg-kf{
    background: #13CE66;
}
.bg-ds{
    background: #bbb;
}
.searchBox{
      margin-top: 10px;
  }
.selectFloor{
    width: 100px;
}
.selectRoom{
    width: 160px;
}
.searchInput{
    width: 250px;
    margin-left: 5px;
}
.el-dialog--small{
    width: 900px;
}
.roomIndex{
    margin-right: 30px;
}
.tableData{
    margin: 5px 0;
}
.housestates{
    width: 250px;
}
.floatLeft{
    float: left;
    margin-right: 35px;
    margin-bottom: 12px;
}
.money{
    margin-top: 12px;
    float: left;
    margin-right: 80px;
}
.moneyInput{
    width: 100px;
}
.moneyInputText{
    width:88%;
}
.pay{
    float: left;
}
.payoptions{
    width: 120px;
}
.overflow{
    overflow-y: scroll;
}
</style>
