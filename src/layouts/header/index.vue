<template>
  <div class="header overflow">
    <div class="expand fl" @click="collapseChange">
      <el-icon v-if="!isCollapse"><Fold /></el-icon>
      <el-icon v-else><Expand /></el-icon>
    </div>
    <div class="item_style mr20">
      <el-dropdown trigger="click" @command="handleCommand">
        <div style="width: 60px">
          {{ store.token }}
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in dropdownList"
              :key="item.value"
              :command="item.value"
              >{{ item.label }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { GlobalStore } from "@/stores";
const isCollapse = ref<boolean>(false);
const instance = getCurrentInstance();
const collapseChange = () => {
  isCollapse.value = !isCollapse.value;
  instance?.proxy?.$Bus.emit("isCollapse", isCollapse);
};
const router = useRouter();
const store = GlobalStore();
const dropdownList = reactive<any>([
  {
    label: "退出登录",
    value: "logout",
  },
]);
const logout = () => {
  store.logOut();
  router.replace({
    path: "/login",
  });
  ElMessage({
    type: "success",
    message: "退出成功",
  });
};
const handleCommand = (command: string | number | object) => {
  switch (command) {
    case "logout":
      ElMessageBox.confirm("确认退出吗？", "Warning", {
        type: "warning",
      })
        .then(() => {
          logout();
        })
        .catch(() => {});
      break;

    default:
      break;
  }
};
onMounted(() => {});
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  line-height: 60px;
  .expand {
    width: 60px;
    text-align: center;
  }
  .item_style {
    float: right;
    height: 60px;
    text-align: center;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
  }
}
.el-dropdown {
  line-height: 60px;
}
</style>
