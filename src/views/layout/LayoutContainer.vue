<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
  InfoFilled,
  WarningFilled
} from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores'
import router from '@/router'

const userStore = useUserStore()
userStore.getUser()

const onCommand = async (commandKey) => {
  // 退出操作
  if (commandKey === 'logout') {
    await ElMessageBox.confirm('您确定要退出本系统吗？', '温馨提示', {
      confirmButtonText: '退出',
      cancelButtonText: '取消',
      type: 'warning'
    })
    userStore.removeToken()
    userStore.setUser({})
    router.push('/login')
  } else {
    // 跳转操作
    router.push(`/user/${commandKey}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 侧边菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <!-- el-munu 菜单组件，几个重要的属性
      :default-active="$route.path" → 配置默认高亮的菜单项 
      router 若 router 选项开启，则 el-menu-item 中的 index 就是要跳转的路径
      
      el-menu-item 菜单项
      属性 index="/article/channel"，配置的是访问的跳转路径，配合 default-active 实现高亮
      -->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <!-- el-sub-menu 多级菜单 -->
        <el-sub-menu index="/user">
          <!-- 多级菜单的标题 具名插槽 -->
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <!-- 展开的内容 -->
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/about">
          <el-icon><InfoFilled /></el-icon>
          <span>关于</span>
        </el-menu-item>
        <el-menu-item index="/issues">
          <el-icon><WarningFilled /></el-icon>
          <span>Known Issues</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主体部分 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div>
          欢迎，<strong>{{ userStore.user.nickname || userStore.user.username }}</strong>
        </div>

        <!-- ele dropdown组件 -->
        <el-dropdown placement="bottom-end" @command="onCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>

          <!-- 下拉内容 -->
          <!-- el-dropdown-item控件中，command属性将在 el-dropdown的@command监听事件中 传递参数 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 主内容区域 -- 保留路由出口 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 底部 -->
      <el-footer>蔷薇丛的小书架 by 2025 StelleRainn Rosa Mizukawa 水川雨蔷薇 </el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &__logo {
      height: 200px;
      background: url('@/assets/logo-Main.png') no-repeat center / 160px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
