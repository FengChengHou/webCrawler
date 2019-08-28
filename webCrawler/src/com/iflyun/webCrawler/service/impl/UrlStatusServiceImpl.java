package com.iflyun.webCrawler.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.UrlStatus;
import com.iflyun.webCrawler.dao.UrlStatusDao;
import com.iflyun.webCrawler.service.UrlStatusService;

@Service("urlStatusService")
public class UrlStatusServiceImpl  extends BaseServiceImpl<UrlStatus> implements UrlStatusService {

	@Resource(name="urlStatusDao")
	private UrlStatusDao urlStatusDao;
	
	public String getVersion() {
		return urlStatusDao.getVersion();
	}

	@Override
	public List<UrlStatus> urlStatusGrid() {
		return urlStatusDao.urlStatusGrid();
	}

	@Override
	public List<UrlStatus> getUrlStatusList(int page, int rows,String dept) {
		return urlStatusDao.getUrlStatusList(page, rows,dept);
	}

	@Override
	public long getTotal(String dept) {
		return urlStatusDao.getTotal(dept);
	}

	@Override
	public List<UrlStatus> getUrlStatusListByTeam(int page, int rows, String teamid) {
		return urlStatusDao.getUrlStatusListByTeam(page, rows, teamid);
	}

	@Override
	public long getTotalByTeam(String teamid) {
		return urlStatusDao.getTotalByTeam(teamid);
	}
	
	
}
