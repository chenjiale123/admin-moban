<template>
    <div class="log">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="用户" prop="loginId">
                <el-select v-model="queryParams.loginid" placeholder="请选择">
                    <el-option
                        v-for="item in userList"
                        :key="item.id"
                        :label="item.username"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="时间" prop="time">
                <el-date-picker
                    v-model="queryParams.time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="datalist" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="ip地址" align="center" prop="ip" />
            <el-table-column
                label="操作时间"
                align="center"
                prop="createTime"
                :show-overflow-tooltip="true"
            />
          
            <el-table-column label="接口地址" align="center" prop="url" :show-overflow-tooltip="true" />
            <el-table-column
                label="异常内容"
                align="center"
                prop="response"
                :show-overflow-tooltip="true"
            />
            <el-table-column
                label="请求参数"
                align="center"
                prop="params"
                :show-overflow-tooltip="true"
            />


              <el-table-column
                        label="操作"
                        align="center"
                        width="180"
                        class-name="small-padding fixed-width"
                    >
                        <template slot-scope="scope">
                          
                            <el-button
                                size="mini"
                                type="text"
                                icon="el-icon-key"
                                @click="find(scope.row)"
                            >查看详情</el-button>
                        </template>
                    </el-table-column>
        </el-table>

        <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
        />


          <!-- 响应内容 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
       <div class="list">
            <span>{{content}}</span>
       </div>


      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
import { getClienLog ,getClienResponse} from '@/api/log';
import { listUser } from '@/api/system/user';
export default {
    data() {
        return {
            content:'',
            open:false,
            title:'响应内容',
            userList: [],
            total: 0,
            datalist: [],
            loading: false,
            queryParams: {
                loginid: '',
                time: [new Date(), new Date()],
                pageNum: 1,
                pageSize: 20
            }
        };
    },
    created() {
        this.getList();
        this.getUserList();
    },
    methods: {
        // 详情
        find(row){
            this.open=true
                  getClienResponse({id:row.id}).then(res=>{
                      console.log(res)
                      this.content=res.data
                  })
        },
        submitForm(){
         this.open=false
        },
        cancel(){
           this.open=false
        },
        getUserList() {
            this.loading = true;
            let user = JSON.parse(sessionStorage.getItem('user'));
            //  console.log(user)
            listUser({ pageSize: 9999, pageNum: 1 }).then(response => {
                console.log(response);
                this.userList = response.data.list;

                this.loading = false;
            });
        },

        getList() {
            this.loading = true;
            getClienLog({ pageNum: this.queryParams.pageNum, pageSize: this.queryParams.pageSize })
                .then(res => {
                    console.log(res);
                    this.datalist = res.data.list;
                    this.total = res.data.total;
                    this.loading = false;
                })
                .catch(err => {
                    this.msgError('请求失败');
                });
        },
        handleSelectionChange() {},
        handleQuery() {
            getClienLog({
                loginid: this.queryParams.loginid,
                startTime: this.queryParams.time[0],
                endTime: this.queryParams.time[1],
                pageNum: this.queryParams.pageNum,
                pageSize: this.queryParams.pageSize
            }).then(res => {
                console.log(res);
                this.datalist = res.data.list;
                this.total = res.data.total;
                this.loading = false;
            });
        },
        resetQuery() {}
    }
};
</script>