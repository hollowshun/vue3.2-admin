<template>
  <div>
    <div>{{ name }}</div>
    <el-button @click="getData" type="success">接口</el-button>
    {{ info.data }}
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { getUserInfo } from "@/request/api/index";
import { ElMessage } from "element-plus";
const name = ref<string>("home");
const info = reactive({
  data: {},
});
const getData = () => {
  const param = {
    userID: "10001",
  };
  getUserInfo(param).then((res: any) => {
    info.data = res.data;
    ElMessage.success("请求成功");
  });
};
onMounted(() => {});
</script>
<style lang="less" scoped></style>
