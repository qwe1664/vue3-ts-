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
        <HyCard title="分类商品数量(玫瑰图)">
          <RoseEchart :rose-data="categoryGoodsCount"></RoseEchart>
        </HyCard>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <HyCard title="分类商品的销量">
          <LineEchart v-bind="categoryGoodsSale"></LineEchart>
        </HyCard>
      </el-col>
      <el-col :span="12">
        <HyCard title="分类商品的收藏">
          <BaseEchart v-bind="categoryGoodsFavor"></BaseEchart>
        </HyCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import HyCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BaseEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: { HyCard, PieEchart, RoseEchart, LineEchart, BaseEchart },
  setup() {
    // 请求数据
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    // 获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 10px;
}
</style>
