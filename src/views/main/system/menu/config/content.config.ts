export const contentTableConfig = {
  title: '菜单列表', // 表格上面的大标题
  showIndexCoumn: false,
  showSelectColumn: false,
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url', minWidth: '60' },
    { prop: 'icon', label: '菜单icon', minWidth: '60' },
    { prop: 'permission', label: '按钮权限', minWidth: '60' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: ' createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '125',
      slotName: 'handler'
    }
  ],
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
