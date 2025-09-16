<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import channelSelect from './components/channelSelect.vue'
import articleEdit from './components/articleEdit.vue'
import { artGetArticleList } from '@/api/article'
import { formatTime } from '@/utils/format'

const articleList = ref([])
const totalPage = ref(null)
const isLoading = ref(false)

// 设置请求参数 & 获取文章列表
const params = ref({
  pagenum: 1,
  pagesize: 4,
  cate_id: '',
  state: ''
})
const getArticleList = async () => {
  isLoading.value = true
  const res = await artGetArticleList(params.value)
  articleList.value = res.data.data
  totalPage.value = res.data.total
  isLoading.value = false
}
getArticleList()

const articleEditRef = ref(null)

// 添加文章（el-drawer）
const onAddArticle = () => {
  articleEditRef.value.open({})
}

// 编辑文章（el-drawer）
const onEditCommand = (row) => {
  articleEditRef.value.open(row)
}

// 删除文章
const onDelCommand = (row) => {
  console.log(row)
}

// 按条件筛选(搜索)
const onSearch = () => {
  // 因为当 el-form 中的两个 el-select 都做了 v-model 绑定
  // 当被修改时，params中的值就会响应这些变化
  // 这时候，直接调用获取列表函数，新的 params 会自动应用于渲染
  params.value.pagenum = 1
  getArticleList()
}

// 清空筛选（重置）
// 本质就是将 params 置空，然后重新调用获取列表函数
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

// 分页处理
// 以 每页呈现size数量进行渲染，可以取得参数 size
const handleSizeChange = (size) => {
  params.value.pagesize = size
  params.value.pagenum = 1 // 重新从第一页开始渲染
  getArticleList()
}
// 前往指定页码
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理" style="position: relative">
    <template #extra>
      <el-button type="primary" @click="onAddArticle()"> 发布文章 </el-button>
    </template>

    <!-- 表单区域 -->
    <!-- 设置inline，使控件保持在一行 -->
    <el-form :inline="true">
      <el-form-item label="文章分类：">
        <!-- Vue 3.4 前的 v-model → :modelValue和@update:modelValue 的结合(两边都要拆解/命名统一) -->
        <!-- 或者可以使用 defineModel -->
        <channelSelect
          :modelValue="params.cate_id"
          @update:modelValue="(val) => (params.cate_id = val)"
        ></channelSelect>
        <!-- 以上，相当于： -->
        <!-- <channelSelect v-model="params.cate_id"></channelSelect> -->
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select style="width: 200px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="isLoading">
      <el-table-column label="标题" prop="title">
        <template #default="scope">
          <el-link type="primary" :underline="false">{{ scope.row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布日期" prop="pub_date">
        <template #default="scope">
          {{ formatTime(scope.row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button circle plain type="primary" :icon="Edit" @click="onEditCommand(scope.row)"></el-button>
          <el-button circle plain type="danger" :icon="Delete" @click="onDelCommand(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 4, 6, 8]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="totalPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="padding-top: 20px; justify-content: flex-end; position: absolute; bottom: 20px; right: 20px; z-index: 999"
    />

    <!-- 抽屉（封装成组件） -->
    <articleEdit ref="articleEditRef"></articleEdit>
  </page-container>
</template>
