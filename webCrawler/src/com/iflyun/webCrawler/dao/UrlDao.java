package com.iflyun.webCrawler.dao;

import java.util.List;

import com.iflyun.webCrawler.bean.entity.Param;
import com.iflyun.webCrawler.bean.entity.Url;


public interface UrlDao  extends BaseDao<Url>{
	
	public List<Url> gerAllUrl();
	public List<Url> getUrlFlag();
	public Url getPath(String path);
	public int deleteUrlIds(List<String> ids);
	public int updateUrl(String id,String flag);
	public int updateAllUrl(List<String> ids,String flag);//5w
	//编辑URL对象
	//public int editUrl(Url url);
	
	//根据ID获取url(编辑)
	public Url getUrl(String id);
	
	//更新url
	//public int updateUrl(Url url);
	
	//更新url对象的参数
	public int updateUrlParams(String urlId,List<Param> list);
	
	//根据ID删除param
	public int deleteParam(String id);
	
	//获取url错误状态的次数（三次后再发送短信）
	public int getErrorNum(String urlId);
	
	//获取url发短信状态
	public String getMessagestatus(String urlId);
	
	
	//错误一次error_num 加1
	public int addErrorNum(String urlId);
	
	//开启时error_num 清“0”
	public void cleanZero(String urlId);
	

	
	public List<Url> getListUrl(int page,int rows,String dept);
	
	/**
	 * 
	
	* @Title: getListUrl 
	
	* @Description: 根据团队,页数 接口名称获取接口列表
	
	* @author wenquxing
	
	* @date 2016年2月24日 下午4:16:34
	
	* @param @param page
	* @param @param rows
	* @param @param teamid
	* @param @param interfaceName
	* @param @return 
	
	* @return List<Url> 
	
	* @throws
	 */
	public List<Url> getListUrl(int page,int rows,String teamid,String interfaceName);
	
	public long getTotal(String dept);
	
	//修改短信状态
	public int updateMessagestatus(List<String> id,String messagestatus);
	
	//获取url中的团队id
	public List<String> getTeamUrl();
	
	//根据团队id获取url
	public List<Url> urlByTeamId(String teamid);
	
	/**
	 * 	
	* @Title: getTotalByTeam 	
	* @Description: 根据团队获取接口总数	
	* @author wenquxing	
	* @date 2016年2月29日 下午3:37:59	
	* @param @param teamid
	* @param @return 	
	* @return long 	
	* @throws
	 */
	public long getTotalByTeam(String teamid,String interfaceName);
	
}
