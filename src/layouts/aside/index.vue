<template>
  <div>
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      background-color="#293c55"
      text-color="rgba(255,255,255,0.45)"
      active-text-color="#f9f9f9"
      :collapse="isCollapse"
      router
    >
      <el-menu-item style="text-align: center; display: block" index="0"
        >H</el-menu-item
      >
      <el-menu-item index="/home">
        <el-icon><Coffee /></el-icon>
        <template #title>home</template>
      </el-menu-item>
      <el-menu-item index="/about">
        <el-icon><Coffee /></el-icon>
        <template #title>about</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref, getCurrentInstance, computed } from "vue";
const route = useRoute();
const instance = getCurrentInstance();
const activeMenu = computed(() => route.path);
const isCollapse = ref<boolean>(false);
instance?.proxy?.$Bus.on("isCollapse", (data: any) => {
  isCollapse.value = data.value;
});
</script>
<style lang="less" scoped>
.logo {
  height: 60px;
  background-color: #545c64;
  line-height: 60px;
  text-align: center;
  width: 200px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
}
.el-menu-vertical-demo {
  height: 100vh;
}
</style>
