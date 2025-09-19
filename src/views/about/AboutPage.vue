<script setup>
import PageContainer from '@/components/PageContainer.vue'

const contactUs = () => {
  window.open('https://github.com/StelleRainn', '_blank')
}
</script>
<template>
  <PageContainer title="关于我们">
    <template #extra>
      <el-button type="primary" @click="contactUs">和我联系</el-button>
    </template>

    <div class="about-infos">
      <el-container>
        <el-header class="about-header"></el-header>
        <el-main class="about-us">
          <h2>蔷薇丛的小书架</h2>
          <span>by 水川雨蔷薇 StelleRainn Rosa Mizukawa 2025</span>
          <span>release v1.0.0</span>
          <div class="about-us-content">
            <h3>欢迎来到蔷薇丛的小书架！</h3>
            <p>
              <strong>蔷薇丛的小书架</strong>是一个基于 Vue 3 + Element Plus + SCSS
              构建的个人项目，用于展示和管理个人的文章资源。目前通过 Vercel 完成了部署和上线。
            </p>
            <p>
              本项目源自B站up主:
              <strong>黑马程序员</strong>
              的前端系列课程中的项目，作为Vue2/3课程的验收项目，本项目涵盖了较为广泛的Vue3基础知识点，包括项目结构搭建、组合式API的使用、路由、Pinia、组件封装等；并且采用了Element
              Plus组件库，强化了组件的使用，提供了丰富的UI组件和交互效果。
            </p>
            <p>
              制作本项目，是一次非常好的对Vue3基础的学习和实践。尽管还有很多不完美之处，但以此打下优良的基础，未来会有更多优秀的以「蔷薇」为名的系列作品持续上线，敬请关注！
            </p>
            <div class="about-us-contact">
              <h4>和我联系</h4>
              <p>如果有任何建议，需要源代码，或者只是单纯和我聊聊天，欢迎点击下方链接或右上角的蓝色按钮与我联系！</p>
              <p>
                <el-link underline="never" href="https://github.com/StelleRainn"
                  >Github: StelleRainn Rosa Mizukawa</el-link
                >
              </p>
              <p>
                <el-link underline="never" href="https://mail.google.com/mail"
                  >Email: 3298257615@qq.com / super123keng@gmail.com</el-link
                >
              </p>
              <p>
                <el-link underline="never" href="https://weixin.qq.com">WeChat: StelleRainn Rosa Mizukawa</el-link>
              </p>
            </div>
            <h4>致谢</h4>
            <p>
              B站up主-黑马程序员及Vue课程讲师-鹏鹏老师 | 我自己 | 所有爱我的人 | 广东外语外贸大学（南校区）图书馆 |
              Macbook Pro
            </p>
          </div>
        </el-main>
      </el-container>
    </div>
  </PageContainer>
</template>

<style lang="scss" scoped>
.about-infos {
  .about-header {
    height: 160px;
    background: url('@/assets/rosa.svg') no-repeat center / 160px auto;
  }
  .about-us {
    display: flex;
    align-items: center;
    flex-direction: column;

    span {
      font-size: 13px;
      font-style: italic;
      color: gray;
    }

    .about-us-content,
    .about-us-contact {
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>
