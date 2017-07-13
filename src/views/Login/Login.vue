<template>
  <el-form class="center" :rules="rules" ref="form" :model="form" label-width="80px" @keyup.enter.native="submitForm('Form')">
    <h3 class="title">酒店管理系统登录</h3>
    <el-form-item class="ml" prop="name">
      <el-input v-model="form.name" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item class="ml" prop="pwd">
      <el-input v-model="form.pwd" type="password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item class="ml">
      <el-checkbox v-model="checked">记住密码</el-checkbox>
    </el-form-item>
    <el-form-item class="ml">
      <el-button :loading="btnLoading" class="btn" type="primary" @click="submitForm('Form')">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {requestLogin} from '../../api/api.js'
export default {
  data(){
    return{
      form:{
        name:'zzh',
        pwd:'123456',
      },
      btnLoading:false,
      checked:true,
      rules:{
        name:[
          {required:true,message:'请输入账号',trigger:'blur'},
          {min:3,max:10,message:'长度应大于3小于10',trigger:'blur'}
        ],
        pwd:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:6,max:20,message:'长度应大于6',trigger:'blur'}
        ]
      }
    }
  },
  methods: {
      submitForm(ev) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var loginParams={
              username: this.form.name,
              password: this.form.pwd
            }
            this.btnLoading=true;
            requestLogin(loginParams).then(data=>{
             let {msg,code,users}=data;
              if(code==200){
                sessionStorage.setItem('users',JSON.stringify(users));
                this.btnLoading=false;
                this.$router.push({path:'/Home/Charts'});
              }else{
                this.$message({
                  message:msg,
                  type:'error'
                })
                this.btnLoading=false;
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>

<style>
.center{
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.title{
    margin: 0 auto 40px;
    text-align: center;
    color: #505458;
}
.btn{
    width:100%;
    margin: 0 auto;
}
.ml{
  margin-left: -80px;
}
</style>
