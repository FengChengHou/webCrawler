package com.iflyun.webCrawler.dao;

import java.util.List;

import com.iflyun.webCrawler.bean.entity.UrlStatus;

public interface UrlStatusDao extends BaseDao<UrlStatus>{
	
	public String getVersion();

	public List<UrlStatus> urlStatusGrid();
	
	public List<UrlStatus> getUrlStatusList(int page,int rows,String dept);
	
	public List<UrlStatus> getUrlStatusListByTeam(int page,int rows,String teamid );
	
	public long getTotal(String dept);
	
	/**
	 * 
	
	* @Title: getTotalByTeam 
	
	* @Description: 根据团队获取接口监测条数
	
	* @author wenquxing
	
	* @date 2016年2月29日 下午4:29:16
	
	* @param @param teamid
	* @param @return 
	
	* @return long 
	
	* @throws
	 */
	public long getTotalByTeam(String teamid);
}
