<template>
    <div class="app-container">
        <el-form :inline="true">
        
            <el-form-item>
         
                <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>

        <el-table
            v-loading="loading"
            :data="menuList"
            row-key="id"
            :tree-props="{children: 'submenu', hasChildren: 'hasChildren'}"
        >
            <el-table-column prop="name" label="菜单名称" :show-overflow-tooltip="true" width="160"></el-table-column>
            <el-table-column prop="icon" label="图标" align="center" width="100">
                <template slot-scope="scope">
                    <!-- <svg-icon :icon-class="scope.row.icon" /> -->
                    <img :src="scope.row.icon" alt />
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" width="60"></el-table-column>
            <!-- <el-table-column prop="perms" label="权限标识" :show-overflow-tooltip="true"></el-table-column> -->
            <el-table-column prop="url" label="组件路径" :show-overflow-tooltip="true"></el-table-column>

            <el-table-column label="创建时间" align="center" prop="createTime">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-plus"
                        @click="handleAdd(scope.row)"
                    >新增</el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加或修改菜单对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="上级菜单">
                            <treeselect
                                v-model="form.parentId"
                                :options="menuOptions"
                                :normalizer="normalizer"
                                :show-count="true"
                                placeholder="选择上级菜单"
                            />
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="菜单图标">
                              <el-upload
                                class="avatar-uploader"
                                action="#"
                                :on-change="imgPreview"
                                :auto-upload="false"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="菜单名称" prop="menuName">
                            <el-input v-model="form.name" placeholder="请输入菜单名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="显示排序" prop="orderNum">
                            <el-input-number
                                v-model="form.menuSortNumber"
                                controls-position="right"
                                :min="0"
                            />
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="路由地址" prop="path">
                            <el-input v-model="form.url" placeholder="请输入路由地址" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listMenu, getMenu, delMenu, addMenu, updateMenu, avater } from '@/api/system/menu';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import IconSelect from '@/components/common/IconSelect';
import Cookies from 'js-cookie';

export default {
    name: 'Menu',
    components: { Treeselect, IconSelect },
    data() {
        return {
            formData:new FormData(),
            imgUrl: '',
            // 遮罩层
            loading: true,
            // 菜单表格树数据
            menuList: [],
            // 菜单树选项
            menuOptions: [],
            // 弹出层标题
            title: '',
            // 是否显示弹出层
            open: false,
            // 显示状态数据字典
            visibleOptions: [],
            // 菜单状态数据字典
            statusOptions: [],
            // 查询参数
            queryParams: {
                menuName: undefined,
                visible: undefined
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                parentId: [{ required: true, message: '上级菜单名称不能为空', trigger: 'blur' }],
                name: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
                url: [{ required: true, message: '路由地址不能为空', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getList();
    },
    computed: {
        headers() {
            return {
                Authorization: Cookies.get('token')
            };
        }
    },
    methods: {
        // 图片上传

        handleAvatarSuccess(res, file) {
            // this.form.frontCardImage = URL.createObjectURL(file.raw);
            // console.log( this.form.frontCardImage);
            //   console.log(file)
        },
        beforeAvatarUpload(file) {},
        imgPreview(file, fileList) {
            let fileName = file.name;
            let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
            if (regex.test(fileName.toLowerCase())) {
                this.imgUrl = URL.createObjectURL(file.raw);

                this.formData.append('file', file.raw);
            } else {
                this.$message.error('请选择图片文件');
            }
        },

        /** 查询菜单列表 */
        getList() {
            this.loading = true;
            listMenu().then(response => {
                if(response.code=="200"){
                 this.menuList = this.handleTree(response.data, 'menuId');
                this.loading = false;
                }else{
                    this.msgError(response.message)
                }
         
            })
            .catch(err=>{
                this.msgError('请求原因')
            })
        },
        //启用
        handleStatusChange(row) {
            openDept({ id: row.id, status: row.status }).then(response => {
                console.log(response.data);
                this.msgSuccess('操作成功');
            });
        },
        /** 转换菜单数据结构 */
        normalizer(node) {
            if (node.submenu && !node.submenu.length) {
                delete node.submenu;
            }
            return {
                id: node.id,
                label: node.name,
                children: node.submenu
            };
        },
        /** 查询菜单下拉树结构 */
        getTreeselect() {
            listMenu().then(response => {
                this.menuOptions = [];
                const menu = { id: 0, name: '主类目', submenu: [] };
                menu.submenu = this.handleTree(response.data, 'menuId');
                this.menuOptions.push(menu);
            });
        },
        // 显示状态字典翻译
        visibleFormat(row, column) {
            if (row.menuType == 'F') {
                return '';
            }
            return this.selectDictLabel(this.visibleOptions, row.visible);
        },
        // 菜单状态字典翻译
        statusFormat(row, column) {
            if (row.menuType == 'F') {
                return '';
            }
            return this.selectDictLabel(this.statusOptions, row.status);
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                menuId: undefined,
                parentId: 0,
                name: undefined,
                icon: undefined,

                menuSortNumber: undefined,

                url: ''
            };
            this.resetForm('form');
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.getList();
        },
        /** 新增按钮操作 */
        handleAdd(row) {
            this.reset();
            this.getTreeselect();
            if (row != null) {
                this.form.parentId = row.id;
            }
            this.open = true;
            this.title = '添加菜单';
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            this.getTreeselect();
            console.log(row);
            listMenu().then(response => {
                this.open = true;
                this.form.id = row.id;
                this.form.name = row.name;
                this.form.menuSortNumber = row.sort;
                this.form.url = row.url;
                this.form.parentId = row.parentId;
                this.imgUrl= this.baseUrl+ row.icon;
            });
        },
        /** 提交按钮 */
        submitForm: function() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        updateMenu(this.form).then(response => {
                            if (response.code === "200") {
                                this.msgSuccess('修改成功');
                                this.open = false;
                                this.getList();
                            } else {
                                this.msgError(response.message);
                            }
                        });
                    } else {
                        addMenu(this.form.name,this.form.url,this.form.parentId,this.form.menuSortNumber,this.formData).then(response => {
                            if (response.code === "200") {
                                this.msgSuccess('新增成功');
                                this.open = false;
                                this.getList();
                            } else {
                                this.msgError(response.message);
                            }
                        });
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            this.$confirm('是否确认删除名称为"' + row.name + '"的数据项?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(function() {
                    return delMenu({ menuIds: row.id });
                })
                .then(() => {
                    this.getList();
                    this.msgSuccess('删除成功');
                })
                .catch(function() {});
        }
    }
};
</script>
<style  scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
/* .avatar {
    width: 178px;
    height: 178px;
    display: block;
  } */
.el-table img {
    width: 20px;
    height: 20px;
}
</style>