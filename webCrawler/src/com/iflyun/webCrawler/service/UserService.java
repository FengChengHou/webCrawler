package com.iflyun.webCrawler.service;

import java.util.HashMap;
import java.util.List;

import com.iflyun.webCrawler.bean.entity.User;

public interface UserService extends BaseService<User>{

	public HashMap<String, Object> checkLogin(String username,String password);
	
	public User saveUser(String userId,String userName,String phone,String name);
	
	public User getUserById(String id);
	
	public List<User> getUsers(int currentPageNo,int pageSize);
	
	public long getUserNum();
	
	public int updateUser(String userid,String remarks,String status);

}
