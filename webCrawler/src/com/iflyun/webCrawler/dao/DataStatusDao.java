package com.iflyun.webCrawler.dao;

import java.util.List;

import com.iflyun.webCrawler.bean.entity.DataStatus;
import com.iflyun.webCrawler.bean.view.DataStatusView;

public interface DataStatusDao extends BaseDao<DataStatus> {
	public List<DataStatusView> getdataStatus();
	
	//向日志中插入检查的信息
	public int inserDataAtatus(List<DataStatus> dvs);
	
	//获取当前最大版本
	public int getMaxVersion();
	
	/**
	 * 
	* @Title: getDataStatusList 
	* @Description: 根据teamid分页获取数据监测状态列表
	* @author byxs
	* @date 2016年3月2日 下午3:24:00
	* @param teamid
	* @param page
	* @param rows
	* @return List<DataStatusView> 
	* @throws
	 */
	public List<DataStatusView> getDataStatusList(String teamid,int page,int rows);
	
	/**
	 * 
	* @Title: getTotal 
	* @Description: 根据teamid获取数据监测状态总数
	* @author byxs
	* @date 2016年3月2日 下午3:23:56
	* @param teamid
	* @return long 
	* @throws
	 */
	public long getTotal(String teamid);
	
	

}