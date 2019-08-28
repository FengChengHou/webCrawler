package com.iflyun.webCrawler.service;

import java.util.List;

import com.iflyun.webCrawler.bean.entity.Param;
import com.iflyun.webCrawler.bean.entity.Url;

public interface UrlService extends BaseService<Url>{
	
	
	public List<Url>  urlGrid();
	
	public List<Url> urlflag();
	
	//根据teamid查询url
	public List<Url> urlByTeamId(String teamid);
	
	public Url urlPath(String path);
	
	public int deleteUrlIds(List<String> ids);
	
	public int updateUrl(String id,String flag);
	
	public int updateAllUrl(List<String> ids,String flag);//5w
	
	
	public int updateMessagestatus(List<String> id,String messagestatus);//批量修改短信发送状态
	
	//根据id获取URL
	public Url getUrl(String id);

	public void editUrl(Url url);
	
	//更新URL
	//public int updateUrl(Url url);
	
	//更新url参数
	public int updateUrlParams(String urlId, List<Param> list);
	
	//获取url错误状态的次数（三次后再发送短信）
	public int getErrorNum(String urlId);
	
	//获取url发短信状态
	public String getMessagestatus(String urlId);
	
	//错误一次error_num 加1
	public int addErrorNum(String urlId);
	
	//开启时清“0”
	public void cleanZero(String urlId);
	
	public List<Url> getListUrl(int page,int rows,String dept);
	
	public List<Url> getListUrl(int page,int rows,String teamid,String interfaceName);
	
	public long getTotal(String dept);
	
	//查看url中的团队个数
	public List<String> getTeamUrl();
	
	public long getTotalByTeam(String teamid,String interfaceName);
	
}

