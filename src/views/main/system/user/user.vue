<template>
  <div class="user">
    <div class="search">
      <PageSearch
        :searchFormConfig="searchFormConfig"
        @queryBtnClick="handleQuery"
        @resetBtnClick="resetBtnClick"
      />

      <PageContent
        :contentTableConfig="contentTableConfig"
        pageName="users"
        ref="pageContentRef"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      ></PageContent>
      <PageModal
        :defaultInfo="defaultInfo"
        ref="pageModalRef"
        pageName="users"
        :modelConfig="modalConfigRef"
      ></PageModal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '@/store'

import { searchFormConfig } from './config/search.config'
// 封装的表格列表以及表格标题和序号是否展示
import { contentTableConfig } from './config/content.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { modelConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'users',
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const [pageContentRef, resetBtnClick, handleQuery] = usePageSearch()

    // pageModal相关的hook逻辑
    // 1、处理密码的逻辑
    const newCallback = () => {
      const passwordItem = modelConfig.formItems.find((item) => {
        return item.field === 'password'
      })
      // 可以进行一个判断这个是否有值，如果确定不写if判断的话可以关掉eslint的警告
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const editCallback = () => {
      const passwordItem = modelConfig.formItems.find((item) => {
        return item.field === 'password'
      })
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }

    // 2、动态添加角色和部门
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      if (departmentItem) {
        departmentItem.options = store.state.entireDepartment.map((item) => {
          return { title: item.name, value: item.id }
        })
      }

      const roleItem = modelConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      if (roleItem) {
        roleItem.options = store.state.entireRole.map((item) => {
          return { title: item.name, value: item.id }
        })
      }
      return modelConfig
    })

    // 3、调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleQuery,
      resetBtnClick,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
