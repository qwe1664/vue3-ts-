<template>
  <div class="page-content">
    <HyTable
      :lisData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1、header中的插槽 -->
      <template #headerHandler>
        <!-- @click="handleNewUser" -->
        <el-button type="primary">新建用户</el-button>
        <el-button>刷新</el-button>
      </template>

      <!-- 2、列中的插槽 -->
      <template #status="{ row }">
        <!-- size="mini"  -->
        <el-button size="small" :type="row.enable ? 'success' : 'danger'">
          {{ row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="{ row }">
        <!-- 格式化时间 -->
        <!-- 老师的格式化时间是  $filters.formatTime(row.createAt) -->
        <strong>{{ dateFliter(row.createAt) }}</strong>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button size="small" text style="color: blue">编辑</el-button>
          <el-button size="small" text style="color: red">删除</el-button>
        </div>
      </template>
    </HyTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import HyTable from '@/base-ui/table'

export default defineComponent({
  components: { HyTable },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const store = useStore()

    const pageInfo = ref({ currentPage: 0, pageSize: 10 })

    watch(pageInfo, () => getPageData())

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    const dateFliter = (val: any, format = 'YYYY-MM-DD hh:mm:ss') => {
      if (!isNaN(val)) {
        val = parseInt(val)
      }
      return dayjs(val).format(format)
    }

    // 从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    return {
      dataList,
      dataCount,
      pageInfo,
      dateFliter,
      getPageData
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
}
</style>
