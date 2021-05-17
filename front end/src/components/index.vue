<template>
  <div class="home">
    <div id="header">
      <div></div>
      <div>system</div>
      <div>Login User：{{ userName }}</div>
      <el-button type="primary" @click="logoutUser()">Logout</el-button>
    </div>

    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      userName: "",
      usrid: "",
    };
  },
  methods: {
    getUserName() {
      this.userName = this.getCookie("username");
      this.usrid = this.getCookie("usrid");
    },
    getCookie(name) {
      var strcookie = document.cookie; //获取cookie字符串
      var arrcookie = strcookie.split("; "); //分割
      //遍历匹配
      for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name) {
          return arr[1];
        }
      }
      return "";
    },
    logoutUser() {
      let par = {
        usrid: this.usrid,
      };
      this.$axios
        .post("/api/users/logout", par)
        .then((res) => {
          console.log(res);
          if (res.data.status == "0") {
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getUserName();
  },
};
</script>
<style>
#header {
  height: 50px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-main {
  /* padding: 0 !important; */
  height: calc(100vh - 50px);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 200px; */
  min-height: 400px;
}
</style>
