<template>
    <div>
        <el-row>
            <el-col :span="24" class="top">
                <el-col :span="10" class="logos">
                        {{ logo }}
                    </el-col>
                    <el-col :span="10">
                    <div class="navs">
                        <i class="el-icon-menu"></i>
                    </div>
                    </el-col>
                    <el-col :span="4" class="floatright">
                        <div class="userInfo">
                            <el-dropdown>
                            <span class="el-dropdown-link users">
                                {{username}}<img class="userImg" :src="avatar"/>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>我的消息<el-badge class="mark" :value="99" /></el-dropdown-item>
                                <router-link tag="div" to="/Home/userSettings"><el-dropdown-item>设置</el-dropdown-item></router-link>
                                <el-dropdown-item divided @click.native="signOut">退出</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
            </el-col>
        </el-row>
    </div>
 
</template>
<script>
export default {
  data () {
    return {
      logo:'',
      username:'',
      avatar:''
    }
  },
  mounted(){
    var users=sessionStorage.getItem('users');
    if(users){
        users=JSON.parse(users);
        //console.log(users);
        this.username=users.username||'';
        this.logo=users.logo||'';
        this.avatar=users.avatar||'';
    }
  },
  methods:{
      signOut(){
         var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('users');
					_this.$router.push('/Login');
				}).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消退出 '
                    });
				});
      },
  }
}
</script>
<style lang="scss">
.top{
    height: 60px;
    line-height: 60px;
    background: #20a0ff;
    color: #fff;
}
.logos{
    width: 230px;
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;
    box-sizing: border-box;
}
.navs{
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
}
.userInfo{
    text-align: right;
    padding-right: 35px;
    float: right;
}
.users{
    cursor: pointer;
    color: #fff;
    
}
.userImg{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
}
.floatright{
    float: right;
}
</style>
