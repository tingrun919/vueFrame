import axios from '@/libs/api.request'
import { DICT_PREFIX } from "@/config/constants";

// 获取字典最后更新时间   
export const getDictLastModifyDate = (date) => {
	return axios.request({
		url: `/configure/getDictLastModifyDate/${date}`
	})
}

// 字典获取
export const getDict = (params) => {
	let { code, kindCode, value } = params;
	let param = {}
	// 计算规则
	if ("JSGZ" === code) {
		if (value != null) {
			param = { ruleId: value }
		} else {
			param.status = 1;
		}
		return getRankRule(param)
			.then(data => {
				return Promise.resolve(data || []);
			})
			.catch(error => {
				return Promise.reject(error);
			});
	} else if ("CBDW" === code) {
		param = { gradTypes: ["3.1", "3.2", "3.3"] }
		return getTeamByGradeType(param)
			.then(data => {
				return Promise.resolve(data || []);
			})
			.catch(error => {
				return Promise.reject(error);
			});
	} else if ("ZGX_BSJB" === code) {
		let obj = {};
		if (kindCode != null) {
			obj.kindCode = kindCode;
		}
		if (value != null) {
			obj.grandCode = value;
		}
		return getKindsGrade(obj)
			.then(data => {
				return Promise.resolve(data || []);
			})
			.catch(error => {
				return Promise.reject(error);
			});
	} else {
		let dataJson = localStorage.getItem(
			DICT_PREFIX + code
		);
		if (dataJson != null) {
			let data = JSON.parse(dataJson);
			return Promise.resolve(data);
		}
		param = {
			dictCode: code,
			parentId: "",
			isAll: 1
		}
		return axios.request({
			url: '/configure/dict',
			data: param,
			method: 'post'
		})
			.then(data => {
				if (data != null && data.length > 0) {
					localStorage.setItem(
						DICT_PREFIX + code,
						JSON.stringify(data)
					);
				}
				return Promise.resolve(data || []);
			})
			.catch(error => {
				return Promise.reject(error);
			});
	}

}
// 根据团体会员类型获取团体会员列表(赛事公司暂时先传3.11)
export const getTeamByGradeType = (params) => {
	return axios.request({
		url: '/admin/team/queryTeamByGradeType',
		data: params,
		method: 'post'
	})
}
// 比赛等级查询
export const getKindsGrade = (params) => {
	return axios.request({
		url: '/eventsKindsGrade/queryCheckList',
		data: params,
		method: 'post'
	})
}


// 排名规则查询
export const getRankRule = (params) => {
	return axios.request({
		url: '/rankrule/queryAllList',
		data: params,
		method: 'post'
	})
}

// 验证赛事是否正在申请中
export const check = (eventsId) => {
	return axios.request({
		url: `/apply/game/check/${eventsId}`,
		method: 'get'
	})
}
// 验证赛事场次是否正在申请中
export const checkMatch = (fieldId) => {
	return axios.request({
		url: `/apply/game/match/check/${fieldId}`,
		method: 'get'
	})
}
// 正式赛事 验证赛事是否正在申请中
export const checkEvents = (eventsId) => {
	return axios.request({
		url: `/apply/game/checkEvents/${eventsId}`,
		method: 'get'
	})
}


// 获取会员信息
export const getPersonal = (personalId) => {
	return axios.request({
		url: `/admin/member/${personalId}`,
		method: 'get'
	})
}

