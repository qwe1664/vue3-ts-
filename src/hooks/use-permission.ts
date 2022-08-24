import { useStore } from '@/store'

export function usePermission(
  pageName: string | undefined,
  hanldeName: string
) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${hanldeName}`
  return !!permissions.find((item) => item === verifyPermission)
  // 这里的叹号表示 将它原来的属性取反之后 再取反 转换成布尔值
}
