package com.iflyun.webCrawler.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.DataStatus;
import com.iflyun.webCrawler.bean.view.DataStatusView;
import com.iflyun.webCrawler.dao.DataStatusDao;
import com.iflyun.webCrawler.service.DataStatusService;
@Service("dataStatusService")
public class DataStatusServiceImpl extends BaseServiceImpl<DataStatus> implements DataStatusService {
	
	@Resource(name="dataStatusDao")
	private DataStatusDao dataStatusDao;
	
	@Override
	public List<DataStatusView> getdataStatus() {
		return dataStatusDao.getdataStatus();
	}

	@Override
	public int inserDataAtatus(List<DataStatus> dvs) {
		// TODO Auto-generated method stub
		return dataStatusDao.inserDataAtatus(dvs);
	}

	@Override
	public int getMaxVersion() {
		// TODO Auto-generated method stub
		return dataStatusDao.getMaxVersion();
	}

	@Override
	public List<DataStatusView> getDataStatusList(String teamid,int page, int rows) {
		return dataStatusDao.getDataStatusList(teamid,page, rows);
	}

	@Override
	public long getTotal(String teamid) {
		return dataStatusDao.getTotal(teamid);
	}

}

