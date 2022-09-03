<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="titleDate"
      width="30%"
      center
      destroy-on-close
    >
      <HyForm v-bind="modelConfig" v-model="formData"></HyForm>
      <!-- <button>haha</button> -->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="qxBtn">取消</el-button>
          <el-button type="primary" @click="qdBtn">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from 'vue'
import { useStore } from 'vuex'

import HyForm from '@/base-ui/form'

export default defineComponent({
  components: { HyForm },
  props: {
    modelConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const titleDate = ref('')
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        console.log(newValue, '触发了监听')
        console.log(props.defaultInfo)
        for (const item of props.modelConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    const qxBtn = () => {
      console.log(formData.value)

      dialogVisible.value = false
    }

    const store = useStore()

    // 点击确认按钮的逻辑
    const qdBtn = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      titleDate,
      qxBtn,
      qdBtn
    }
  }
})
</script>

<style lang="less" scoped></style>
