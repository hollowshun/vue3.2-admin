<template>
  <div class="common-layout">
    <el-container>
      <el-aside><Aside></Aside></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main>
          <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import Header from "./header/index.vue";
import Aside from "./aside/index.vue";
</script>
<style lang="less" scoped>
.el-aside {
  width: auto;
}
.common-layout {
  height: 100vh !important;
}
.el-header {
  padding: 0 !important;
  width: 100%;
}
</style>
