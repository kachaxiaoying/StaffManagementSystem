<template>
  <div id="login">
    <el-card class="box-card">
      <!-- <div class="titleLogin">用户通讯信息统计系统</div> -->
      <div class="titleLogin">system</div>
      <el-form label-width="80px" :model="user">
        <div>
          <el-form-item label="UserName：">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="Password：">
            <el-input v-model="user.pwd" type="password"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="userLogin()">Login</el-button>
          <el-button type="primary" @click="registed()">Registed</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>The check-in time is not arrived, please explain the reason</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitReason()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="REASON" :visible.sync="dialogReason" width="30%">
      <el-input v-model="reson"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogReason = false">取 消</el-button>
        <el-button type="primary" @click="submitReasonOne()">确 定</el-button>
      </span>
    </el-dialog>
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
        tagLogin: true,
      },
      reson: "",
      dialogVisible: false,
      dialogReason: false,
    };
  },
  methods: {
    userLogin() {
      let par = {
        userName: this.user.name,
        userPwd: this.user.pwd,
      };
      let nowTime = new Date().getTime();
      this.$axios
        .post("/api/users/login", par)
        .then((res) => {
          console.log(res);
          if (res.data.status == "0") {
            if (new Date().getHours() < 8) {
              this.dialogVisible = true;
            }
            if (new Date().getHours() > 10 && new Date().getHours() < 16) {
              this.dialogVisible = true;
            }
            if (new Date().getHours() > 17) {
              this.dialogVisible = true;
            }
            if (
              new Date().getHours() == 8 ||
              new Date().getHours() == 9 ||
              new Date().getHours() == 16 ||
              new Date().getHours() == 17
            ) {
              // console.log()
              this.$router.push("index");
            }

            this.$message({
              message: "login successfully",
              type: "success",
            });
          } else {
            this.$message.error("user name or password is wrong");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitReason() {
      this.dialogVisible = false;
      this.dialogReason = true;
    },
    registed() {
      this.$router.push("newuser");
    },
    submitReasonOne() {
      this.dialogReason = false;
      this.$router.push("index");
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
