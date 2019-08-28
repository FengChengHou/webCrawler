package com.iflyun.webCrawler.dao;

import java.util.List;

import com.iflyun.webCrawler.bean.entity.UserFunction;


public interface UserFunctionDao extends BaseDao<UserFunction> {
	
	/**
	 * 
	
	* @Title: getUserFunctionByUser 
	
	* @Description: 根据user 获取菜单
	
	* @author wenquxing
	
	* @date 2016年2月24日 上午10:56:06
	
	* @param @param userid
	* @param @return 
	
	* @return List<UserFunction> 
	
	* @throws
	 */
	public List<UserFunction> getUserFunctionByUser(String userid);
	
	/**
	 * 
	
	* @Title: updateUserFunction 
	
	* @Description: TODO(这里用一句话描述这个方法的作用) 
	
	* @author wxy
	
	* @date 2016年3月1日 下午6:51:39
	
	* @param @param userid
	* @param @param id
	* @param @return 
	
	* @return int 
	
	* @throws
	 */
	public int updateUserFunction(String userid,String[] id);

}
