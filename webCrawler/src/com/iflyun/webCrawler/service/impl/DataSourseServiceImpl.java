package com.iflyun.webCrawler.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.DataSourse;
import com.iflyun.webCrawler.bean.view.DataSourseView;
import com.iflyun.webCrawler.dao.DataSoursesDao;
import com.iflyun.webCrawler.service.DataSourseService;

@Service("dataSourseService")
public class DataSourseServiceImpl implements DataSourseService {

	@Resource(name="dataSourseDao")
	private DataSoursesDao dataSourseDao;
	@Override
	public List<DataSourseView> getDataBaseName() {
		// TODO Auto-generated method stub
		return dataSourseDao.getDataBaseName();
	}
	@Override
	public int delDataSourse(String id) {
		// TODO Auto-generated method stub
		return dataSourseDao.delDataSourse(id);
	}
	@Override
	public DataSourse getDataSourse(String id) {
		// TODO Auto-generated method stub
		return dataSourseDao.getDataSourse(id);
	}
	@Override
	public int saveDataSourse(DataSourse dataSourse) {
		// TODO Auto-generated method stub
		return dataSourseDao.saveDataSourse(dataSourse);
	}
	@Override
	public int updateDataSourse(DataSourse dataSourse) {
		// TODO Auto-generated method stub
		return dataSourseDao.updateDataSourse(dataSourse);
	}
	@Override
	public List<DataSourse> dataSourseList(String teamid) {
		return dataSourseDao.dataSourseList(teamid);
	}

}
