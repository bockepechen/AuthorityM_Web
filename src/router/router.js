import Mains from '../views/main.vue'

export const page404 ={
  path: '/*',
  name: 'error-404',
  meta: {
      title: '404-页面不存在'
  },
  component: () => import('@/views/error-page/404.vue')
}
export const loginRouter ={
  path: '/login',
  name: 'login',
  meta: {
      title: '登录'
  },
  component: () => import('@/views/login.vue')
}
export const locking = {
  path: '/locking',
  name: 'locking',
  component: () => import('@/views/lockscreen/components/locking-page.vue')
};
export const testApi = {
    path: '/testApi',
    name: 'testApi',
    component: () => import('@/views/testApi/testApi.vue')
  };
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Mains,
  children: [
      { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
      
  ]
};
export const appRouter = [
  
  {
    path: '/component',
    icon: 'social-buffer',
    name: 'component',
    title: '组件',
    component: Mains,
    children:[
      {path:'home',title:'home',name:'home_index',component:()=>import('@/views/home/home.vue')},
      {path:'image-editor',title:'image-editor',name:'image-editor',component:()=>import('@/views/my-components/image-editor/image-editor.vue')},
      {path:'text-editor',title:'text-editor',name:'text-editor',component:()=>import('@/views/my-components/text-editor/text-editor.vue')},

    ]

  },
  {
    path: '/tables',
    icon: 'ios-grid-view',
    name: 'tables',
    title: '表格',
    component: Mains,
    children: [
        { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/tables/dragable-table.vue') },
        { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: () => import('@/views/tables/editable-table.vue') },
        { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: () => import('@/views/tables/searchable-table.vue') },
        { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: () => import('@/views/tables/exportable-table.vue') },
        { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: () => import('@/views/tables/table-to-image.vue') }
      ]
  },
  {
    path: '/advanced-router',
    icon: 'ios-infinite',
    name: 'advanced-router',
    title: '高级路由',
    component: Mains,
    children: [
          { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: () => import('@/views/advanced-router/mutative-router.vue') },
          { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/advanced-router/argument-page.vue') },
          { path: 'order-info/:id', title: '带参详情页面', name: 'order-info', icon: 'android-send', component: () => import('@/views/advanced-router/order-info.vue') }
      ]
  },
  {
    path: '/form',
    icon: 'android-checkbox',
    name: 'form',
    title: '表单编辑',
    component: Mains,
    children: [
        { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish.vue') },
        { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow.vue') }

      ]
  },
  {
    path: '/company',
    icon: 'key',
    name: 'company',
    title: '公司管理',
    component: Mains,
    children: [
        {
            path: 'insert',
            icon: 'compose',
            name: 'insert',
            title: '新增',
            component: () => import('@/views/company/insert.vue')
        },
        {
            path: 'update',
            icon: 'compose',
            name: 'update',
            title: '修改',
            component: () => import('@/views/company/update.vue')
        },
        {
            path: 'detail',
            icon: 'compose',
            name: 'detail',
            title: '详情',
            component: () => import('@/views/company/detail.vue')
        },
        {
            path: 'list',
            icon: 'compose',
            name: 'list',
            meta:{title:'列表'},
            title: '列表',
            component: () => import('@/views/company/list.vue')
        },
        {
            path: 'insertstaff',
            icon: 'compose',
            name: 'insertstaff',
            title: '新增',
            component: () => import('@/views/staff/insert.vue')
        },
        {
            path: 'updatestaff',
            icon: 'compose',
            name: 'updatestaff',
            title: '修改',
            component: () => import('@/views/staff/update.vue')
        },
        {
            path: 'detailstaff',
            icon: 'compose',
            name: 'detailstaff',
            title: '详情',
            component: () => import('@/views/staff/detail.vue')
        },
        {
            path: 'liststaff',
            icon: 'compose',
            name: 'liststaff',
            meta:{title:'列表'},
            title: '列表',
            component: () => import('@/views/staff/list.vue')
        },
        
    ]
  },
  {
    path:'/organization',
    name:'organization',
    title:'参与者管理',
    component: Mains,
    children:[
        { path: 'listorganization', meta:{title:'机构管理'}, name: 'listorganization', icon: 'compose', component: () => import('@/views/organization/list.vue') },
        { path: 'insertorganization', meta:{title:'新增机构'}, name: 'insertorganization', icon: 'compose', component: () => import('@/views/organization/insert.vue') },  
        { path: 'updateorganization/:id', meta:{title:'修改机构'}, name: 'updateorganization', icon: 'compose', component: () => import('@/views/organization/update.vue') },  
        { path: 'listuser', meta:{title:'用户管理'}, name: 'listuser', icon: 'compose', component: () => import('@/views/organization/user/list.vue') }, 
        { path: 'insertuser', meta:{title:'新增用户'}, name: 'insertuser', icon: 'compose', component: () => import('@/views/organization/user/insert.vue') }, 
        { path: 'updateuser/:id', meta:{title:'修改用户'}, name: 'updateuser', icon: 'compose', component: () => import('@/views/organization/user/update.vue') }, 
        { path: 'otoUser', meta:{title:'新增用户'}, name: 'otoUser', icon: 'compose', component: () => import('@/views/organization/otoUser.vue') }, 
        { path: 'organizationtoUser', meta:{title:'机构-用户管理'}, name: 'organizationtoUser', icon: 'compose', component: () => import('@/views/organization/organizationtoUser.vue') }, 
        { path: 'usertoRole', meta:{title:'用户-角色管理'}, name: 'usertoRole', icon: 'compose', component: () => import('@/views/organization/user/usertoRole.vue') }, 
    ]
  },
  {
    path: '/menu',
    icon: 'android-checkbox',
    name: 'menu',
    title: '菜单管理',
    component: Mains,
    children: [
        { path: 'insert', title: '新增', name: 'insert', icon: 'compose', component: () => import('@/views/menu/parent/insert.vue') },
        { path: 'detail', title: '新增', name: 'detail', icon: 'compose', component: () => import('@/views/menu/parent/detail.vue') },
        { path: 'update', title: '新增', name: 'update', icon: 'compose', component: () => import('@/views/menu/parent/update.vue') },
        { path: 'list', meta:{title:'菜单管理'},title: '新增', name: 'listmenu', icon: 'compose', component: () => import('@/views/menu/parent/list.vue') },
        { path: 'insertchild', title: '新增', name: 'insertchild', icon: 'compose', component: () => import('@/views/menu/child/insert.vue') },
        { path: 'detailchild', title: '新增', name: 'detailchild', icon: 'compose', component: () => import('@/views/menu/child/detail.vue') },
        { path: 'updatechild', title: '新增', name: 'updatechild', icon: 'compose', component: () => import('@/views/menu/child/update.vue') },
        { path: 'listchild', meta:{title:'列表'},title: '新增', name: 'listchild', icon: 'compose', component: () => import('@/views/menu/child/list.vue') },
        { path: 'listconfig', meta:{title:'菜单配置'},title: '菜单配置', name: 'listconfig', icon: 'compose', component: () => import('@/views/menu/parent/config.vue') },
        { path: 'tree', meta:{title:'树组件'},title: '树组件', name: 'tree', icon: 'compose', component: () => import('@/views/menu/parent/tree.vue') },


      ]
  },
  {
    path: '/authority',
    icon: 'android-checkbox',
    name: 'authority',
    title: '岗位管理',
    component: Mains,
    children: [
        { path: 'insertrole', title: '新增', name: 'insertrole', icon: 'compose', component: () => import('@/views/authority/role/insert.vue') },
        { path: 'detailrole', title: '新增', name: 'detailrole', icon: 'compose', component: () => import('@/views/authority/role/detail.vue') },
        { path: 'updaterole', meta:{title:'修改角色'}, name: 'updaterole', icon: 'compose', component: () => import('@/views/authority/role/update.vue') },
        { path: 'listrole',meta:{title:'角色列表'}, title: '新增', name: 'listrole', icon: 'compose', component: () => import('@/views/authority/role/list.vue') },
        { path: 'insertjob', title: '新增', name: 'insertjob', icon: 'compose', component: () => import('@/views/authority/job/insert.vue') },
        { path: 'detailjob', title: '新增', name: 'detailjob', icon: 'compose', component: () => import('@/views/authority/job/detail.vue') },
        { path: 'updatejob', title: '新增', name: 'updatejob', icon: 'compose', component: () => import('@/views/authority/job/update.vue') },
        { path: 'listjob', meta:{title:'岗位管理'},title: '新增', name: 'listjob', icon: 'compose', component: () => import('@/views/authority/job/list.vue') },
        { path: 'listauthority', meta:{title: '菜单授权'}, name: 'listauthority', icon: 'compose', component: () => import('@/views/authority/list.vue') },

      ]
  }
  

]

export const routers = [
 
  loginRouter,
  otherRouter,
  locking,
  ...appRouter,
  testApi,
  page404,

];