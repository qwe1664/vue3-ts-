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
      ></PageContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchFormConfig } from './config/search.config'
// 封装的表格列表以及表格标题和序号是否展示
import { contentTableConfig } from './config/content.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'users',
  components: { PageSearch, PageContent },
  setup() {
    const [pageContentRef, resetBtnClick, handleQuery] = usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleQuery,
      resetBtnClick
    }
  }
})
</script>

<style scoped></style>
