<template>
  <div>{{ name }}</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
const name = ref<string>("about");
onMounted(() => {});
</script>
<style lang="less" scoped></style>
