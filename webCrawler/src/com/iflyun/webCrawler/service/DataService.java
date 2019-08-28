package com.iflyun.webCrawler.service;

import java.util.List;

import com.iflyun.webCrawler.bean.entity.DataMonitor;
import com.iflyun.webCrawler.bean.view.DataMonitorView;
import com.iflyun.webCrawler.bean.view.ResultView;

public interface DataService extends BaseService<DataMonitor> {

	// 获取crawler_monitor全部数据
	public List<DataMonitor> getdataMonitorList();

	// 根据Teamid获取crawler_monitor全部数据
	public List<DataMonitor> getdataMonitorByTeamdId(String teamid);

	// 检查更新时间是否超时,获取id，max(update),text,等字段插入到resultview对象中
	public List<ResultView> checkMaxUpdate(List<DataMonitor> dm);

	// 向表中插入检查结果（失败时要发送短信）
	// public int inserDataAtatus(List<DataStatusView> dvs);

	// 批量删除数据监视器
	public int deleteDataIds(List<String> ids);

	// 新增数据监视器
	public int saveDataMonitor(DataMonitor dataMonitor);

	// 批量更新数据监视器的状态
	public int updateAllData(List<String> ids, String status);

	// 根据ID获取DataMonitor
	public DataMonitor getDataMonitorById(String id);

	public DataMonitorView getDataMonitor(String id);

	// 数据超时后将状态更新为2
	public int updateStatus(String id);

	// 更新数据监测
	public int updateData(DataMonitor data);

	// 获取url错误状态的次数（三次后再发送短信）
	public int getErrorNum(String urlId);

	// 错误一次error_num 加1
	public int addErrorNum(String urlId);

	// 开启时error_num 清“0”
	public void cleanZero(String urlId, int status);

	// 无条件获取全部dataMonitor
	public List<DataMonitorView> dataMonitorList();

	public List<DataMonitorView> getDataList(int page, int rows);

	public long getTotal();

	// 获取datamonitor中的团队id
	public List<String> getTeamMonitor();

	// 根据teamid,数据监测名称获取分页获取数据检测
	public List<DataMonitor> getDataListByTeamId(String teamid, String dataName, int pageIndex, int pageSize);

	// 根据teamid获取数据监测数量
	public long dataCountByTeamId(String teamid,String dataName);

	// 开启/关闭短信
	public int updateMessagestatus(List<String> ids, String messagestatus);
}
