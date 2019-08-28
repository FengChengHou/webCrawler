package com.iflyun.webCrawler.dao;

import java.util.List;

import com.iflyun.webCrawler.bean.entity.Function;


public interface FunctionDao extends BaseDao<Function> {
	
	/**
	 * 
	
	* @Title: getFunctionByName 
	
	* @Description: 根据名称获取菜单
	
	* @author wenquxing
	
	* @date 2016年2月24日 上午10:56:23
	
	* @param @param Name
	* @param @return 
	
	* @return List<Function> 
	
	* @throws
	 */
	public List<Function> getFunctionByName(String Name);

}
