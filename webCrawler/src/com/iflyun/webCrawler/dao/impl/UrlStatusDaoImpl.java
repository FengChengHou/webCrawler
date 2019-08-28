package com.iflyun.webCrawler.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.iflyun.webCrawler.bean.entity.UrlStatus;
import com.iflyun.webCrawler.dao.UrlStatusDao;

@Repository("urlStatusDao")
public class UrlStatusDaoImpl extends BaseDaoImpl<UrlStatus> implements
		UrlStatusDao {

	public String getVersion() {
		 int seq = Integer.parseInt(this
					.getCurrentSession()
					.createSQLQuery(
							"select max(version) from crawler_url_status")
					.uniqueResult().toString());
		 seq = seq+1;
		 return Integer.toString(seq);
	}

	@Override
	public List<UrlStatus> urlStatusGrid() {

		 StringBuffer sql = new
		 StringBuffer(" from UrlStatus where version  = (select max(version) from UrlStatus)");
		List<UrlStatus> urlStatusList = this.find(sql.toString());
		return urlStatusList;
	}

	@Override
	public List<UrlStatus> getUrlStatusList(int page, int rows,String dept) {
		StringBuffer hql = new StringBuffer("from UrlStatus where version = (select max(version) from UrlStatus) and department='"+dept+"'");
		List<UrlStatus> list = this.find(hql.toString(),page,rows);
		return list;
	}

	@Override
	public long getTotal(String dept) {
		long count = this.count("select count(*) from UrlStatus where version = (select max(version) from UrlStatus) and department='"+dept+"'");
		return count;
	}

	@Override
	public List<UrlStatus> getUrlStatusListByTeam(int page, int rows, String teamid) {
		StringBuffer hql = new StringBuffer("from UrlStatus where version = (select max(version) from UrlStatus) and teamid='"+teamid+"'");
		List<UrlStatus> list = this.find(hql.toString(),page,rows);
		return list;
	}

	@Override
	public long getTotalByTeam(String teamid) {
		long count = this.count("select count(*) from UrlStatus where version = (select max(version) from UrlStatus) and teamid='"+teamid+"'");
		return count;
	}

}
