package com.iflyun.webCrawler.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.User;
import com.iflyun.webCrawler.dao.UserDao;
import com.iflyun.webCrawler.service.UserService;

@Service("userService")
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {

	@Resource(name="userDao")
	private UserDao userDao;

	@Override
	public HashMap<String, Object> checkLogin(String username, String password) {
		return userDao.checkLogin(username, password);
	}

	@Override
	public User saveUser(String userId,String userName,String phone,String name) {
		return userDao.saveUser(userId,userName,phone,name);
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.service.UserService#getUserById(java.lang.String)
	 */
	@Override
	public User getUserById(String id) {
		return userDao.getUserById(id);
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.service.UserService#getUsers()
	 */
	@Override
	public List<User> getUsers(int currentPageNo,int pageSize) {
		return userDao.getUsers(currentPageNo, pageSize);
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.service.UserService#getUserNum()
	 */
	@Override
	public long getUserNum() {
		return userDao.getUserNum();
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.service.UserService#updateUser(java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public int updateUser(String userid, String remarks, String status) {
		return userDao.updateUser(userid, remarks, status);
	}
}
