<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <template v-if="isFold">
        <Expand />
      </template>
      <template v-else>
        <Fold />
      </template>
    </el-icon>
    <div class="content">
      <HyBreadcrumb :breadcrumbs="breadcrumb" />

      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>用户信息</el-dropdown-item>
              <el-dropdown-item>系统管理</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Fold, Expand, ArrowDown } from '@element-plus/icons-vue'
import store, { useStore } from '@/store'
import { useRoute } from 'vue-router'
import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'

// import { useStore } from '@/store'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  emits: ['foldChange'],
  components: { Fold, Expand, ArrowDown, HyBreadcrumb },
  setup(props, { emit }) {
    const isFold = ref(false)
    const store = useStore()

    const name = computed(() => store.state.login.userInfo.name)

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据
    const breadcrumb = computed(() => {
      const userMenus = store.state.login.userMenus
      const router = useRoute()
      const currentPath = router.path

      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      name,
      breadcrumb,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
