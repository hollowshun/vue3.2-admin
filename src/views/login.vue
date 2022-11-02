<template>
  <div class="view">
    <canvas id="snow"></canvas>
    <div class="content">
      <div class="login">
        <img class="logo" src="@/assets/logo.svg" alt="" />
        <h2>H-Admin</h2>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="用户名：密码：随便">
            <template #prefix>
              <el-icon class="el-input__icon"><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="密码：随便"
            show-password
            @keyup.enter.native="login(ruleFormRef)"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            type="primary"
            @click="login(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { GlobalStore } from "@/stores";
import { ElMessage } from "element-plus";
import snow from "@/utils/snow";
const timer = ref<any>(null);
const router = useRouter();
const store = GlobalStore();
const formSize = ref("large");
const ruleFormRef = ref<FormInstance>();
interface userForm {
  name: string;
  password: string;
}
const ruleForm = reactive<userForm>({
  name: "",
  password: "",
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // store.token = ruleForm.name;
      store.setToken(ruleForm.name);
      // 2.后续可在此添加动态路由
      ElMessage.success("登录成功");
      router.push({
        path: "/",
      });
    }
  });
};
onMounted(() => {
  timer.value = snow().timer;
});
onUnmounted(() => {
  clearInterval(timer.value);
  timer.value = null;
});
</script>
<style lang="less" scoped>
.view {
  // background-color: #293c55;
  background: url("../assets/snow.png") no-repeat;
  background-size: cover;
  height: 100vh;
}
.content {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -200px;
  width: 320px;
  padding: 40px 40px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
  .login {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      width: 50px;
      margin-right: 10px;
    }
  }
}
</style>
