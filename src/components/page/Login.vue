<template>
    <div class="login">
        <div class="title">
            <img src="../../assets/logo@2x.png" alt />
            <span>洁佳管理平台</span>
        </div>
        <img class="logo" src="../../assets/xcyu@2x.png" alt />
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
            <el-form-item prop="username">
                <el-input
                    v-model="loginForm.username"
                    type="text"
                    auto-complete="off"
                    placeholder="账号"
                >
                    <!-- <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" /> -->
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    auto-complete="off"
                    placeholder="密码"
                    @keyup.enter.native="handleLogin"
                >
                    <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
                </el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input
                    v-model="loginForm.code"
                    auto-complete="off"
                    placeholder="验证码"
                    style="width: 63%"
                    @keyup.enter.native="handleLogin"
                >
                    <!-- <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" /> -->
                </el-input>
                <div class="login-code" @click="getCode1">
                    <img :src="codeUrl" />
                </div>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button
                    :loading="loading"
                    size="medium"
                    type="primary"
                    style="width:100%;"
                    @click.native.prevent="handleLogin"
                >
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
            </el-form-item>
        </el-form>
        <!--  底部  -->
        <div class="el-login-footer">
            <span>Copyright © 2018-2019 ruoyi.vip All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>
import { login, getCode } from '../../api/user';
import Cookies from 'js-cookie';

export default {
    name: 'Login',
    data() {
        return {
            codeUrl: '',
            cookiePassword: '',
            loginForm: {
                username: 'admin',
                password: '123456',
                code: ''
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
                password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
                code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
            },
            loading: false,
            redirect: undefined
        };
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },
    created() {
        this.getCode1();
        // this.getCookie();
    },
    methods: {
        getCode1() {
            getCode().then(res => {
                console.log(res);
                this.codeUrl =
                    'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            });
        },

        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;

                    login({ loginid: this.loginForm.username, password: this.loginForm.password, randCode: this.loginForm.code })
                        .then(res => {
                            if (res.code == '200') {
                                Cookies.set('token', res.data.Authentication);

                                sessionStorage.setItem('menu', JSON.stringify(res.data.menus));
                                sessionStorage.setItem('user', JSON.stringify(res.data.user));
                                this.loading = false;
                                this.$router.push({ path: '/' });
                                this.msgSuccess('登录成功');
                            } else {
                                this.msgError(res.message);
                                this.loading = false;
                            }
                        })
                        .catch(err => {
                            this.loading = false;
                            console.log(err);
                            this.getCode1();
                        });
                }
            });
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    height: 100%;
    background-image: url('../../assets/bj.png');
    background-size: cover;
    padding-top: 8%;
    box-sizing: border-box;
    .logo {
        display: block;
        width: 372px;
        height: 54px;
        margin: 10px auto;
    }
}
.title {
    margin: 0px auto 10px auto;
    text-align: center;
    vertical-align: middle;
    img {
        width: 180px;
        height: 60px;
        vertical-align: middle;
    }
    span {
        vertical-align: middle;
        font-size: 36px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
    }
}

.login-form {
    margin: 20px auto;
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;
    .el-input {
        height: 38px;
        input {
            height: 38px;
        }
    }
    .input-icon {
        height: 39px;
        width: 14px;
        margin-left: 2px;
    }
}
.login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
}
.login-code {
    width: 33%;
    height: 38px;
    float: right;
    img {
        cursor: pointer;
        vertical-align: middle;
    }
}
.el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
}
</style>