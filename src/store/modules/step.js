const step = {
    namespaced: true,   // 开启命名空间
    state: {
        cofigOptions: {},
        step3Data: {}
    },
    /**
     * 同步改变state
     */
    mutations: {
        setConfigData(state, paylod) {
            state.cofigOptions = paylod
        },
        setStep3Data(state, paylod) {
            state.step3Data = paylod
        }
    },
    /**
     * 异步改变state
     */
    actions: {
        
    },
    /**
     * 计算属性
     */
    getters: {
        
    }
}
export default step
