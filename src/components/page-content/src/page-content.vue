<template>
  <div class="page-content">
    <HyTable
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1、header中的插槽 -->
      <template #headerHandler>
        <!-- @click="handleNewUser" -->
        <el-button type="primary" v-if="isCreate" @click="handleNewClick"
          >新建用户</el-button
        >
        <el-button>刷新</el-button>
      </template>

      <!-- 2、列中的插槽 -->
      <template #status="{ row }">
        <!-- size="mini"  -->
        <template v-if="row.enable">
          <el-button size="small" :type="row.enable ? 'success' : 'danger'">
            {{ row.enable ? '启用' : '禁用' }}
          </el-button>
        </template>
        <template v-else>
          <el-button size="small" :type="row.status ? 'success' : 'danger'">
            {{ row.status ? '启用' : '禁用' }}
          </el-button>
        </template>
      </template>

      <template #createAt="{ row }">
        <!-- 格式化时间 -->
        <!-- 老师的格式化时间是  $filters.formatTime(row.createAt) -->
        <!-- moment(row.createAt).format('YYYY-MM-DD') -->
        <strong>{{ row.createAt }}</strong>
      </template>
      <template #handler="{ row }">
        <div class="handle-btns">
          <el-button
            size="small"
            text
            style="color: blue"
            v-if="isUpdate"
            @click="handleEditClick(row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            text
            style="color: red"
            v-if="isDelete"
            @click="handleDeleteClick(row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content 中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </HyTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import HyTable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'
import moment from 'moment'

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
  setup(props, { emit }) {
    const store = useStore()

    // 0、获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1、双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 2、发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // val: any, format = 'YYYY-MM-DD hh:mm:ss'
    const dateFliter = (date: any) => {
      // if (!isNaN(val)) {
      //   val = parseInt(val)
      // }
      // return dayjs(val).format(format)
      var seperator1 = '-'
      var seperator2 = ':'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        ' ' +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds()
      return currentdate
    }

    // 3、从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 4、获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 删除行
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    // 新增按钮点击事件
    const handleNewClick = () => {
      emit('newBtnClick')
    }

    // 表格中 编辑按钮
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    return {
      dataList,
      dataCount,
      pageInfo,
      dateFliter,
      getPageData,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
      moment
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
}

.demo-image__preview .image-slot {
  font-size: 30px;
}
.demo-image__preview .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__preview .el-image {
  width: 100%;
  height: 200px;
}
</style>
