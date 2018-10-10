class ExamControl {
	// 考试ID以及考试类型，目前就3种，一种模拟考试，一种真实考试，一种练习模式
	constructor() {
		this.totalQues = 0; // 练习模式下,所有题目的数量和
		this.practiceHistory = Object.create(null);
		this.questionsList = [];
		this.questionMap = Object.create(null);
		this.answerMap = Object.create(null);
		this.questionArr = [] // 从服务端取得的问题原始数组
		this.questionNum = 0; // 当前arr中的题目数量
		this.doneList = []
	}
	// 这里所有的index都指真实从后台传过来的index顺序
	/**
	 * answerMap里面是每个问题的状态信息
	 * done 是否做完       模拟考，正式考
	 * selection 已做题的选择项 1-4   模拟考，正式考
	 * 
	 * 
	 */
	// 初始化控制器
	initControl(examId, examType) {
		this.examId = examId;
		this.examType = examType; // 0 正式考试  1  模拟考试   2   练习模式
		this.resetAll()
	}

	resetAll() {
		this.questionMap = Object.create(null);
		this.answerMap = Object.create(null);
		this.practiceHistory = Object.create(null);
		this.doneList = []
		this.questionArr = [] // 从服务端取得的问题原始数组
		this.questionNum = 0;
	}
	
	getQuestionIdByIndex(index){
		return this.questionArr[index-1]
	}

	setUserOptionForPrac(qid, userOption) {
		this.practiceHistory[qid] = this.practiceHistory[qid] || {};
		this.practiceHistory[qid].userOption = userOption;
	}

	//设置问题数组的
	setQuestionArr(arr) {
		let len = arr.length;
		this.questionArr = arr;
		this.questionNum = len;
	}


	// 训练中，将懒加载的数据加入数组
	appendMoreIntoArr(newArr) {
		let tempArr = this.questionArr.concat(newArr);
		this.questionArr = tempArr;
		this.questionNum = tempArr.length;
	}


	// 考试模式下，标记已经做过
	fillDoneList(qid, clientIndex) {
		this.doneList[clientIndex] = qid;
	}

	// 标记已做
	markDone(qid, answerIndex) {
		if (this.answerMap[qid]) {
			this.answerMap[qid].answerType = 'done';
			this.answerMap[qid].selection = answerIndex;
		} else {
			this.answerMap[qid] = {}
			this.answerMap[qid].answerType = 'done';
			this.answerMap[qid].selection = answerIndex;
		}
	}

	// 标记正确
	markRight(qid, rightIndex) {
		if (this.answerMap[qid]) {
			this.answerMap[qid].answerType = 'right';
			this.answerMap[qid].rightIndex = rightIndex;
		} else {
			this.answerMap[qid] = {}
			this.answerMap[qid].answerType = 'right';
			this.answerMap[qid].rightIndex = rightIndex;
		}
	}

	// 标记错误
	markWrong(qid, rightIndex, wrongIndex) {
		if (this.answerMap[qid]) {
			this.answerMap[qid].answerType = 'wrong';
			this.answerMap[qid].rightIndex = rightIndex;
			this.answerMap[qid].wrongIndex = wrongIndex;
		} else {
			this.answerMap[qid] = {}
			this.answerMap[qid].answerType = 'wrong';
			this.answerMap[qid].rightIndex = rightIndex;
			this.answerMap[qid].wrongIndex = wrongIndex;
		}
	}


	// 用于清除答案
	resetPerAnswer(qid) {
		this.answerMap[qid] = null
	}


	// 确认是否已答题
	checkAnswer(qid) {
		if (this.answerMap[qid]) return true;
		return false;
	}

	// 交卷的时候获取答案
	getAnswers() {
		return {
			doneList: this.doneList,
			answers: this.answerMap
		}
	}

	// 缓存已下载的问题，不用再次请求网络获取题目
	cacheQuestion(questionObj) {
		if (!this.questionMap[questionObj.questionId]) {
			this.questionMap[questionObj.questionId] = questionObj;
		}
	}

	getQuestion(qid) {
		return this.questionMap[qid]
	}

	// 测验是否缓存
	checkIfCached(qid) {
		if (this.questionMap[qid]) {
			return true;
		} else {
			return false;
		}
	}


}

export default ExamControl;
