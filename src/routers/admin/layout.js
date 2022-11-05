// 后台管理
import AdminLayout from "./../../admin/Layout.vue";

// admin 布局
const layout = { path: "/", name: "admin", component: AdminLayout };

// admin 主页
const dashboard = {
  path: "/admin/dashboard",
  name: "admin-dashboard",
  component: () =>
    import(
      /* webpackChunkName: "admin-dashboard" */ "./../../admin/dashboard/Index.vue"
    )
};

// admin 子路由
const children = [
  dashboard,
  {
    path: "/admin/table",
    name: "admin-table",
    component: () =>
      import(
        /* webpackChunkName: "admin-table" */ "./../../admin/table/Example.vue"
      )
  },
  {
    path: "/admin/icon",
    name: "admin-icon",
    component: () =>
      import(
        /* webpackChunkName: "admin-icon" */ "./../../admin/icon/Example.vue"
      )
  },
  {
    path: "/admin/timeline",
    name: "admin-timeline",
    component: () =>
      import(
        /* webpackChunkName: "admin-timeline" */ "./../../admin/timeline/Example.vue"
      )
  },
  {
    path: "/admin/template",
    name: "admin-template",
    component: () =>
        import(
            /* webpackChunkName: "admin-timeline" */ "./../../admin/templates/CommonPageList.vue"
            )
  },
  {
    path: "/admin/dict",
    name: "admin-dict",
    component: () =>
        import(
            /* webpackChunkName: "admin-timeline" */ "./../../admin/base/TbDict.vue"
            )
  },
  {
    path: "/admin/permission",
    name: "admin-permission",
    component: () =>
        import(
            /* webpackChunkName: "admin-timeline" */ "./../../admin/base/TbPermission.vue"
            )
  },
  {
    path: "/admin/role",
    name: "admin-role",
    component: () =>
        import(
            /* webpackChunkName: "admin-timeline" */ "./../../admin/base/TbRole.vue"
            )
  },
  {
    path: "/admin/user",
    name: "admin-user",
    component: () =>
        import(
            /* webpackChunkName: "admin-timeline" */ "./../../admin/base/TbUser.vue"
            )
  },
  {
    path: "/admin/menu",
    name: "admin-menu",
    component: () =>
        import(
            /* webpackChunkName: "admin-timeline" */ "./../../admin/base/TbMenu.vue"
            )
  },
  {
    path: "/admin/common/init",
    name: "admin-common-init",
    component: () =>
        import(
            /* webpackChunkName: "admin-timeline" */ "./../../admin/base/TbCommonInit.vue"
            )
  }
];

// export
export {
  layout as adminLayoutRouter,
  dashboard as adminDashboardRouter,
  children as adminChildrenRouter
};
