<template>
	<section>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/Home/Charts' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>客人订单管理</el-breadcrumb-item>
        </el-breadcrumb>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-top: 10px;">
			<el-form :inline="true" :model="filters">
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
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table v-loading="loading" element-loading-text="拼命加载中" :data="users" height="650"  style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
            <el-table-column prop="ls" label="入住流水号" width="220" sortable>
			</el-table-column>
            <el-table-column prop="oddNum" label="单号" width="160" sortable>
			</el-table-column>
            <el-table-column prop="roomNum" label="房号" width="100" sortable>
			</el-table-column>
            <el-table-column prop="roomType" label="房型" width="120" sortable>
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
            <el-table-column prop="phone" label="电话" width="130" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="checkInTime" label="入住时间" width="130" sortable>
			</el-table-column>
            <el-table-column prop="operator" label="操作员" width="120" sortable>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	//import NProgress from 'nprogress'
	import { getUserListPage,} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				loading: false,
                options: [{
                    value: "选项1",
                    floor: "全部"
                }, {
                    value: "选项2",
                    floor: "一楼"
                }],
                value:''

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.loading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.loading = false;
					//NProgress.done();
				});
			},
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>