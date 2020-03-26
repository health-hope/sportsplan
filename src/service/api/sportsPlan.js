import request from '../request'

/**
 * 运动计划首页
 * @param {String} userId 用户ID
 * @param {String} courseId  运动计划ID
 * @param recordDate 记录日期
 */
export const apiGetPlan = (userId, courseId, recordDate) => request('/ego-gw/v2/course/index.do', {
        userId,
        courseId,
        recordDate
    })
    /**
     * 运动计划列表
     * @param {String} userId 用户ID
     * @param {String} courseId  运动计划ID
     */
export const apiGetPlanList = (userId, courseId) => request('/ego-gw/v2/course/plans/list_view.do', {
        userId,
        courseId
    })
    /**
     * GIF图文的方式，执行动作拼接运动。
     * @param {String} userId 用户ID
     * @param {String} courseId  运动计划ID
     * @param {String} courseSeq  运动计划第几天/节
     * @param {String} moduleId  运动组件ID
     * @param {String} moduleType  运动组件类型，
     * @param {Object} pageRequest  请求分页信息，
     */
export const apiGetList = (userId, courseId, courseSeq, moduleId, moduleType, pageRequest) => request('/ego-gw/v2/course/action/gif/module/execute.do', {
        userId,
        courseId,
        courseSeq,
        moduleId,
        moduleType,
        pageRequest
    })
    /**
     * 退出运动计划
     * @param {String} userId 用户ID
     * @param {String} exitWay  退出方式，  2 
     */
export const apiSetPlan = (userId, courseId, exitWay) => request('/ego-gw/v2/course/exit.do', {
    userId,
    courseId,
    exitWay
})

/**
 * 结束训练
 * @param {String} recordDate 记录日期，
 * @param {String} userId  用户ID
 * @param {String} courseId  运动计划ID
 * @param {String} courseSeq  运动计划第几天/节
 * @param {String} moduleId  运动组件ID
 * @param {String} moduleType  运动组件类型，
 * @param {String} executeSecond  用时，
 */
export const apiEnd = (recordDate, userId, courseId, courseSeq, moduleId, moduleType, executeSecond) => request('/ego-gw/v2/course/gif/consume/save.do', {
        recordDate,
        userId,
        courseId,
        courseSeq,
        moduleId,
        moduleType,
        executeSecond
    })
    /**
     * 修改开始时间
     */
export const apiEditDate = (courseId, beginDate) => request('/ego-gw/v2/course/begin_date/update.do', {
    courseId,
    beginDate,
})