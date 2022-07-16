import { App } from 'vue'
import { ElButton, ElForm, ElInput } from 'element-plus'

const components = [ElButton, ElForm, ElInput]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.nam, component)
  }
}
