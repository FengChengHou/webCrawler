package com.iflyun.webCrawler.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.Param;
import com.iflyun.webCrawler.bean.entity.Url;
import com.iflyun.webCrawler.dao.UrlDao;
import com.iflyun.webCrawler.service.UrlService;

@Service("urlService")
public class UrlServiceImpl extends BaseServiceImpl<Url> implements UrlService{
	
	@Resource(name="urlDao")
	private UrlDao urlDao;

	public List<Url> urlGrid() {
		
		return urlDao.gerAllUrl();
	}

	public int deleteUrlIds(List<String> ids) {
		
		return urlDao.deleteUrlIds(ids);
	}

	@Override
	public int updateUrl(String id,String flag) {
		
		return urlDao.updateUrl(id,flag);
	}

	// 5w
	@Override
	public int updateAllUrl(List<String> ids, String flag) {
		return urlDao.updateAllUrl(ids, flag);
	}
	//批量修改短信发送状态
	@Override
	public int updateMessagestatus(List<String> id,String messagestatus)
	{
		return urlDao.updateMessagestatus(id, messagestatus);
	}
	
	@Override
	public List<Url> urlflag() {
		
		return urlDao.getUrlFlag();
	
	}

	@Override
	public Url urlPath(String path) {
		return urlDao.getPath(path);
	}

	@Override
	public Url getUrl(String id) {
		// TODO Auto-generated method stub
	  return urlDao.getUrl(id);
	}
	
	@Override
	public void editUrl(Url url) {
		urlDao.saveOrUpdate(url);
	}

//	@Override
//	public int updateUrl(Url url) {
//		return urlDao.updateUrl(url);
//	}

	@Override
	public int updateUrlParams(String urlId, List<Param> list) {
		return urlDao.updateUrlParams(urlId, list);
	}

	@Override
	public int addErrorNum(String urlId) {
		return urlDao.addErrorNum(urlId);		
	}

	@Override
	public int getErrorNum(String urlId) {
		return urlDao.getErrorNum(urlId);
	}

	@Override
	public void cleanZero(String urlId) {
		urlDao.cleanZero(urlId);		
	}

	@Override
	public List<Url> getListUrl(int page, int rows,String dept) {
		return urlDao.getListUrl(page, rows,dept);
	}

	@Override
	public long getTotal(String dept) {
		return urlDao.getTotal(dept);
	}

	@Override
	public String getMessagestatus(String urlId) {
		return urlDao.getMessagestatus(urlId);
	}

	@Override
	public List<Url> getListUrl(int page, int rows, String teamid, String interfaceName) {
		return urlDao.getListUrl(page, rows, teamid, interfaceName);
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.service.UrlService#getTeamUrl()
	 */
	@Override
	public List<String> getTeamUrl() {
		return urlDao.getTeamUrl();
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.service.UrlService#urlByTeamId(java.lang.String)
	 */
	@Override
	public List<Url> urlByTeamId(String teamid) {
		return urlDao.urlByTeamId(teamid);
	}

	@Override
	public long getTotalByTeam(String teamid,String interfaceName) {
		return urlDao.getTotalByTeam(teamid,interfaceName);
	}
	
}
