package com.iflyun.webCrawler.dao;

import java.util.HashMap;
import java.util.List;

import com.iflyun.webCrawler.bean.entity.User;

public interface UserDao extends BaseDao<User>{
	
	/**
	 * 
	* @Title: checkLogin 
	* @Description: 校验用户登录
	* @author byxs
	* @date 2016年2月22日 上午11:33:21
	* @param username
	* @param password
	* @return
	* @return HashMap<String,Object> 
	* @throws
	 */
	public HashMap<String, Object> checkLogin(String username,String password);
	
	/**
	 * 
	* @Title: saveUser 
	* @Description: 存储用户
	* @author byxs
	* @date 2016年2月22日 下午2:01:19
	* @param user
	* @return 
	* @return User 
	* @throws
	 */
	public User saveUser(String userId,String userName,String phone,String name);
	
	/**
	 * 
	
	* @Title: getUserById 
	
	* @Description:根据id获取用户信息 
	
	* @author wxy
	
	* @date 2016年2月29日 下午4:44:34
	
	* @param @param id
	* @param @return 
	
	* @return User 
	
	* @throws
	 */
	public User getUserById(String id);
	
	/**
	 * 
	
	* @Title: getUsers 
	
	* @Description: TODO(这里用一句话描述这个方法的作用) 
	
	* @author wxy
	
	* @date 2016年3月1日 下午3:08:19
	
	* @param @return 
	
	* @return List<User> 
	
	* @throws
	 */
	public List<User> getUsers(int currentPageNo, int pageSize);
	
	/**
	 * 
	
	* @Title: getUserNum 
	
	* @Description: TODO(这里用一句话描述这个方法的作用) 
	
	* @author wxy
	
	* @date 2016年3月1日 下午3:36:01
	
	* @param @return 
	
	* @return long 
	
	* @throws
	 */
	public long getUserNum();
	
	/**
	 * 
	
	* @Title: updateUser 
	
	* @Description: TODO(这里用一句话描述这个方法的作用) 
	
	* @author wxy
	
	* @date 2016年3月1日 下午6:44:34
	
	* @param @param userid
	* @param @param remarks
	* @param @param status
	* @param @return 
	
	* @return int 
	
	* @throws
	 */
	public int updateUser(String userid,String remarks,String status);

}
