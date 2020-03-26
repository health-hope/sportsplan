/**
 * @param {Boolean} cache 是否启用路由缓存
 * @param {String} title document.title字段
 */
const routes = [{
        path: '/',
        name: 'home',
        component: () =>
            import ('@/views/home/Home.vue'),
        meta: { cache: false, title: '运动计划' }
    },
    {
        path: '/plan',
        name: 'plan',
        component: () =>
            import ('@/views/plan/Plan.vue'),
        meta: { cache: false, title: '我的运动计划' }
    },
    {
        path: '/timetable',
        name: 'timetable',
        component: () =>
            import ('@/views/timetable/Timetable.vue'),
        meta: { cache: false, title: '我的运动计划' }
    },
    {
        path: '/detail',
        name: 'detail',
        component: () =>
            import ('@/views/xwDetail/Detail.vue'),
        meta: { cache: false, title: '我的运动计划' }
    },
    {
        path: '/end',
        name: 'end',
        component: () =>
            import ('@/views/end/End.vue'),
        meta: { cache: false, title: '我的运动计划' }
    },
    {
        path: '/basicinfo',
        name: 'basicinfo',
        component: () =>
            import ('@/views/basicinfo/BasicInfo.vue'),
        meta: { cache: false, title: '基础信息' }
    },
    {
        path: '/sportsassessment',
        name: 'sportsassessment',
        component: () =>
            import ('@/views/sportsassessment/SportsAssessment.vue'),
        meta: { cache: false, title: '运动风险评估' }
    },
    {
        path: '/questions',
        name: 'questions',
        component: () =>
            import ('@/views/questions/Questions.vue'),
        meta: { cache: false, title: '测评题目' }
    },
    {
        path: '/cycle',
        name: 'cycle',
        component: () =>
            import ('@/views/cycle/Cycle.vue'),
        meta: { cache: false, title: '' }
    },
    {
        path: '/selecttime',
        name: 'selecttime',
        component: () =>
            import ('@/views/selecttime/selectTime.vue'),
        meta: { cache: false, title: '' }
    },
    {
        path: '/selectday',
        name: 'selectday',
        component: () =>
            import ('@/views/selectday/selectDay.vue'),
        meta: { cache: false, title: '' }
    }
]
export default routes