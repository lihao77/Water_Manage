<template>
  <div class="loginbody">
    <el-row type="flex" justify="space-around">
      <el-carousel
        height="300px"
        class="logindata"
        arrow="never"
        :autoplay="false"
        :initial-index="0"
        trigger="click"
        ref="login"
      >
        <el-carousel-item>
          <div class="login">
            <div class="logintext">
              <h2>Welcome.Login</h2>
            </div>
            <div class="formdata">
              <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
                <el-form-item prop="email">
                  <el-input
                    v-model="loginForm.email"
                    clearable
                    placeholder="请输入账号"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="loginForm.password"
                    clearable
                    placeholder="请输入密码"
                    show-password
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="tool">
              <div>
                <el-checkbox v-model="checked">记住密码</el-checkbox>
              </div>
              <div>
                <span class="shou" @click="forgetpas">忘记密码？</span>
              </div>
            </div>
            <div class="butt">
              <el-button
                type="primary"
                @click.native.prevent="login('loginForm')"
                >登录</el-button
              >
              <el-button class="shou" @click="setActiveItem(1)">注册</el-button>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="register">
            <div class="logintext">
              <h2>Welcome.Regist</h2>
            </div>
            <el-scrollbar style="height: 144.6px; background-color: unset">
              <el-form
                ref="registForm"
                :model="registForm"
                :rules="registRules"
                style="margin: 0 15px 15px 15px"
              >
                <el-form-item prop="username" label="姓名：">
                  <el-input
                    v-model="registForm.username"
                    clearable
                    placeholder="请输入姓名"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="email" label="注册邮箱：">
                  <el-input
                    v-model="registForm.email"
                    autocomplete="off"
                    placeholder="请输入邮箱地址"
                  >
                    <el-button
                      slot="append"
                      @click="sendEmail"
                      :disabled="isSendInAMinute"
                      >发送验证码</el-button
                    >
                  </el-input>
                </el-form-item>

                <el-form-item prop="code" label="验证码：">
                  <el-input
                    v-model="registForm.code"
                    autocomplete="off"
                    placeholder="请输入验证码"
                    :disabled="!isSendEmail"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码：">
                  <el-input
                    type="password"
                    v-model="registForm.password"
                    autocomplete="off"
                    placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="checkPass" label="确认密码：">
                  <el-input
                    type="password"
                    v-model="registForm.checkPass"
                    autocomplete="off"
                    placeholder="请确认密码"
                  ></el-input>
                </el-form-item>

                
                <!-- <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >提交</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item> -->
              </el-form>
            </el-scrollbar>

            <div class="butt">
              <el-button class="shou" @click="setActiveItem(0)">登录</el-button>
              <el-button class="shou" @click="register">重置</el-button>
              <el-button type="primary" @click.native.prevent="register"
                >注册</el-button
              >
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    var checkEmail = (rule, value, callback) => {
      const reg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (reg.test(value)) {
        callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    var checkPassword = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/;
      if (!reg.test(value)) {
        callback(new Error("密码必须是由4-20位字母+数字组合"));
      } else {
        callback();
      }
    };
    var checkCheckPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        password: "",
        email: "",
      },
      checked: false,
      loginRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "不能小于4个字符和大于20个字符",
            trigger: "blur",
          },
        ],
      },
      registForm: {
        username: "",
        password: "",
        ckeckPass: "",
        email: "",
        code: "",
      },
      isSendEmail: false,
      isSendInAMinute: false,
      registRules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: checkPassword, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: checkCheckPassword, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, message: "不能小于6个字符", trigger: "blur" },
        ],
      },
      loginUrl: "http://47.98.181.209:9090/login/",
      registUrl: "http://47.98.181.209:9090/register",
    };
  },
  mounted() {
    if (localStorage.getItem("news")) {
      this.loginForm = JSON.parse(localStorage.getItem("news"));
      this.checked = true;
      console.log('localStorage.getItem("news")')
    } else if (localStorage.getItem("EMAIL")) {
      this.loginForm.email = JSON.parse(localStorage.getItem("EMAIL"));
      console.log('localStorage.getItem("EMAIL")')
    }
  },
  methods: {
    login(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //console.log(this.form.password);
          axios
            .get(this.loginUrl, {
              params: {
                email: this.loginForm.email,
                psd: this.loginForm.password,
              },
            })
            .then((response) => {
              console.log(response.data);
              const res = response.data;
              if (res.token) {
                localStorage.setItem("USERNAME", res.name);
                localStorage.setItem("Authorization", res.token);
                this.$message({
                  message: "登录成功啦",
                  type: "success",
                  showClose: true,
                });
                this.remenber();
                //写入vuex中
                this.$store.commit("token/TOKEN_INFO_RES", res);
                this.$store.commit("token/EMAIL_INFO", this.loginForm.email);
                console.log(this.$store.state.token.email)
                this.$router.replace("/home");
              } else {
                this.$message({
                  message: res.message,
                  type: "error",
                  showClose: true,
                });
              }
            });
        }
      });
    },
    remenber() {
      //this.checked = data;
      if (this.checked) {
        localStorage.setItem("news", JSON.stringify(this.loginForm));
      } else {
        localStorage.removeItem("news");
        /* localStorage.setItem("news", JSON.stringify({email:this.loginForm.email,password:''})); */
      }
      localStorage.setItem("EMAIL", JSON.stringify(this.loginForm.email));
    },
    forgetpas() {
      this.$message({
        type: "info",
        message: "功能尚未开发额😥",
        showClose: true,
      });
    },
    register() {
      this.$refs["registForm"].validate((valid) => {
        if (valid) {
          axios
            .get(this.registUrl, {
              params: {
                email: this.registForm.email,
                password: this.registForm.password,
                username: this.registForm.username,
                code: this.registForm.code,
              },
            })
            .then((res) => {
              const data = res.data;
              if (data.code == 200) {
                this.$message({
                  message: data.message,
                  type: "success",
                });

                setTimeout(() => {
                  this.loginForm.email = this.registForm.email;
                  this.loginForm.password = ''
                  this.setActiveItem(0);
                  this.registForm = {
                    username: "",
                    password: "",
                    ckeckPass: "",
                    email: "",
                    code: "",
                  };
                }, 1000);
              } else {
                this.$message({
                  message: data.message,
                  type: "error",
                });
              }
            });
        }
      });
    },
    setActiveItem(index) {
      this.$refs.login.setActiveItem(index);
    },
    sendEmail() {
      const reg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (reg.test(this.registForm.email)) {
        this.$axios({
          url: "http://47.98.181.209:9090/code",
          params: { email: this.registForm.email },
        }).then(() => {
          this.isSendEmail = true;
          this.isSendInAMinute = true;
          setTimeout(() => {
            this.isSendInAMinute = false;
          }, 60000);
        });
      }
    },
  },
};
</script>

<style scoped>
.loginbody {
  width: 100%;
  height: 100%;

  background-image: url("../assets/login1.jpg");
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.logintext {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

.logindata {
  width: 400px;
  height: 300px;

  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  padding-bottom: 10px;
  border-radius: 2em;
}

.tool {
  display: flex;
  justify-content: space-between;
  color: #606266;
}

.butt {
  margin-top: 10px;
  text-align: center;
}

.shou {
  cursor: pointer;
  color: #606266;
}

/*ui*/
/* /deep/ .el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */
</style>


