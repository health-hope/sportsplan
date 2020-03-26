import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import step from './modules/step'
import createPersistedState from 'vuex-persistedstate'
const store = new Vuex.Store({
    state: {
        code: '',
        userInfo: {},
        courseKind: '',
        listObj: {},
        course: '',
        check: 'no',
        scrollLeft: 0,
        consumedKcal: 0,
        executeSecond: 0,
        startTime: 0,
        buildId: "",
        dayPlans: [],
        evaluationId: "", //测评结果ID
        showGender:true, //显示性别
    },
    mutations: {
        setGender(state, paylod){
            state.showGender = paylod
        },
        setCode(state, paylod) {
            state.code = paylod;
            state.courseKind = paylod;
        },
        setUserId(state, paylod) {
            state.userInfo.userId = paylod
        },
        setListObj(state, paylod) {
            state.listObj = paylod
        },
        setCourse(state, paylod) {
            state.course = paylod
        },
        setCheck(state, paylod) {
            state.check = paylod
        },
        setScrollLeft(state, paylod) {
            state.scrollLeft = paylod
        },
        setConsumedKcal(state, paylod) {
            state.consumedKcal = paylod
        },
        setExecuteSecond(state, paylod) {
            state.executeSecond = paylod
        },
        setStartTime(state, paylod) {
            state.startTime = paylod
        },
        setbuildId(state, paylod) {
            state.buildId = paylod
        },
        setDayPlans(state, paylod) {
            state.dayPlans = paylod
        },
        setEvaluationId(state, paylod) {
            state.evaluationId = paylod
        },
    },
    modules: {
        step
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})
export default store