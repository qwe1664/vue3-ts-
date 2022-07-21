import { App } from 'vue'
import {
  ElButton,
  ElForm,
  ElInput,
  ElTable,
  ElTabPane,
  ElFormItem,
  ElCheckbox,
  ElLink
} from 'element-plus'

const components = [
  ElButton,
  ElForm,
  ElInput,
  ElTable,
  ElTabPane,
  ElFormItem,
  ElCheckbox,
  ElLink
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.nam, component)
  }
}
