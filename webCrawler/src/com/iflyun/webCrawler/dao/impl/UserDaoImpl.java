package com.iflyun.webCrawler.dao.impl;

import java.util.HashMap;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.iflyun.webCrawler.bean.entity.User;
import com.iflyun.webCrawler.common.Common;
import com.iflyun.webCrawler.common.util.UcInterface;
import com.iflyun.webCrawler.common.util.Utils;
import com.iflyun.webCrawler.dao.UserDao;

@Repository("userDao")
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {

	@Override
	public HashMap<String, Object> checkLogin(String username, String password) {
		UcInterface uc = new UcInterface();
		Utils utils = new Utils();
		HashMap<String, Object> hash = new HashMap<String, Object>();
		String param = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
				+ "<ehoAppLoginRequest><accountCode>"
				+ username
				+ "</accountCode>"
				+ "<loginSrc>"
				+ Common.loginSrc
				+ "</loginSrc>"
				+ "<password>"
				+ utils.SHA1(password)
				+ "</password>" + "</ehoAppLoginRequest>";
		String str = uc.getResult(param, Common.UCLogin);
		hash = utils.xmlElements(str);
		return hash;
	}

	@Override
	public User saveUser(String userId, String userName, String phone,
			String name) {
		User user = this.get(User.class, userId);
		if (user == null) {
			user = new User();
			user.setId(userId);
			user.setUsername(userName);
			user.setPhone(phone);
			user.setName(name);
			user.setStatus("1");
			this.save(user);
		}
		return user;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.iflyun.webCrawler.dao.UserDao#getUserById(java.lang.String)
	 */
	@Override
	public User getUserById(String id) {
		User user = new User();
		StringBuffer sb = new StringBuffer("from User where id = ");
		sb.append("'" + id + "'");
		List<User> users = this.find(sb.toString());

		if (users.size() > 0) {
			user = users.get(0);
		}

		return user;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.iflyun.webCrawler.dao.UserDao#getUsers()
	 */
	@Override
	public List<User> getUsers(int page, int rows) {
		StringBuffer sb = new StringBuffer("from User");
		List<User> users = this.find(sb.toString(), page, rows);

		return users;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.iflyun.webCrawler.dao.UserDao#getUserNum()
	 */
	@Override
	public long getUserNum() {
		StringBuffer sb = new StringBuffer("from User");
		List<User> us = this.find(sb.toString());
		long c = us.size();
		return c;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.iflyun.webCrawler.dao.UserDao#updateUser(java.lang.String,
	 * java.lang.String, java.lang.String)
	 */
	@Override
	public int updateUser(String userid, String remarks, String status) {

		StringBuffer sb = new StringBuffer("update crawler_user set remarks = '"
				+ remarks + "',status = '" + status + "' where id = '"
				+ userid + "'");
		int i = this.executeSql(sb.toString());
		return i;
	}

}
