<template>
  <div class="login-container">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      status-icon
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: "",
        password: ""
      },
      rules2: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      checked: false
    };
  },
  mounted: function() {
 let token= sessionStorage.getItem("token");
  window.console.log(token);
      if(token){
              this.$router.push({ path: "/" });
      }
 },
  methods: {
    handleSubmit() {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;

          let data = {
            username: this.ruleForm2.username,
            password: this.ruleForm2.password,
            code: 1
          };
          this.axios
            .post("/admin/login", data)
            .then(res => {
              window.console.log(res);
                if (res.data.code == 1) {
                  this.logining = false;
                  sessionStorage.setItem("user", this.ruleForm2.username);
                  sessionStorage.setItem("token", res.data.data);
                  this.$router.push({ path: "/" });
                } else {
                  this.logining = false;
                  this.$alert(res.data.message, "提示", {
                    confirmButtonText: "ok"
                  });
                }
              
            })
            .catch(err => {
              this.logining = false;
        
              window.console.log(err);
            });
          return false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>