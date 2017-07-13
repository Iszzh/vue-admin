<template>
  <div>
    <el-row class="main">
      <el-col class="mainleft" :span="4">
        <el-menu default-active="1" class="el-menu-vertical-demo leftNavs" @open="handleOpen" @close="handleClose">
          <router-link to="/Home/Charts"><el-menu-item index="1"><i class="el-icon-star-on"></i>首页</el-menu-item></router-link>
          <router-link to="/Home/RoomState"><el-menu-item index="2"><i class="el-icon-setting"></i>房态图</el-menu-item></router-link>
          <router-link to="/Home/Order"><el-menu-item index="3"><i class="el-icon-menu"></i>客人订单</el-menu-item></router-link>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-message"></i>会员管理</template>
            <el-menu-item-group>
              <router-link to="/Home/Member"><el-menu-item index="4-1">会员管理</el-menu-item></router-link>
              <router-link to="/Home/Plan"><el-menu-item index="4-2">方案管理</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" class="el-menu-main">
        <router-view></router-view>
      </el-col> 
    </el-row>     
  </div>
</template>
<script>
export default {
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style lang="scss">
.main{
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
}
.mainleft{
    flex: 0 0 230px;
    width: 230px;
}
.leftNavs{
  height: 100%;
}
.el-menu-main{
    flex: 1;
    padding: 20px;
}
</style>