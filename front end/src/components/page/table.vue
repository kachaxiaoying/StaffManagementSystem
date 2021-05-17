<template>
  <div class="tableProject">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="projectName" placeholder="place input content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="slectTable">Select Table</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createProject">Create Projrct</el-button>
      </el-form-item>
    </el-form>
    <div style="font-size: 20px; color: blue">Now Project</div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="project_name" label="Project Name">
        </el-table-column>
        <el-table-column prop="project_people" label="Participant">
        </el-table-column>
        <el-table-column prop="date" label="time"> </el-table-column>
        <el-table-column fixed="right" label="operation" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="prvateLetters(scope.row)"
              >communication</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "tableProject",
  data() {
    return {
      tableData: [],
      projectName: "",
      userId: "",
    };
  },
  methods: {
    getUserId() {
      this.userId = this.getCookie("usrid");
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
    getTable() {
      this.$axios
        .get("/api/users/getOneTable")
        .then((res) => {
          console.log(res);
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createProject() {
      this.$router.push("createProject");
    },
    prvateLetters(item) {
      this.$router.push({
        path: "/letters",
        query: {
          id: item.projeectId,
          createuser: item.createId,
          createtname: item.createName,
        },
      });
    },
    slectTable() {
      // selectOneTable
      let par = {
        table_name: this.projectName,
      };
      this.$axios
        .post("/api/users/selectOneTable", par)
        .then((res) => {
          console.log(res);
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getTable();
    this.getUserId();
  },
};
</script>
<style></style>
