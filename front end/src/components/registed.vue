<template>
  <div id="login">
    <el-card class="box-card">
      <!-- <div class="titleLogin">用户通讯信息统计系统</div> -->
      <div class="titleLogin">registed</div>
      <el-form label-width="80px" :model="user">
        <div >
          <el-form-item label="UserName：">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="Password：">
            <el-input v-model="user.pwd" type="password"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitNew()">prompt</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: {
        name: "",
        pwd: "",

      },
    };
  },
  methods: {
    submitNew() {
      let par = {
        userName: this.user.name,
        userPwd: this.user.pwd,
      };
      this.$axios
        .post("/api/users/register", par)
        .then((res) => {
          console.log(res);
          if (res.data.msg == "注册成功") {
            this.$message({
              message: "registration success",
              type: "success",
            });
            this.$router.push("/")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.box-card {
  width: 480px;
  border-radius: 30px;
}
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("../../static/img/bgc.jpg");
  background-size: 100% 100%;
}
.titleLogin {
  color: blue;
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.el-form-item__content {
  display: flex;
  justify-content: center;
  margin-left: 0px !important;
}
</style>
