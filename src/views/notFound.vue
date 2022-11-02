<template>
  <div class="notFound">
    <h1>404</h1>
    <h4 class="mt20">抱歉，您访问的页面不存在</h4>
    <el-button class="mt20" type="primary" @click="router.push('/')"
      >返回首页</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<style lang="less" scoped>
.notFound {
  margin-top: 200px;
  text-align: center;
}
</style>
