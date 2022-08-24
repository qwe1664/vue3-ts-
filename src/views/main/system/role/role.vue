<template>
  <div class="role">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="role"
    ></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'role',
  components: { PageContent, PageSearch },
  setup() {
    console.log(contentTableConfig)

    return {
      contentTableConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
