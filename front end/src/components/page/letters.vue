<template>
  <div class="letters">
    <el-button type="primary" @click="dialogFormVisible = true"
      >Start communication</el-button
    >
    <div style="margin-top: 20px; margin-bottom: 20px">
      Communication content：
    </div>
    <div v-for="(item, index) in allTalk" :key="index">
      <div>{{ item.talkusername }}:</div>
      <div>
        {{ item.content }}
      </div>
    </div>
    <div></div>
    <el-dialog title="communicate" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item>
          <el-input v-model="content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTxt()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "letters",
  data() {
    return {
      letters: "",
      dialogFormVisible: false,
      content: "",
      userId: "",
      userName: "",
      allTalk: [],
    };
  },
  methods: {
    getContent() {
      this.allTalk = [];
      let projectId = this.$route.query.id;
      let par = {
        projectId: projectId,
      };
      this.$axios
        .post("/api/users/getContent", par)
        .then((res) => {
          console.log(res);
          res.data.forEach((item) => {
            this.allTalk.push(item);
          });
          console.log(this.allTalk, "this.allTalk");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitTxt() {
      let par = {
        userName: this.userName,
        userId: this.userId,
        projectId: this.$route.query.id,
        createuser: this.$route.query.createuser,
        createtname: this.$route.query.createtname,
        content: this.content,
      };
      this.$axios
        .post("/api/users/insertContent", par)
        .then((res) => {
          this.dialogFormVisible = false;
          this.getContent();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserId() {
      this.userId = this.getCookie("usrid");
      this.userName = this.getCookie("username");
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
  },
  mounted() {
    this.getContent();
    this.getUserId();
  },
};
</script>
<style>
</style>
