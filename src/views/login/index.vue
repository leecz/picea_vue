<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="form"
      :rules="loginRules"
      class="login-form"
      auto-complete="off"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="用户名"
          name="username"
          type="text"
          auto-complete="off"
        >
          <svg-icon slot="prefix" name="icon-user" />
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          :type="showPwd ? 'text' : 'password'"
          placeholder="密码"
          name="password"
          auto-complete="off"
          @keyup.enter.native="onSubmit"
        >
          <svg-icon slot="prefix" name="icon-password" class="f5" />
          <svg-icon
            @click="showPwd = !showPwd"
            slot="suffix"
            :name="showPwd ? 'icon-eye' : 'icon-eye-close'"
            class="mr1"
          />
        </el-input>
      </el-form-item>

      <div class="ma4">
        <el-button
          :loading="loading"
          type="primary"
          @click.native.prevent="onSubmit"
          style="width: 100%;"
        >
          登录
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { LOGIN } from "@/store/actions.type";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
          { min: 6, message: "密码不小于6位", trigger: "blur" }
        ]
      },
      showPwd: false,
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(LOGIN, { ...this.form }).then(() => {
        this.$router.push({ name: "works" });
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $light_gray;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .login-form {
    position: relative;
    background-color: $bg;
    width: 420px;
    max-width: 100%;
    padding: 60px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
