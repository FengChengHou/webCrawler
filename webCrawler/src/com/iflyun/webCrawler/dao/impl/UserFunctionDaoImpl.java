package com.iflyun.webCrawler.dao.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.iflyun.webCrawler.bean.entity.UserFunction;
import com.iflyun.webCrawler.dao.UserFunctionDao;

@Repository("userFunctionDao")
public class UserFunctionDaoImpl extends BaseDaoImpl<UserFunction> implements
		UserFunctionDao {

	@Override
	public List<UserFunction> getUserFunctionByUser(String userid) {
		// TODO Auto-generated method stub
		StringBuffer sql = new StringBuffer(
				" from UserFunction where user.id = ");
		sql.append("'" + userid
				+ "' and status = '1' order by function.function_code");
		List<UserFunction> userFunctionList = this.find(sql.toString());
		return userFunctionList;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.iflyun.webCrawler.dao.UserFunctionDao#updateUserFunction(java.lang
	 * .String, java.lang.String[])
	 */
	@Override
	public int updateUserFunction(String userid, String[] id) {

		StringBuffer sb = new StringBuffer(
				"delete from crawler_user_function where userid = '" + userid + "'");

		this.executeSql(sb.toString());

		if (id != null && id.length > 0) {

		}
		for (int i = 0; i < id.length; i++) {
			String ufid = UUID.randomUUID().toString();
			StringBuffer sb1 = new StringBuffer(
					"insert into crawler_user_function(id,userid,functionid,status) values('"
							+ ufid + "','" + userid + "','" + id[i] + "','1')");
			this.executeSql(sb1.toString());
		}

		return 1;
	}

}
