const getters = {
    sidebar: state => state.app.sidebar,
    language: state => state.app.language,
    loading: state => state.app.loading,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    userId: state => state.user.userId,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    status: state => state.user.status,
    roles: state => state.user.roles,
    privileges: state => state.user.privileges,
    buttonPrivileges: state => state.user.buttonPrivileges,
    projectPrivileges: state => state.user.projectPrivileges,
    projectButtonPrivileges: state => state.user.projectButtonPrivileges,
    setting: state => state.user.setting,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    isProject: state => state.permission.isProject,
    errorLogs: state => state.errorLog.logs,
    checkAuth: state => state.auth.checkAuth,
    fileUrl: state => state.dictionary.fileUrl,
    dictMap: state => state.dictionary.dictMap,
    hideLayout: state => state.dictionary.hideLayout,
    isFull: state => state.dictionary.isFull,
    messageNum: state => state.dictionary.messageNum,
    moduleId: state => state.project.moduleId,
    projectOrgId: state => state.project.projectOrgId
  }
  
  export default getters

  