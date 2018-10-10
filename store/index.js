import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: "",
		realName:"",
		userNum:"",
		sex:-1,
		academyId:-1,
		gradeId:-1,
		classId:-1,
		userId:-1,
		doneCount:0 ,
		sex:0,
		deptTree:[],
		deptArr:[]
    },
    mutations: {
        login(state, userInfo) {
            state.realName = userInfo.realName;
			state.userName = userInfo.userName;
			state.userNum = userInfo.userNum;
			state.sex = userInfo.sex;
			state.academyId = userInfo.academyId
			state.gradeId = userInfo.gradeId
			state.classId = userInfo.classId
			state.userId = userInfo.userId
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        },
		addDoneCount(state){
			state.doneCount++
		},
		minusDoneCount(state) {
			state.doneCount--
		},
		setDoneCount(state,count) {
			state.doneCount = count
		},
		saveDeptTree(state,deptTree) {
			state.deptTree = deptTree
		},
		saveDeptArr(state,deptArr) {
			state.deptArr = deptArr
		}
    },
	actions:{
		
	},
	getters:{
		
	}
})

export default store
