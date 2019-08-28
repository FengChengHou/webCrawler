package com.iflyun.webCrawler.service;

import java.util.List;

import com.iflyun.webCrawler.bean.entity.UrlStatus;

public interface UrlStatusService extends BaseService<UrlStatus> {
	
	public String getVersion();
	
	public List<UrlStatus> urlStatusGrid();
	
	public List<UrlStatus> getUrlStatusList(int page,int rows,String dept);
	
	public long getTotal(String dept);
	
	public List<UrlStatus> getUrlStatusListByTeam(int page, int rows, String teamid) ;
	
	public long getTotalByTeam(String teamid);
}
