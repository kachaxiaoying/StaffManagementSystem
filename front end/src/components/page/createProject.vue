<template>
  <div class="createProject">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Create Project</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="onSubmit"
          >Create</el-button
        >
      </div>
      <el-form ref="form" label-width="120px">
        <el-form-item label="Project Name:">
          <el-input v-model="project_name"></el-input>
        </el-form-item>
        <el-form-item label="Project People:">
          <el-input v-model="project_people"></el-input>
        </el-form-item>
        <el-form-item label="Project Time:">
          <el-date-picker
            v-model="project_time"
            type="date"
            placeholder="Choose Time"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "createProject",
  data() {
    return {
      project_name: "",
      project_people: "",
      project_time: "",
      userId: "",
      userName: ""
    };
  },
  methods: {
    getUserId() {
      this.userId = this.getCookie("usrid");
      this.userName = this.getCookie("username");
    },
    onSubmit() {
      console.log(this.project_name, this.project_people, this.project_time);
      let date = this.project_time;
      console.log(this.dateFormat("YYYY-mm-dd", date));
      let par = {
        project_name: this.project_name,
        project_people: this.project_people,
        date: this.dateFormat("YYYY-mm-dd", date),
        userId: this.userId,
        userName: this.userName
      };
      this.$axios
        .post("/api/users/newproject", par)
        .then((res) => {
          console.log(res);
          if (res.data.msg == "创建成功") {
            this.$router.push("/index");
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
  },
  mounted() {
      this.getUserId();
  },
};
</script>
<style>
.createProject {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 90px);
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
