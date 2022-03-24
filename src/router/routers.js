export default [

  {
    path: '/',
    name: 'home',
    redirect: '/systemHome',
    component: () => import('@/views/home/index.vue'),
    children: [{
        path: '/systemHome',
        name: 'systemHome',
        component: () => import('@/views/systemHome/index.vue'),
        meta: {
          title: '首页',
          parentId: "systemHome",
          requireAuth: true
        },
      },
      {
        path: '/userManagement',
        name: 'userManagement',
        redirect: '/organization',
        component: () => import('@/views/userManagement/index.vue'),
        meta: {
          title: '用户管理',
          parentId: "userManagement",
          requireAuth: true
        },
        children: [{
            path: '/organization',
            name: 'organization',
            component: () => import('@/views/userManagement/organization.vue'),
            meta: {
              title: '机构管理',
              parentId: "userManagement",
              requireAuth: true
            }
          },
          {
            path: '/userInformation',
            name: 'userInformation',
            component: () => import('@/views/userManagement/userInformation.vue'),
            meta: {
              title: '用户信息管理',
              parentId: "userManagement",
              requireAuth: true
            }
          },
          {
            path: '/rolePermission',
            name: 'rolePermission',
            component: () => import('@/views/userManagement/rolePermission.vue'),
            meta: {
              title: '角色权限管理',
              parentId: "userManagement",
              requireAuth: true

            }
          },
          {
            path: '/groupInfo',
            name: 'groupInfo',
            component: () => import('@/views/userManagement/groupInfo.vue'),
            meta: {
              title: '群组管理',
              parentId: "userManagement",
              requireAuth: true
            }
          },
          {
            path: '/logManagement',
            name: 'logManagement',
            component: () => import('@/views/userManagement/logManagement.vue'),
            meta: {
              title: '日志管理',
              parentId: "userManagement",
              requireAuth: true

            }
          }
        ]
      },
      {
        path: '/requireManagement',
        name: 'requireManagement',
        redirect: '/advancedUser',
        component: () => import('@/views/requireManagement/index.vue'),
        meta: {
          title: '需求处理管理',
          parentId: "advancedUser",
          requireAuth: true
        },
        children: [{
            path: '/advancedUser',
            name: 'advancedUser',
            component: () => import('@/views/requireManagement/advancedUser'),
            meta: {
              title: '高级用户',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/redirectUser',
            name: 'redirectUser',
            component: () => import('@/views/requireManagement/redirectUser'),
            meta: {
              title: '定向用户',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
        ]
      },
      // ------------------------------
      // 基础产品管理
      {
        path: '/basicsRegulate',
        name: 'basicsRegulate',
        redirect: '/basicsProduct',
        component: () => import('@/views/basicsRegulate/index.vue'),
        meta: {
          title: '基础产品管理',
          parentId: "basicsRegulate",
          requireAuth: true
        },
        children: [
          // 基础产品-最新独立配置路由界面-列表-定时任务界面
          {
            path: '/basicsProduct',
            name: 'basicsProduct',
            component: () => import('@/views/basicsRegulate/basicsProduct.vue'),
            meta: {
              title: '基础产品列表',
              parentId: "basicsProduct",
              requireAuth: true
            },
          },
          {
            path: '/basicsProductConfigure',
            name: 'basicsProductConfigure',
            component: () => import('@/views/basicsRegulate/basicsProductConfigure.vue'),
            meta: {
              title: '基础产品配置',
              parentId: "basicsProductConfigure",
              requireAuth: true
            },
          },
          // -----------------------------------------------
          // 基础产品保留原界面路由
          // 基础产品列表
          {
            path: '/trackProducts',
            name: 'trackProducts',
            component: () => import('@/views/productRelease/trackProducts.vue'),
            meta: {
              title: '轨道产品列表',
              parentId: "productRelease",
              requireAuth: true
            }
          },
          {
            path: '/catalogProduct',
            name: 'catalogProduct',
            component: () => import('@/views/productRelease/catalogProduct.vue'),
            meta: {
              title: '编目产品列表',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/dangerousIntersection',
            name: 'dangerousIntersection',
            component: () => import('@/views/productRelease/dangerousIntersection.vue'),
            meta: {
              title: '危险交会',
              parentId: "productRelease",
              requireAuth: true
            }
          },
          {
            path: '/downfall',
            name: 'downfall',
            component: () => import('@/views/productRelease/downfall.vue'),
            meta: {
              title: '陨落',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/breakUp',
            name: 'breakUp',
            component: () => import('@/views/productRelease/breakUp.vue'),
            meta: {
              title: '解体',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/outburst',
            name: 'outburst',
            component: () => import('@/views/productRelease/outburst.vue'),
            meta: {
              title: '突发',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          // 基础产品模板
          {
            path: '/trackTemplate',
            name: 'trackTemplate',
            component: () => import('@/views/templateMangment/trackTemplate.vue'),
            meta: {
              title: '轨道产品生成',
              parentId: "templateMangment",
              requireAuth: true
            }
          },
          {
            path: '/catalogTemplate',
            name: 'catalogTemplate',
            component: () => import('@/views/templateMangment/catalogTemplate.vue'),
            meta: {
              title: '编目产品生成',
              parentId: "templateMangment",
              requireAuth: true
            },
          },
          {
            path: '/downfallTemplate',
            name: 'downfallTemplate',
            component: () => import('@/views/templateMangment/downfallTemplate.vue'),
            meta: {
              title: '空间态势（陨落）',
              parentId: "templateMangment",
              requireAuth: true
            },
          },
          {
            path: '/outburstTemplate',
            name: 'outburstTemplate',
            component: () => import('@/views/templateMangment/outburstTemplate.vue'),
            meta: {
              title: '空间态势（突发）',
              parentId: "templateMangment",
              requireAuth: true
            },
          },
          {
            path: '/breakUpTemplate',
            name: 'breakUpTemplate',
            component: () => import('@/views/templateMangment/breakUpTemplate.vue'),
            meta: {
              title: '空间态势（解体）',
              parentId: "templateMangment",
              requireAuth: true
            },
          },
          {
            path: '/dangerousTemplate',
            name: 'dangerousTemplate',
            component: () => import('@/views/templateMangment/dangerousTemplate.vue'),
            meta: {
              title: '空间态势（危险交会）',
              parentId: "templateMangment",
              requireAuth: true
            }
          },
          // 基础产品配置
          {
            path: '/trackService',
            name: 'trackService',
            component: () => import('@/views/requireManagement/infoProduct/trackService.vue'),
            meta: {
              title: '轨道产品对外服务配置',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/catalogService',
            name: 'catalogService',
            component: () => import('@/views/requireManagement/infoProduct/catalogService.vue'),
            meta: {
              title: '编目产品对外服务配置',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/spaceIntersection',
            name: 'spaceIntersection',
            component: () => import('@/views/requireManagement/infoProduct/spaceIntersection.vue'),
            meta: {
              title: '空间态势报告（交会）对外服务配置',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/spaceBreakup',
            name: 'spaceBreakup',
            component: () => import('@/views/requireManagement/infoProduct/spaceBreakup.vue'),
            meta: {
              title: '空间态势报告（解体）对外服务配置',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/spaceDownfall',
            name: 'spaceDownfall',
            component: () => import('@/views/requireManagement/infoProduct/spaceDownfall.vue'),
            meta: {
              title: '空间态势报告（陨落）对外服务配置',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/outburstTaskAllocation',
            name: 'outburstTaskAllocation',
            component: () => import('@/views/requireManagement/infoProduct/outburstTaskAllocation.vue'),
            meta: {
              title: '突发人工任务配置',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/timedTaskManage',
            name: 'timedTaskManage',
            component: () => import('@/views/requireManagement/taskManage/timedTaskManage/index.vue'),
            meta: {
              title: '定时任务管理',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/trackTaskStrategy',
            name: 'trackTaskStrategy',
            component: () => import('@/views/requireManagement/taskManage/trackTaskStrategy/index.vue'),
            meta: {
              title: '轨道任务策略配置',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/catalogTaskStrategy',
            name: 'catalogTaskStrategy',
            component: () => import('@/views/requireManagement/taskManage/catalogTaskStrategy/index.vue'),
            meta: {
              title: '编目任务策略配置',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/intersectionTaskStrategy',
            name: 'intersectionTaskStrategy',
            component: () => import('@/views/requireManagement/taskManage/intersectionTaskStrategy/index.vue'),
            meta: {
              title: '危险交会任务策略配置',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/downfallTaskStrategy',
            name: 'downfallTaskStrategy',
            component: () => import('@/views/requireManagement/taskManage/downfallTaskStrategy/index.vue'),
            meta: {
              title: '陨落任务策略配置',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/breakupTaskStrategy',
            name: 'breakupTaskStrategy',
            component: () => import('@/views/requireManagement/taskManage/breakupTaskStrategy/index.vue'),
            meta: {
              title: '解体任务策略配置',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
        ]
      },
      // 高级产品管理
      {
        path: '/advancedRegulate',
        name: 'advancedRegulate',
        redirect: '/collisionWarningSpecialReport',
        component: () => import('@/views/advancedRegulate/index.vue'),
        meta: {
          title: '高级产品管理',
          parentId: "advancedRegulate",
          requireAuth: true
        },
        children: [

          // 专项任务报告
          {
            path: '/collisionWarningSpecialReport',
            name: 'collisionWarningSpecialReport',
            component: () => import('@/views/specialReport/collisionWarningSpecialReport.vue'),
            meta: {
              title: '碰撞预警专项报告',
              parentId: "specialReport",
              requireAuth: true
            },
          },
          {
            path: '/breakUpSpecialReport',
            name: 'breakUpSpecialReport',
            component: () => import('@/views/specialReport/breakUpSpecialReport.vue'),
            meta: {
              title: '解体专项报告',
              parentId: "specialReport",
              requireAuth: true
            },
          },
          {
            path: '/fallSpecialReport',
            name: 'fallSpecialReport',
            component: () => import('@/views/specialReport/fallSpecialReport.vue'),
            meta: {
              title: '陨落专项报告',
              parentId: "specialReport",
              requireAuth: true
            },
          },
          {
            path: '/drawNearSpecialReport',
            name: 'drawNearSpecialReport',
            component: () => import('@/views/specialReport/drawNearSpecialReport.vue'),
            meta: {
              title: '接近专项报告',
              parentId: "specialReport",
              requireAuth: true
            },
          },
          {
            path: '/engineDrivenSpecialReport',
            name: 'engineDrivenSpecialReport',
            component: () => import('@/views/specialReport/engineDrivenSpecialReport.vue'),
            meta: {
              title: '机动专项报告',
              parentId: "specialReport",
              requireAuth: true
            },
          },
          // 高级产品列表
          {
            path: '/spaceEventReport',
            name: 'spaceEventReport',
            component: () => import('@/views/productRelease/spaceEventReport.vue'),
            meta: {
              title: '空间事件报告',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/launchCollisionWarning',
            name: 'launchCollisionWarning',
            component: () => import('@/views/productRelease/launchCollisionWarning.vue'),
            meta: {
              title: '发射碰撞预警',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/collisionAvoidance',
            name: 'collisionAvoidance',
            component: () => import('@/views/productRelease/collisionAvoidance'),
            meta: {
              title: '在轨碰撞避碰',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/breakupAnalysis',
            name: 'breakupAnalysis',
            component: () => import('@/views/productRelease/breakupAnalysis/index.vue'),
            meta: {
              title: '解体事件分析',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/downfallAnalysis',
            name: 'downfallAnalysis',
            component: () => import('@/views/productRelease/downfallAnalysis/index.vue'),
            meta: {
              title: '陨落事件分析',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/safetyAvoidanceAnalysis',
            name: 'safetyAvoidanceAnalysis',
            component: () => import('@/views/productRelease/safetyAvoidanceAnalysis.vue'),
            meta: {
              title: '安全规避分析',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/targetCloseTo',
            name: 'targetCloseTo',
            component: () => import('@/views/productRelease/targetCloseTo.vue'),
            meta: {
              title: '目标接近预警产品',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/monthlyReport',
            name: 'monthlyReport',
            component: () => import('@/views/productRelease/monthlyReport.vue'),
            meta: {
              title: '工作月报',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/briefReport',
            name: 'briefReport',
            component: () => import('@/views/productRelease/briefReport.vue'),
            meta: {
              title: '工作简报',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/specialReport',
            name: 'specialReport',
            component: () => import('@/views/productRelease/specialReport.vue'),
            meta: {
              title: '工作专报-危险交会',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/specialDisassemblyReport',
            name: 'specialDisassemblyReport',
            component: () => import('@/views/productRelease/specialDisassemblyReport.vue'),
            meta: {
              title: '工作专报-解体',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/specialFallReport',
            name: 'specialFallReport',
            component: () => import('@/views/productRelease/specialFallReport.vue'),
            meta: {
              title: '工作专报-陨落',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          // 高级产品模板
          {
            path: '/spaceEventTemplate',
            name: 'spaceEventTemplate',
            component: () => import('@/views/templateMangment/spaceEventTemplate.vue'),
            meta: {
              title: '空间碎片事件模板',
              requireAuth: true
            },
          },
          {
            path: '/warningTrackTemplate',
            name: 'warningTrackTemplate',
            component: () => import('@/views/templateMangment/warningTrackTemplate.vue'),
            meta: {
              title: '在轨碰撞模板',
              requireAuth: true
            },
          },
          {
            path: '/warningDissolutionTemplate',
            name: 'warningDissolutionTemplate',
            component: () => import('@/views/templateMangment/warningDissolutionTemplate.vue'),
            meta: {
              title: '解体事件模板',
              requireAuth: true
            },
          },
          {
            path: '/warningFallTemplate',
            name: 'warningFallTemplate',
            component: () => import('@/views/templateMangment/warningFallTemplate.vue'),
            meta: {
              title: '陨落事件模板',
              requireAuth: true
            },
          },
          {
            path: '/warningLaunchTemplate',
            name: 'warningLaunchTemplate',
            component: () => import('@/views/templateMangment/warningLaunchTemplate.vue'),
            meta: {
              title: '发射碰撞模板',
              requireAuth: true
            },
          },
          {
            path: '/warningSafetyTemplate',
            name: 'warningSafetyTemplate',
            component: () => import('@/views/templateMangment/warningSafetyTemplate.vue'),
            meta: {
              title: '安全规避模板',
              requireAuth: true
            },
          },

          {
            path: '/monthReportTemplate',
            name: 'monthReportTemplate',
            component: () => import('@/views/templateMangment/monthReportTemplate.vue'),
            meta: {
              title: '工作月报模板',
              parentId: "templateMangment",
              requireAuth: true
            },
          },
          {
            path: '/briefReportsTemplate',
            name: 'briefReportsTemplate',
            component: () => import('@/views/templateMangment/briefReportsTemplate.vue'),
            meta: {
              title: '工作简报模板',
              parentId: "templateMangment",
              requireAuth: true
            },
          },
          {
            path: '/specialReportsRiskTemplate',
            name: 'specialReportsRiskTemplate',
            component: () => import('@/views/templateMangment/specialReportsRiskTemplate.vue'),
            meta: {
              title: '危险交会模板',
              requireAuth: true
            },
          },
          {
            path: '/specialReportsBreakTemplate',
            name: 'specialReportsBreakTemplate',
            component: () => import('@/views/templateMangment/specialReportsBreakTemplate.vue'),
            meta: {
              title: '解体事件模板',
              requireAuth: true
            },
          },
          {
            path: '/specialReportsFallTemplate',
            name: 'specialReportsFallTemplate',
            component: () => import('@/views/templateMangment/specialReportsFallTemplate.vue'),
            meta: {
              title: '再入陨落模板',
              requireAuth: true
            },
          },
          {
            path: '/launchForeign',
            name: 'launchForeign',
            component: () => import('@/views/requireManagement/analyseProduct/launchForeign.vue'),
            meta: {
              title: '发射碰撞预警',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/InorbitColWarn',
            name: 'InorbitColWarn',
            component: () => import('@/views/requireManagement/analyseProduct/InorbitColWarn.vue'),
            meta: {
              title: '在轨碰撞预警',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/disintegrateAnalyse',
            name: 'disintegrateAnalyse',
            component: () => import('@/views/requireManagement/analyseProduct/disintegrateAnalyse.vue'),
            meta: {
              title: '解体事件分析',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/reentryFall',
            name: 'reentryFall',
            component: () => import('@/views/requireManagement/analyseProduct/reentryFall.vue'),
            meta: {
              title: '再入陨落分析',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/safetyAvoidance',
            name: 'safetyAvoidance',
            component: () => import('@/views/requireManagement/analyseProduct/safetyAvoidance.vue'),
            meta: {
              title: '安全规避分析',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/spaceReport',
            name: 'spaceReport',
            component: () => import('@/views/requireManagement/analyseProduct/spaceReport.vue'),
            meta: {
              title: '空间事件报告',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/workMonthly',
            name: 'workMonthly',
            component: () => import('@/views/requireManagement/integrationProduct/workMonthly.vue'),
            meta: {
              title: '工作月报',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/workBrief',
            name: 'workBrief',
            component: () => import('@/views/requireManagement/integrationProduct/workBrief.vue'),
            meta: {
              title: '工作简报',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/dangerIntersection',
            name: 'dangerIntersection',
            component: () => import('@/views/requireManagement/integrationProduct/dangerIntersection.vue'),
            meta: {
              title: '危险交会',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/downfallReport',
            name: 'downfallReport',
            component: () => import('@/views/requireManagement/integrationProduct/downfallReport.vue'),
            meta: {
              title: '解体事件',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/emergency',
            name: 'emergency',
            component: () => import('@/views/requireManagement/integrationProduct/emergency.vue'),
            meta: {
              title: '再入陨落',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/launchRasterVect',
            name: 'launchRasterVect',
            component: () => import('@/views/rasterVect/launchRasterVect/index.vue'),
            meta: {
              title: '发射编辑工具',
              requireAuth: true
            },
          },
          {
            path: '/fallRasterVect',
            name: 'fallRasterVect',
            component: () => import('@/views/rasterVect/fallRasterVect/index.vue'),
            meta: {
              title: '陨落编辑工具',
              requireAuth: true
            },
          },
          {
            path: '/trackGabbardGraph',
            name: 'trackGabbardGraph',
            component: () => import('@/views/rasterVect/breakupRasterVect/trackGabbardGraph'),
            meta: {
              title: '碎片轨道gabbard图',
              requireAuth: true
            },
          },
          {
            path: '/trackDistributionMap',
            name: 'trackDistributionMap',
            component: () => import('@/views/rasterVect/breakupRasterVect/trackDistributionMap'),
            meta: {
              title: '轨道面分布图',
              requireAuth: true
            },
          },
          {
            path: '/relativeDistanceChangeMap',
            name: 'relativeDistanceChangeMap',
            component: () => import('@/views/rasterVect/breakupRasterVect/relativeDistanceChangeMap'),
            meta: {
              title: '碎片相对距离变化图',
              requireAuth: true
            },
          },
          {
            path: '/intersectionDistanceChangeMap',
            name: 'intersectionDistanceChangeMap',
            component: () => import('@/views/rasterVect/breakupRasterVect/intersectionDistanceChangeMap'),
            meta: {
              title: '碎片交互距离变化图',
              requireAuth: true
            },
          },
          {
            path: '/semiMajorAxisChangeMap',
            name: 'semiMajorAxisChangeMap',
            component: () => import('@/views/rasterVect/breakupRasterVect/semiMajorAxisChangeMap'),
            meta: {
              title: '轨道半长轴变化图',
              requireAuth: true
            },
          },
          {
            path: '/continuityChangeMap',
            name: 'continuityChangeMap',
            component: () => import('@/views/rasterVect/breakupRasterVect/continuityChangeMap'),
            meta: {
              title: '空间碎片环境变化图',
              requireAuth: true
            },
          },
        ]
      },
      // 定向产品管理
      {
        path: '/orientRegulate',
        name: 'orientRegulate',
        redirect: '/capabilityProduct',
        component: () => import('@/views/orientRegulate/index.vue'),
        meta: {
          title: '定向产品管理',
          parentId: "orientRegulate",
          requireAuth: true
        },
        children: [
          // 定向产品列表
          {
            path: '/capabilityProduct',
            name: 'capabilityProduct',
            component: () => import('@/views/productRelease/capabilityProduct.vue'),
            meta: {
              title: '系统能力产品',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          {
            path: '/stateProduct',
            name: 'stateProduct',
            component: () => import('@/views/productRelease/stateProduct.vue'),
            meta: {
              title: '系统状态产品',
              parentId: "productRelease",
              requireAuth: true
            },
          },
          // 定向产品模板
          {
            path: '/systemAbility',
            name: 'systemAbility',
            component: () => import('@/views/templateMangment/systemAbility.vue'),
            meta: {
              title: '系统能力产品模板',
              parentId: "templateMangment",
              requireAuth: true
            },
          }, {
            path: '/systemState',
            name: 'systemState',
            component: () => import('@/views/templateMangment/systemState.vue'),
            meta: {
              title: '系统状态产品模板',
              parentId: "templateMangment",
              requireAuth: true
            },
          },
          // 定向产品配置
          {
            path: '/systemCapability',
            name: 'systemCapability',
            component: () => import('@/views/requireManagement/integrationProduct/systemCapability.vue'),
            meta: {
              title: '系统能力信息产品',
              parentId: "requireManagement",
              requireAuth: true
            },
          },
          {
            path: '/systemStatus',
            name: 'systemStatus',
            component: () => import('@/views/requireManagement/integrationProduct/systemStatus.vue'),
            meta: {
              title: '系统状态信息产品',
              parentId: "requireManagement",
              requireAuth: true

            },
          },
        ]
      },
      //数据导入导出管理
      {
        path: '/dataImportExport',
        name: 'dataImportExport',
        redirect: '/importConfiguration',
        component: () => import('@/views/dataImportExport/index.vue'),
        meta: {
          title: '数据导入导出管理',
          parentId: "dataImportExport",
          requireAuth: true
        },
        children: [{
            path: '/dataImportManagement',
            name: 'dataImportManagement',
            component: () => import('@/views/dataImportExport/dataImportManagement.vue'),
            meta: {
              title: '数据导入管理',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/dataExportManagement',
            name: 'dataExportManagement',
            component: () => import('@/views/dataImportExport/dataExportManagement.vue'),
            meta: {
              title: '数据导出管理',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/importConfiguration',
            name: 'importConfiguration',
            component: () => import('@/views/dataImportExport/importConfiguration.vue'),
            meta: {
              title: '数据导入配置',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportConfiguration',
            name: 'exportConfiguration',
            component: () => import('@/views/dataImportExport/exportConfiguration.vue'),
            meta: {
              title: '数据导出配置',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          // 数据导入管理
          {
            path: '/importProcess',
            name: 'importProcess',
            component: () => import('@/views/dataImportExport/importProcess.vue'),
            meta: {
              title: '测试',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/importInterProcess',
            name: 'importInterProcess',
            component: () => import('@/views/dataImportExport/importInterProcess.vue'),
            meta: {
              title: '测试',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          // 数据导入管理
          {
            path: '/exportProcess',
            name: 'exportProcess',
            component: () => import('@/views/dataImportExport/exportProcess.vue'),
            meta: {
              title: '测试',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/serviceNetwork',
            name: 'serviceNetwork',
            component: () => import('@/views/dataImportExport/serviceNetwork.vue'),
            meta: {
              title: '测试',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportInterProcess',
            name: 'exportInterProcess',
            component: () => import('@/views/dataImportExport/exportInterProcess.vue'),
            meta: {
              title: '测试',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/importUserInformation',
            name: 'importUserInformation',
            component: () => import('@/views/dataImportExport/internalProcessing/importUserInformation.vue'),
            meta: {
              title: '用户信息',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/importOrdinaryUser',
            name: 'importOrdinaryUser',
            component: () => import('@/views/dataImportExport/internalProcessing/importOrdinaryUser.vue'),
            meta: {
              title: '一般用户信息',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/importSeniorUser',
            name: 'importOrdinaryUser',
            component: () => import('@/views/dataImportExport/internalProcessing/importSeniorUser.vue'),
            meta: {
              title: '高级用户信息',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/importGovernmentUser',
            name: 'importGovernmentUser',
            component: () => import('@/views/dataImportExport/internalProcessing/importGovernmentUser.vue'),
            meta: {
              title: '政府用户需求',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/importdigitalData',
            name: 'importdigitalData',
            component: () => import('@/views/dataImportExport/internalProcessing/importdigitalData.vue'),
            meta: {
              title: '数传星务数据',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/importRocketData',
            name: 'importRocketData',
            component: () => import('@/views/dataImportExport/internalProcessing/importRocketData.vue'),
            meta: {
              title: '火箭发射导弹数据',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/importUserLog',
            name: 'importUserLog',
            component: () => import('@/views/dataImportExport/internalProcessing/importUserLog.vue'),
            meta: {
              title: '用户日志信息',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/importUsermessage',
            name: 'importUsermessage',
            component: () => import('@/views/dataImportExport/internalProcessing/importUsermessage.vue'),
            meta: {
              title: '用户留言',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/exportTrackProduct',
            name: 'exportTrackProduct',
            component: () => import('@/views/dataImportExport/externalService/productProcess/exportTrackProduct.vue'),
            meta: {
              title: '轨道产品',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/exportCatalogProduct',
            name: 'exportCatalogProduct',
            component: () => import('@/views/dataImportExport/externalService/productProcess/exportCatalogProduct.vue'),
            meta: {
              title: '编目产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportSpaceReport',
            name: 'exportSpaceReport',
            component: () => import('@/views/dataImportExport/externalService/productProcess/exportSpaceReport.vue'),
            meta: {
              title: '空间态势报告',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportWarningProduct',
            name: 'exportWarningProduct',
            component: () => import('@/views/dataImportExport/externalService/productProcess/exportWarningProduct.vue'),
            meta: {
              title: '在轨预警产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportLaunchWarning',
            name: 'exportLaunchWarning',
            component: () => import('@/views/dataImportExport/externalService/productProcess/exportLaunchWarning.vue'),
            meta: {
              title: '发射预警产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportDisintegrationProduct',
            name: 'exportDisintegrationProduct',
            component: () => import('@/views/dataImportExport/externalService/productProcess/exportDisintegrationProduct.vue'),
            meta: {
              title: '解体事件分析产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportFallProduct',
            name: 'exportFallProduct',
            component: () => import('@/views/dataImportExport/externalService/productProcess/exportFallProduct.vue'),
            meta: {
              title: '再入陨落分析产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportSecurityAvoidanceProduct',
            name: 'exportSecurityAvoidanceProduct',
            component: () => import('@/views/dataImportExport/externalService/productProcess/exportSecurityAvoidanceProduct.vue'),
            meta: {
              title: '安全规避分析产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportSpaceEvent',
            name: 'exportSpaceEvent',
            component: () => import('@/views/dataImportExport/externalService/productProcess/exportSpaceEvent.vue'),
            meta: {
              title: '空间事件报告',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportMonthReport',
            name: 'exportMonthReport',
            component: () => import('@/views/dataImportExport/externalService/productProcess/exportMonthReport.vue'),
            meta: {
              title: '工作月报',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportBriefReport',
            name: 'exportBriefReport',
            component: () => import('@/views/dataImportExport/externalService/productProcess/exportBriefReport.vue'),
            meta: {
              title: '工作简报',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportSpecialReport',
            name: 'exportSpecialReport',
            component: () => import('@/views/dataImportExport/externalService/productProcess/exportSpecialReport.vue'),
            meta: {
              title: '工作专报',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportTable',
            name: 'exportTable',
            component: () => import('@/views/dataImportExport/externalService/dataProcess/exportTable.vue'),
            meta: {
              title: '预警分析结果表',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/exportUserDemand',
            name: 'exportUserDemand',
            component: () => import('@/views/dataImportExport/externalService/dataProcess/exportUserDemand.vue'),
            meta: {
              title: '用户需求响应消息',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportUserMessages',
            name: 'exportUserMessages',
            component: () => import('@/views/dataImportExport/externalService/dataProcess/exportUserMessages.vue'),
            meta: {
              title: '用户信息管理消息',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/exportUserFeedback',
            name: 'exportUserFeedback',
            component: () => import('@/views/dataImportExport/externalService/dataProcess/exportUserFeedback.vue'),
            meta: {
              title: '用户留言反馈',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          // 数据导出管理
          {
            path: '/exportUserUserinfo',
            name: 'exportUserUserinfo',
            component: () => import('@/views/dataImportExport/exportProcessingArea/exportUserUserinfo.vue'),
            meta: {
              title: '用户信息',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/exportSeniorUser',
            name: 'exportSeniorUser',
            component: () => import('@/views/dataImportExport/exportProcessingArea/exportSeniorUser.vue'),
            meta: {
              title: '高级用户需求',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/exportShuChuanXinWuData',
            name: 'exportShuChuanXinWuData',
            component: () => import('@/views/dataImportExport/exportProcessingArea/exportShuChuanXinWuData.vue'),
            meta: {
              title: '数传星务数据',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/exportLaunchTrajectory',
            name: 'exportLaunchTrajectory',
            component: () => import('@/views/dataImportExport/exportProcessingArea/exportLaunchTrajectory.vue'),
            meta: {
              title: '火箭发射弹道数据',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/exportuserLogInformation',
            name: 'exportuserLogInformation',
            component: () => import('@/views/dataImportExport/exportProcessingArea/exportuserLogInformation.vue'),
            meta: {
              title: '用户日志信息',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/exportuserMessage',
            name: 'exportuserMessage',
            component: () => import('@/views/dataImportExport/exportProcessingArea/exportuserMessage.vue'),
            meta: {
              title: '用户留言',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          // 到处内部处理
          {
            path: '/importTrackProduct',
            name: 'importTrackProduct',
            component: () => import('@/views/dataImportExport/interiorService/productProcess/importTrackProduct.vue'),
            meta: {
              title: '轨道产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importCatalogProduct',
            name: 'importCatalogProduct',
            component: () => import('@/views/dataImportExport/interiorService/productProcess/importCatalogProduct.vue'),
            meta: {
              title: '编目产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importSpaceReport',
            name: 'importSpaceReport',
            component: () => import('@/views/dataImportExport/interiorService/productProcess/importSpaceReport.vue'),
            meta: {
              title: '空间态势报告',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importWarningProduct',
            name: 'importWarningProduct',
            component: () => import('@/views/dataImportExport/interiorService/productProcess/importWarningProduct.vue'),
            meta: {
              title: '在轨预警产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importLaunchWarning',
            name: 'importLaunchWarning',
            component: () => import('@/views/dataImportExport/interiorService/productProcess/importLaunchWarning.vue'),
            meta: {
              title: '发射预警产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importDisintegrationProduct',
            name: 'importDisintegrationProduct',
            component: () => import('@/views/dataImportExport/interiorService/productProcess/importDisintegrationProduct.vue'),
            meta: {
              title: '解体事件分析产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importFallProduct',
            name: 'importFallProduct',
            component: () => import('@/views/dataImportExport/interiorService/productProcess/importFallProduct.vue'),
            meta: {
              title: '再入陨落分析产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importSecurityAvoidanceProduct',
            name: 'importSecurityAvoidanceProduct',
            component: () => import('@/views/dataImportExport/interiorService/productProcess/importSecurityAvoidanceProduct.vue'),
            meta: {
              title: '安全规避分析产品',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importSpaceEvent',
            name: 'importSpaceEvent',
            component: () => import('@/views/dataImportExport/interiorService/productProcess/importSpaceEvent.vue'),
            meta: {
              title: '空间事件报告',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importMonthReport',
            name: 'importMonthReport',
            component: () => import('@/views/dataImportExport/interiorService/productProcess/importMonthReport.vue'),
            meta: {
              title: '工作月报',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importBriefReport',
            name: 'importBriefReport',
            component: () => import('@/views/dataImportExport/interiorService/productProcess/importBriefReport.vue'),
            meta: {
              title: '工作简报',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importSpecialReport',
            name: 'importSpecialReport',
            component: () => import('@/views/dataImportExport/interiorService/productProcess/importSpecialReport.vue'),
            meta: {
              title: '工作专报',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importTable',
            name: 'importTable',
            component: () => import('@/views/dataImportExport/interiorService/dataProcess/importTable.vue'),
            meta: {
              title: '预警分析结果表',
              parentId: "dataImportExport",
              requireAuth: true
            }
          },
          {
            path: '/importUserDemand',
            name: 'importUserDemand',
            component: () => import('@/views/dataImportExport/interiorService/dataProcess/importUserDemand.vue'),
            meta: {
              title: '用户需求响应消息',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importUserMessages',
            name: 'importUserMessages',
            component: () => import('@/views/dataImportExport/interiorService/dataProcess/importUserMessages.vue'),
            meta: {
              title: '用户信息管理消息',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
          {
            path: '/importUserFeedback',
            name: 'importUserFeedback',
            component: () => import('@/views/dataImportExport/interiorService/dataProcess/importUserFeedback.vue'),
            meta: {
              title: '用户留言反馈',
              parentId: "dataImportExport",
              requireAuth: true

            }
          },
        ]
      },
      //数据同步管理
      {
        path: '/dataSyncMange',
        name: 'dataSyncMange',
        redirect: '/syncConfigur',
        component: () => import('@/views/dataSyncMange/index.vue'),
        meta: {
          title: '预警任务请求管理',
          parentId: "dataSyncMange",
          requireAuth: true
        },
        children: [{
            path: "/syncConfigur",
            name: "syncConfigur",
            component: () => import('@/views/dataSyncMange/syncConfigur.vue'),
            meta: {
              title: '数据同步配置管理',
              parentId: "dataSyncMange",
              requireAuth: true
            },
          },
          {
            path: "/syncTasks",
            name: "syncTasks",
            component: () => import('@/views/dataSyncMange/syncTasks.vue'),
            meta: {
              title: '数据同步任务管理',
              parentId: "dataSyncMange",
              requireAuth: true
            },
          }
        ]
      },
      {
        path: '/videoManagement',
        name: 'videoManagement',
        redirect: '/weihai-1',
        component: () => import('@/views/videoManagement/index.vue'),
        meta: {
          title: '视频管理',
          parentId: "videoManagement",
          requireAuth: true
        },
        children: [
          // {
          //   path: '/videoEquipment',
          //   name: 'videoEquipment',
          //   component: () => import('@/views/videoManagement/videoEquipment.vue'),
          //   meta: {
          //     title: '设备视频',
          //     parentId: "videoManagement"

          //   },
          // },
          {
            path: '/weihai-1',
            name: 'weihai-1',
            component: () => import('@/views/videoManagement/weihai-1.vue'),
            meta: {
              title: '威海1.2米口径望远镜',
              parentId: "videoManagement",
              requireAuth: true

            },
          },
          {
            path: '/weihai-2',
            name: 'weihai-2',
            component: () => import('@/views/videoManagement/weihai-2.vue'),
            meta: {
              title: '威海2.5米口径望远镜',
              parentId: "videoManagement",
              requireAuth: true

            },
          },
          {
            path: '/ali',
            name: 'ali',
            component: () => import('@/views/videoManagement/ali.vue'),
            meta: {
              title: '阿里1.2米口径望远镜',
              parentId: "videoManagement",
              requireAuth: true

            },
          },
          {
            path: '/zhili-1',
            name: 'zhili-1',
            component: () => import('@/views/videoManagement/zhili-1.vue'),
            meta: {
              title: '智利1.2米口径望远镜',
              parentId: "videoManagement",
              requireAuth: true

            },
          },
          {
            path: '/zhili-2',
            name: 'zhili-2',
            component: () => import('@/views/videoManagement/zhili-2.vue'),
            meta: {
              title: '智利2.5米口径望远镜',
              parentId: "videoManagement",
              requireAuth: true

            },
          },
          {
            path: '/zhili-3',
            name: 'zhili-3',
            component: () => import('@/views/videoManagement/zhili-3.vue'),
            meta: {
              title: '新一代超大视场阵列',
              parentId: "videoManagement",
              requireAuth: true

            },
          },
          {
            path: '/xinjiangObserve',
            name: 'xinjiangObserve',
            component: () => import('@/views/videoManagement/xinjiangObserve.vue'),
            meta: {
              title: '新疆观测站',
              parentId: "videoManagement",
              requireAuth: true
            }
          },
          {
            path: '/africaObserve',
            name: 'africaObserve',
            component: () => import('@/views/videoManagement/africaObserve.vue'),
            meta: {
              title: '非洲埃及观测站',
              parentId: "videoManagement",
              requireAuth: true
            },
          },
          {
            path: '/aliObserve',
            name: 'aliObserve',
            component: () => import('@/views/videoManagement/aliObserve.vue'),
            meta: {
              title: '阿里观测站',
              parentId: "videoManagement",
              requireAuth: true
            }
          },
          {
            path: '/zhiliObserve',
            name: 'zhiliObserve',
            component: () => import('@/views/videoManagement/zhiliObserve.vue'),
            meta: {
              title: '南美智利观测站',
              parentId: "videoManagement",
              requireAuth: true
            }
          },
          {
            path: '/jilinObserve',
            name: 'jilinObserve',
            component: () => import('@/views/videoManagement/jilinObserve.vue'),
            meta: {
              title: '吉林观测站',
              parentId: "videoManagement",
              requireAuth: true
            }
          },
          {
            path: '/weihaiObserve',
            name: 'weihaiObserve',
            component: () => import('@/views/videoManagement/weihaiObserve.vue'),
            meta: {
              title: '威海观测站',
              parentId: "videoManagement",
              requireAuth: true
            }
          },
          {
            path: '/spaceDebris',
            name: 'spaceDebris',
            component: () => import('@/views/videoManagement/spaceDebris.vue'),
            meta: {
              title: '空间碎片监测中心（北京）',
              parentId: "videoManagement",
              requireAuth: true
            }
          },
          {
            path: '/backup',
            name: 'backup',
            component: () => import('@/views/videoManagement/backup.vue'),
            meta: {
              title: '灾备中心（库尔勒）',
              parentId: "videoManagement",
              requireAuth: true
            }
          },
          {
            path: '/securityVideo',
            name: 'securityVideo',
            component: () => import('@/views/videoManagement/securityVideo.vue'),
            meta: {
              title: '安防视频',
              parentId: "videoManagement",
              requireAuth: true
            }
          },

          {
            path: '/earlyWarningVisualization',
            name: 'earlyWarningVisualization',
            component: () => import('@/views/videoManagement/earlyWarningVisualization.vue'),
            meta: {
              title: '预警可视化',
              parentId: "videoManagement",
              requireAuth: true

            }
          }
        ]
      },
      {
        path: '/guestbookManage',
        name: 'guestbookManage',
        redirect: "messageProcessing",
        component: () => import('@/views/guestbookManage/index.vue'),
        meta: {
          title: '用户留言管理',
          parentId: "guestbookManage",
          requireAuth: true
        },
        children: [{
            path: "/accountApply",
            name: "accountApply",
            component: () => import('@/views/guestbookManage/accountApply.vue'),
            meta: {
              title: '账号申请',
              parentId: "guestbookManage",
              requireAuth: true
            },
          },
          {
            path: "/productApply",
            name: "productApply",
            component: () => import('@/views/guestbookManage/productApply.vue'),
            meta: {
              title: '产品申请',
              parentId: "guestbookManage",
              requireAuth: true
            },
          },
          {
            path: "/productService",
            name: "productService",
            component: () => import('@/views/guestbookManage/productService.vue'),
            meta: {
              title: '产品服务',
              parentId: "guestbookManage",
              requireAuth: true
            },
          },
          {
            path: "/messageBack",
            name: "messageBack",
            component: () => import('@/views/guestbookManage/messageBack.vue'),
            meta: {
              title: '留言反馈',
              parentId: "guestbookManage",
              requireAuth: true
            },
          },
          {
            path: "/messageProcessing",
            name: "messageProcessing",
            component: () => import('@/views/guestbookManage/messageProcessing.vue'),
            meta: {
              title: '留言处理',
              parentId: "guestbookManage",
              requireAuth: true
            },
          },
          {
            path: "/messageStatistics",
            name: "messageStatistics",
            component: () => import('@/views/guestbookManage/messageStatistics.vue'),
            meta: {
              title: '留言统计',
              parentId: "guestbookManage",
              requireAuth: true
            },
          },
          {
            path: "/messageBackStatistics",
            name: "messageBackStatistics",
            component: () => import('@/views/guestbookManage/messageBackStatistics.vue'),
            meta: {
              title: '留言反馈统计',
              parentId: "guestbookManage",
              requireAuth: true
            },
          }
        ]
      },
      {
        path: '/regulationManage',
        name: 'regulationManage',
        redirect: "law",
        component: () => import('@/views/regulationManage/index.vue'),
        meta: {
          title: '相关法规管理',
          parentId: "regulationManage",
          requireAuth: true
        },
        children: [{
            path: "/law",
            name: "law",
            component: () => import('@/views/regulationManage/law.vue'),
            meta: {
              title: '法律',
              parentId: "regulationManage",
              requireAuth: true
            },
          },
          {
            path: "/watchLaw",
            name: "watchLaw",
            component: () => import('@/views/regulationManage/watchLaw/watchLaw.vue'),
            meta: {
              title: '查看',
              parentId: "regulationManage",
              requireAuth: true
            },
          },
          {
            path: "/admissionRegulation",
            name: "admissionRegulation",
            component: () => import('@/views/regulationManage/admissionRegulation.vue'),
            meta: {
              title: '行政法规',
              parentId: "regulationManage",
              requireAuth: true
            },
          },
          {
            path: "/localRegulation",
            name: "localRegulation",
            component: () => import('@/views/regulationManage/localRegulation.vue'),
            meta: {
              title: '地方性法规',
              parentId: "regulationManage",
              requireAuth: true
            }
          },
          {
            path: "/stateDepartmentRules",
            name: "stateDepartmentRules",
            component: () => import('@/views/regulationManage/stateDepartmentRules.vue'),
            meta: {
              title: '国务院部门规章',
              parentId: "regulationManage",
              requireAuth: true
            },
          },
          {
            path: "/localGovernmentAct",
            name: "localGovernmentAct",
            component: () => import('@/views/regulationManage/localGovernmentAct.vue'),
            meta: {
              title: '地方政府规章',
              parentId: "regulationManage",
              requireAuth: true
            },
          },
          {
            path: "/internationalPact",
            name: "internationalPact",
            component: () => import('@/views/regulationManage/internationalPact.vue'),
            meta: {
              title: '国际公约',
              parentId: "regulationManage",
              requireAuth: true
            }
          }
        ]
      },
      {
        path: '/publicProclamation',
        name: 'publicProclamation',
        redirect: "noticeManagement",
        component: () => import('@/views/publicProclamation/index.vue'),
        meta: {
          title: '公告公示管理',
          parentId: "publicProclamation",
          requireAuth: true
        },
        children: [{
            path: "/noticeManagement",
            name: "noticeManagement",
            component: () => import('@/views/publicProclamation/noticeManagement.vue'),
            meta: {
              title: '公告管理',
              parentId: "publicProclamation",
              requireAuth: true
            },
          },
          {
            path: "/publicManagement",
            name: "publicManagement",
            component: () => import('@/views/publicProclamation/publicManagement.vue'),
            meta: {
              title: '公示管理',
              parentId: "publicProclamation",
              requireAuth: true
            },
          },
          {
            path: "/informManagement",
            name: "informManagement",
            component: () => import('@/views/publicProclamation/informManagement.vue'),
            meta: {
              title: '通知管理',
              parentId: "publicProclamation",
              requireAuth: true
            }
          }
        ]
      },
      {
        path: '/softwareDownload',
        name: 'softwareDownload',
        component: () => import('@/views/softwareDownload/index.vue'),
        meta: {
          title: '软件下载',
          parentId: "softwareDownload",
          requireAuth: true
        }
      },
      {
        path: '/dataStatistics',
        name: 'dataStatistics',
        redirect: "monitorData",
        component: () => import('@/views/dataStatistics/index.vue'),
        meta: {
          title: '数据统计',
          parentId: "dataStatistics",
          requireAuth: true

        },
        children: [{
            path: '/monitorData',
            name: 'monitorData',
            component: () => import('@/views/dataStatistics/monitorData/index.vue'),
            meta: {
              title: '监测数据量统计',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },
          {
            path: '/catalogInfo',
            name: 'catalogInfo',
            component: () => import('@/views/dataStatistics/catalogueData/index.vue'),
            meta: {
              title: '编目信息量统计',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },
          {
            path: '/dangerCartogram',
            name: 'dangerCartogram',
            component: () => import('@/views/dataStatistics/dangerCartogram/index.vue'),
            meta: {
              title: '空间碎片危险交会统计',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },
          {
            path: '/launchWindowCartogram',
            name: 'launchWindowCartogram',
            component: () => import('@/views/dataStatistics/launchWindowCartogram/index.vue'),
            meta: {
              title: '卫星发射窗口统计',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },
          {
            path: '/decayCartogram',
            name: 'decayCartogram',
            component: () => import('@/views/dataStatistics/decayCartogram/index.vue'),
            meta: {
              title: '空间物体陨落统计',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },
          {
            path: '/foreignDemand',
            name: 'foreignDemand',
            component: () => import('@/views/dataStatistics/foreignDemand/foreignDemand.vue'),
            meta: {
              title: '外来需求统计',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },
          {
            path: '/roleStatistics',
            name: 'roleStatistics',
            component: () => import('@/views/dataStatistics/foreignDemand/roleStatistics.vue'),
            meta: {
              title: '外来需求角色统计',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },
          {
            path: '/unitStatistics',
            name: 'unitStatistics',
            component: () => import('@/views/dataStatistics/foreignDemand/unitStatistics.vue'),
            meta: {
              title: '外来需求单位统计',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },
          {
            path: '/externalService',
            name: 'externalService',
            component: () => import('@/views/dataStatistics/externalService/externalService.vue'),
            meta: {
              title: '对外服务统计',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },
          {
            path: '/unitExternal',
            name: 'unitExternal',
            component: () => import('@/views/dataStatistics/externalService/unitExternal.vue'),
            meta: {
              title: '对外服务单位统计',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },
          {
            path: '/productExternal',
            name: 'productExternal',
            component: () => import('@/views/dataStatistics/externalService/productExternal.vue'),
            meta: {
              title: '对外服务产品类型统计',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },

          // {
          //   path: '/userLog',
          //   name: 'userLog',
          //   component: () => import('@/views/dataStatistics/userLog.vue'),
          //   meta: {
          //     title: '用户日志',
          //     parentId: "dataStatistics",
          //     requireAuth: true
          //   }
          // },
          {
            path: '/userLogStatistics',
            name: 'userLogStatistics',
            component: () => import('@/views/dataStatistics/userLogStatistics'),
            meta: {
              title: '用户日志',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },
          {
            path: '/userSuggestion',
            name: 'userSuggestion',
            component: () => import('@/views/dataStatistics/userSuggestion'),
            meta: {
              title: '用户意见',
              parentId: "dataStatistics",
              requireAuth: true
            }
          },
          {
            path: '/answering',
            name: 'answering',
            component: () => import('@/views/dataStatistics/answering/index.vue'),
            meta: {
              title: '留言回复',
              parentId: "dataStatistics",
              requireAuth: true
            }
          }
        ]
      },
      {
        path: '/workStatement',
        name: 'workStatement',
        redirect: "dailyWorkReport",
        component: () => import('@/views/workStatement/index.vue'),
        meta: {
          title: '工作报告',
          parentId: "workStatement",
          requireAuth: true

        },
        children: [{
            path: '/dailyWorkReport',
            name: 'dailyWorkReport',
            component: () => import('@/views/workStatement/dailyWorkReport.vue'),
            meta: {
              title: '工作日报',
              parentId: "dailyWorkReport",
              requireAuth: true
            }
          },
          {
            path: '/weeklyWorkReport',
            name: 'weeklyWorkReport',
            component: () => import('@/views/workStatement/weeklyWorkReport.vue'),
            meta: {
              title: '工作周报',
              parentId: "weeklyWorkReport",
              requireAuth: true
            }
          },
        ]
      }
    ]
  },

  // =====登录页相关路由=====
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/user/register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/passwordChange',
    name: 'passwordChange',
    component: () => import('@/views/user/passwordChange.vue'),
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/newEditor',
    name: 'newEditor',
    component: () => import('@/views/regulationManage/newEditor.vue'),
    meta: {
      title: '创建富文本',
      parentId: "regulationManage",
      requireAuth: true
    }
  },
  {
    path: '/pbwEditor',
    name: 'pbwEditor',
    component: () => import('@/views/regulationManage/pbwEditor.vue'),
    meta: {
      title: '预览富文本',
      parentId: "regulationManage",
      requireAuth: true
    }
  },
  {
    path: "/redGreenAndFigure",
    name: 'redGreenAndFigure',
    component: () => import('@/views/rasterVect/launchRasterVect/redGreenAndFigure.vue'),
    meta: {
      title: '红绿图',
      parentId: "redGreenAndFigure",
      requireAuth: true
    }
  },
  {
    path: '/timedTask',
    name: 'timedTask',
    component: () => import('@/views/timedTask/index.vue'),
    meta: {
      title: '定时任务',
      parentId: "timedTask",
      requireAuth: true
    }
  },
]