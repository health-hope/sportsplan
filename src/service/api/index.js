import request from '../request'
/**
 * 加载中医特色调理封面内容。
 * @param {String} code 测评编码
 * @param {String} courseKind 运动计划类型
 * @param {String} userId 用户ID
 */
export const apiHomeData = (code, courseKind, userId) => request('/ego-gw/v2/course/cover.do', { code, courseKind, userId })
    /**
     * 获取中医运动计划获取配置信息
     * @param {String} courseKind 运动计划类型，
     * @param {String} userId 
     * @param {String} code 中医X系类型编码， 
     * @param {String} evaluationId  测评结果预创建id，用于从运动计划测评题页面返回到条件页回显个人信息
     */
export const apiConfig = (courseKind, userId, code, evaluationId) => request('/ego-gw/v2/course/tcm/config.do', { courseKind, userId, code, evaluationId })
    /**
     * 获取运动计划测评题
     * @param {String} courseKind 运动计划类型，
     * @param {String} userId 
     * @param {String} code 中医X系类型编码， 
     * @param {String} userInfo  用户信息
     * @param {String} buildId  运动计划构建ID，
     * @param {String} sportWayCode  运动方式
     * @param {String} resultCode  中医测评结果编码，
     */
export const apiSaveConfig = (courseKind, userId, code, userInfo, buildId, sportWayCode, resultCode) => request('/ego-gw/v2/course/tcm/evaluation/subject.do', { courseKind, userId, code, userInfo, buildId, sportWayCode, resultCode })
    /**
     * 中医运动计划保存测评结果
     * @param {String} courseKind 运动计划类型，
     * @param {String} userId 
     * @param {String} userOptions 用户测评选项， 
     * @param {String} evaluationId  用户测评结果预创建Id
     */
export const apiSaveCourse = (courseKind, userId, userOptions, evaluationId) => request('/ego-gw/v2/course/tcm/evaluation/data/save.do', { courseKind, userId, userOptions, evaluationId })
    /**
     * 创建运动计划
     * @param {String} courseKind 运动计划类型，
     * @param {String} userId 
     * @param {String} evaluationId 测评结果ID 
     * @param {String} beginDate  运动计划开始日期
     * @param {String} weeklyExerciseDays  选择周运动日期，取值范围1-7，对应周一至周日
     * @param {String} weekCount  运动计划周数
     */
export const apiSavePlan = (courseKind, userId, evaluationId, beginDate, weeklyExerciseDays, weekCount) => request('/ego-gw/v2/course/create.do', { courseKind, userId, evaluationId, beginDate, weeklyExerciseDays, weekCount })
    /**
     * 运动计划首页
     * @param {String} userId 用户ID
     * @param {String} courseId  运动计划ID
     * @param recordDate 记录日期
     */
export const apiGetPlan = (userId, courseId, recordDate) => request('/ego-gw/v2/course/index.do', { userId, courseId, recordDate })
    /**
     * GIF图文的方式，执行动作拼接运动。
     * @param {String} userId 用户ID
     * @param {String} courseId  运动计划ID
     * @param {String} courseSeq  运动计划第几天/节
     * @param {String} moduleId  运动组件ID
     * @param {String} moduleType  运动组件类型，
     * @param {Object} pageRequest  请求分页信息，
     */
export const apiGetList = (userId, courseId, courseSeq, moduleId, moduleType, pageRequest) => request('/ego-gw/v2/course/tcm/action/gif/module/execute.do', { userId, courseId, courseSeq, moduleId, moduleType, pageRequest })
    /**
     * 中医退出运动计划
     * @param {String} userId 用户ID
     * @param {String} exitWay  退出方式，  2 
     */
export const apiSetPlan = (userId, courseKind, exitWay) => request('/ego-gw/v2/course/tcm/modify.do', { userId, courseKind, exitWay })

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
export const apiEnd = (recordDate, userId, courseId, courseSeq, moduleId, moduleType, executeSecond) => request('/ego-gw/v2/course/tcm/gif/consume/save.do', { recordDate, userId, courseId, courseSeq, moduleId, moduleType, executeSecond })


/**
 * 保存测评内容
 * @param {String} evaluationCode 测评编码
 * @param {Object} userInfo     用户信息
 * @param {Object} userOptions  用户的选项 
 * @param {String} quesBankId   题库id
 */
export const apiSaveevaluationQuestions = (courseKind, userInfo, userId, buildId, userOptions) => request("/ego-gw/v2/course/evaluation/data/save.do", { courseKind, userInfo, userId, buildId, userOptions });
/**
 * 获取测评内容
 * @param {String} evaluationCode 测评编码
 * @param {Object} userInfo     用户信息
 */
export const apiGetevaluationQuestions = (courseKind, userInfo, userId, buildId) => request("/ego-gw/v2/course/evaluation/subject.do", { courseKind, userInfo, userId, buildId });

/**
* 创建运动计划
* @param {String} courseKind	运动计划类型
* @param {String} userId		用户ID
* @param {String}evaluationId		测评结果ID，由“保存运动计划测评结果”接口返回
* @param {Boolean}advance	运动计划是否进阶，默认为false，如产后运动计划存在进阶逻辑
* @param {String}beginDate	运动计划开始日期，必须大于等于当前日期，格式yyyyMMdd
* @param {List} weeklyExerciseDays	选择周运动日期，取值范围1-7，对应周一至周日
* @param {Int} weekCount     运动计划周数
 */

 export const apiSaveCreateSportsPlan = ( courseKind, userId, evaluationId,beginDate,weeklyExerciseDays,weekCount,advance ) => request("/ego-gw/v2/course/create.do", { courseKind,  userId, evaluationId, beginDate, weeklyExerciseDays, weekCount, advance});