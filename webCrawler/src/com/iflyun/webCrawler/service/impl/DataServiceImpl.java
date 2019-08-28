package com.iflyun.webCrawler.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.DataMonitor;
import com.iflyun.webCrawler.bean.view.DataMonitorView;
import com.iflyun.webCrawler.bean.view.ResultView;
import com.iflyun.webCrawler.dao.DataDao;
import com.iflyun.webCrawler.service.DataService;

@Service("dataService")
public class DataServiceImpl extends BaseServiceImpl<DataMonitor> implements DataService{

	@Resource(name="dataDao")
	private DataDao dataDao;

	@Override
	public List<ResultView> checkMaxUpdate(List<DataMonitor> dm) {
		return dataDao.checkMaxUpdate(dm);
	}

	@Override
	public int deleteDataIds(List<String> ids) {
		return dataDao.deleteDataIds(ids);
	}

	@Override
	public List<DataMonitor> getdataMonitorList() {
		return dataDao.getdataMonitorList();
	}

	@Override
	public int saveDataMonitor(DataMonitor dataMonitor) {
		return dataDao.saveDataMonitor(dataMonitor);
	}
	@Override
	public int updateStatus(String id) {
		return dataDao.updateStatus(id);
	}

	@Override
	public int updateAllData(List<String> ids, String status) {
		return dataDao.updateAllData(ids, status);
	}

	@Override
	public DataMonitorView getDataMonitor(String id) {
		return dataDao.getDataMonitor(id);
	}

	@Override
	public int updateData(DataMonitor data) {
		return dataDao.updateData(data);
	}

	@Override
	public int addErrorNum(String urlId) {
		return dataDao.addErrorNum(urlId);		
	}

	@Override
	public void cleanZero(String urlId,int status) {
		dataDao.cleanZero(urlId,status);		
	}

	@Override
	public int getErrorNum(String urlId) {
		return dataDao.getErrorNum(urlId);
	}

	@Override
	public List<DataMonitorView> dataMonitorList() {
		return dataDao.dataMonitorList();
	}

	@Override
	public List<DataMonitorView> getDataList(int page, int rows) {
		return dataDao.getDataList(page, rows);
	}

	@Override
	public long getTotal() {
		return dataDao.getTotal();
	} 

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.service.DataService#getDataMonitorById(java.lang.String)
	 */
	@Override
	public DataMonitor getDataMonitorById(String id) {
		return dataDao.getDataMonitorById(id);
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.service.DataService#getTeamMonitor()
	 */
	@Override
	public List<String> getTeamMonitor() {
		return dataDao.getTeamMonitor();
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.service.DataService#getdataMonitorByTeamdId(java.lang.String)
	 */
	@Override
	public List<DataMonitor> getdataMonitorByTeamdId(String teamid) {
		return dataDao.getdataMonitorByTeamdId(teamid);
	}

	@Override
	public List<DataMonitor> getDataListByTeamId(String teamid, String dataName, int pageIndex, int pageSize) {
		return dataDao.getDataListByTeamId(teamid, dataName, pageIndex, pageSize);
	}

	@Override
	public long dataCountByTeamId(String teamid,String dataName) {
		return dataDao.dataCountByTeamId(teamid,dataName);
	}

	@Override
	public int updateMessagestatus(List<String> ids, String messagestatus) {
		return dataDao.updateMessagestatus(ids, messagestatus);
	}

}
