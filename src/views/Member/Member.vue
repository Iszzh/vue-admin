<template>
	<section>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/Home/Charts' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>客人订单管理</el-breadcrumb-item>
        </el-breadcrumb>
    <div class="plan">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-top: 10px;">
      <el-button class="float" @click="addDialog = true" type="primary" icon="plus">增加</el-button>
      <el-dialog title="添加充值方案" :visible.sync="addDialog">
        <el-form :model="addForm" ref="addForm">
          <el-form-item class="recharge" label="充值金额" :label-width="formLabelWidth">
              <el-input class="rechargeInput" v-model="addForm.money" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="recharge" label="赠送金额" :label-width="formLabelWidth">
              <el-input class="rechargeInput" v-model="addForm.giveMoney" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="recharge" label="赠送积分" :label-width="formLabelWidth">
              <el-input class="rechargeInput" v-model="addForm.giveScore" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
              <el-switch v-model="addForm.rechargeValue" on-color="#13ce66" off-color="#ff4949">
              </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="success" icon="plus" @click="handleAddPlus">保存并新增</el-button>
          <el-button type="primary" icon="upload2" @click="handleAdd">新 增</el-button>
        </div>
      </el-dialog>
			<el-form :inline="true" :model="filters">
            
          <el-form-item>
            <el-input class="moneySearch" v-model="filters.money" placeholder="输入金额进行搜索" >
              <el-button v-on:click="getPlanTable" slot="append" icon="search"></el-button>
            </el-input>
          </el-form-item>
			</el-form>
		</el-col>
    </div>

		<!--列表-->
		<div class="planTable">
      <el-table v-loading="loading" :data="tableData" border style="width: 882px">
        <el-table-column label="编号" type="index" width="80">
        </el-table-column>
        <el-table-column label="充值金额" width="180">
            <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.money }}</span>
            </template>
        </el-table-column>
        <el-table-column label="赠送金额" width="180">
            <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.giveMoney }}</span>
            </template>
        </el-table-column>
        <el-table-column label="赠送积分" width="180">
            <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.giveScore }}</span>
            </template>
        </el-table-column>
        <el-table-column label="状态">
            <template scope="scope">
                <el-switch v-model="scope.row.switchValue" on-color="#13ce66" off-color="#ff4949">
                </el-switch>
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改充值方案" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form">
          <el-form-item class="recharge" label="充值金额" :label-width="formLabelWidth">
              <el-input class="rechargeInput" v-model="form.money" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="recharge" label="赠送金额" :label-width="formLabelWidth">
              <el-input class="rechargeInput" v-model="form.giveMoney" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="recharge" label="赠送积分" :label-width="formLabelWidth">
              <el-input class="rechargeInput" v-model="form.giveScore" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
              <el-switch v-model="form.switchValue" on-color="#13ce66" off-color="#ff4949">
              </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" icon="upload2" @click="handleSave">保 存</el-button>
        </div>
      </el-dialog>
    </div>

	</section>
</template>

<script>
	//import NProgress from 'nprogress'
import { getPlan,addPlan,editPlan,deletPlan } from '../../api/api.js'

	export default {
		data() {
			return {
				filters: {
					money: ''
				},
				loading: false,
        tableData:[],
        dialogFormVisible:false,
        addDialog:false,
        form:{
          money:'',
          giveMoney:'',
          giveScore:'',
          rechargeValue:false
        },
        addForm:{
          money:'',
          giveMoney:'',
          giveScore:'',
          rechargeValue:true
        },
        formLabelWidth:'120px'
			}
		},
		methods: {
			//获取用户列表
			getPlanTable() {
				let para = {
					money: this.filters.money
				};
				this.loading = true;
				//NProgress.start();
				getPlan(para).then((res) => {
					this.tableData = res.data.tableData;
					this.loading = false;
					//NProgress.done();
				});
			},
      //增加：保存并新增
      handleAddPlus(){
        if(this.addForm.money == "") {
                this.$message.error('充值金额不能为空');
          }else{
              this.$refs.addForm.validate((valid)=>{
                if(valid){
                  let para=Object.assign({},this.addForm);
                  addPlan(para).then(res=>{
                    this.$message({
                      message:'新增成功',
                      type:'success'
                    });
                    this.addForm.money="";
                    this.addForm.giveMoney="";
                    this.addForm.giveScore="";
                    this.addDialog=false;
                    this.getPlanTable();
                    this.addDialog=true;
                  })
                }
              })
            }
      },
      //增加：新增
      handleAdd(){
        if(this.addForm.money == "") {
                this.$message.error('充值金额不能为空');
          }else{
              this.$refs.addForm.validate((valid)=>{
                if(valid){
                  let para=Object.assign({},this.addForm);
                  addPlan(para).then(res=>{
                    this.$message({
                      message:'新增成功',
                      type:'success'
                    });
                    this.addForm.money="";
                    this.addForm.giveMoney="";
                    this.addForm.giveScore="";
                    this.addDialog=false;
                    this.getPlanTable();
                  })
                }
              })
            }
      },
        //编辑：保存
        handleSave() {
            if (this.form.money == "") {
                this.$message.error('充值金额不能为空');
            } else {
              this.$refs.form.validate((valid)=>{
                if(valid){
                  let para=Object.assign({},this.form);
                  editPlan(para).then(res=>{
                    this.editLoading = false;
                    //NProgress.done();
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                    this.dialogFormVisible=false;
                    this.getPlanTable();
                  })
                }
              })
            }
        },
        //编辑：打开编辑页面
        handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.form=Object.assign({},row);
            console.log("++"+this.form.switchValue)
        },
        //删除
        handleDelete(index, row) {
            //rows.splice(index,1); 最笨的方法，效果不好！哈哈
            //注意获取 row
            this.$confirm('真的要删除吗？','警告！！！',{
              type:'warning'
            }).then(()=>{
              let para={id:row.id};
              console.log(para)
              deletPlan(para).then(res=>{
                this.$message({
                  message:'删除成功！',
                  type:'success'
                });
                this.getPlanTable();
              });
            }).catch(err=>{
              console.log(err);
            })
        }
		},
		mounted() {
			this.getPlanTable();
		}
	}

</script>

<style>
.float{
  float: left;
  margin-right: 5px;
}
</style>