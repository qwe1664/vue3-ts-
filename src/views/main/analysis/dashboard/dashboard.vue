<template>
  <div class="dashboard">
    <el-row :gutter="15">
      <el-col :span="7">
        <HyCard title="分类商品数量(饼图)">
          <PieEchart :pie-data="categoryGoodsCount"></PieEchart>
        </HyCard>
      </el-col>
      <el-col :span="10"> <HyCard title="不同城市商品销量"></HyCard></el-col>
      <el-col :span="7">
        <HyCard title="分类商品数量(玫瑰图)"></HyCard>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <HyCard title="分类商品的销量"></HyCard>
      </el-col>
      <el-col :span="12">
        <HyCard title="分类商品的收藏"></HyCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import HyCard from '@/base-ui/card'
import { PieEchart } from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: { HyCard, PieEchart },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    return {
      categoryGoodsCount
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 10px;
}
</style>
