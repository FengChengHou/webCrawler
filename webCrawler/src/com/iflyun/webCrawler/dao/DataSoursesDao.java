package com.iflyun.webCrawler.dao;

import java.util.List;

import com.iflyun.webCrawler.bean.entity.DataSourse;
import com.iflyun.webCrawler.bean.view.DataSourseView;

public interface DataSoursesDao {
	
	//获取数据库连接的名字
	public List<DataSourseView> getDataBaseName();

	//新增dataSourse
	public int saveDataSourse(DataSourse dataSourse);
	
	//删除datasourse
	public int delDataSourse(String id);
	
	//获取当前要编辑的datasourse的值
	public DataSourse getDataSourse(String id);
	
	//编辑datasourse
	public int updateDataSourse(DataSourse dataSourse);
	
	//根据teamid获取全部数据库信息
	public List<DataSourse> dataSourseList(String teamid);
	
}
