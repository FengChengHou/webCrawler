package com.iflyun.webCrawler.web.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.iflyun.webCrawler.bean.domain.EasyuiDatagridJson;
import com.iflyun.webCrawler.bean.entity.DataMonitor;
import com.iflyun.webCrawler.bean.entity.DataSourse;
import com.iflyun.webCrawler.bean.entity.User;
import com.iflyun.webCrawler.bean.view.DataMonitorView;
import com.iflyun.webCrawler.service.DataService;
import com.iflyun.webCrawler.service.DataSourseService;
import com.iflyun.webCrawler.service.UserTeamService;


@RequestMapping(value="/dataMonitor")
@Controller
public class DataMonitorController extends BaseController {
	@Resource(name = "dataService")
	private DataService dataService;
	
	@Resource(name="dataSourseService")
	private DataSourseService dataSourseService;
	
	@Resource(name="userTeamService")
	private UserTeamService userTeamService;
	
	//列出所有数据监控
	@RequestMapping(value="/list")
	@ResponseBody
	public EasyuiDatagridJson<DataMonitorView> getAllDatas(HttpSession session,String teamid,String dataName,int currentPageNo,int pageSize) {
		User user = (User) session.getAttribute("user");
		//List<DataMonitorView> dataMonitorView = dataService.dataMonitorList();
		if(StringUtils.isBlank(teamid)){
			teamid=userTeamService.getTeamByUserID(user.getId()).get(0).getTeam().getId();
		}
		List<DataMonitor> mlist = dataService.getDataListByTeamId(teamid, dataName, currentPageNo, pageSize);
		List<DataSourse> slist = dataSourseService.dataSourseList(null);
		List<DataMonitorView> dvlist = new ArrayList<DataMonitorView>();
		for (int i = 0; i < mlist.size(); i++) {
			DataMonitorView d = new DataMonitorView(mlist.get(i));
			for (int j = 0; j < slist.size(); j++) {
				if(mlist.get(i).getSid().equals(slist.get(j).getId())){
					d.setDbName(slist.get(j).getDbName());
				}
			}
			dvlist.add(d);
		}
		
        //5w
		EasyuiDatagridJson<DataMonitorView> datagrid = new EasyuiDatagridJson<DataMonitorView>();
		datagrid.setRows(dvlist);
		
		long total = dataService.dataCountByTeamId(teamid,dataName);
		datagrid.setTotal(total);
		return datagrid;
	}
	
	
	//新增数据监控
//	@RequestMapping(value = "/add")
//	@ResponseBody
//	public int insertUrl(String dataMonitor) { // return 1:saved a record successfully;
//		// 0:database does nothing.
//		int flag=1;
//		DataMonitorView dataMonitorView;
//
//		JSONObject o = JSONObject.fromObject(dataMonitor);
//		dataMonitorView = (DataMonitorView) JSONObject.toBean(o, DataMonitorView.class);
//
//		if (dataMonitorView != null) {
//
//			//DataMonitor d = new DataMonitor(dataMonitorView);
//
//			int count = dataService.saveDataMonitor(dataMonitorView);
//			if(count==0){
//				flag=0;
//			}
//			
//		}
//			return flag;
//	}
	
	@RequestMapping(value = "/remove")
	@ResponseBody
	public int removeUrl(String ids) {

		List<String> dataIds = new LinkedList<String>();

		String[] idArray;

		try {
			if (ids == null || ids.trim().equals("")) {
				return 0;
			}

			idArray = ids.split(",");

		} catch (Exception e) {
			return 0;
		}
		int i = 0;
		if (idArray.length > 0) {
			for (String s : idArray) {
				dataIds.add(s);
			}
			try {
				//System.out.println("------需要删的-----"+urlIds.toString());
				i=dataService.deleteDataIds(dataIds);
			} catch (Exception e) {
				return -1;
			}

		} else {
			return 0;
		}
		return i;
	}

	@RequestMapping(value = "/updateAll")
	@ResponseBody
	public int updateAllFlag(String ids, String flag) {
		List<String> dataIds = new LinkedList<String>();
		String[] idArray;
		try {
			if (ids == null || ids.trim().equals("")) {
				return 0;
			}
			idArray = ids.split(",");
		} catch (Exception e) {
			return 0;
		}
		if (idArray.length > 0) {
			for (String s : idArray) {
				dataIds.add(s);
			}
			try {
				dataService.updateAllData(dataIds, flag);
			} catch (Exception e) {
				return -1;
			}

		} else {
			return 0;
		}
		return 1;
	}
	
	@RequestMapping(value = "/get")
	@ResponseBody
	public DataMonitorView getDataMonitor(String id){
		DataMonitorView dataMonitorView = dataService.getDataMonitor(id);
		return dataMonitorView;
	}
	
	@RequestMapping(value = "/editData")
	@ResponseBody
	public int editDataMonitor(String data){
		DataMonitorView dataMonitorView = null;

		try {
			if (data == null || data.trim().equals("")) {
				return 0;
			}

			JSONObject o = JSONObject.fromObject(data);
			dataMonitorView = (DataMonitorView) JSONObject.toBean(o, DataMonitorView.class);
			
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (dataMonitorView != null) {

			DataMonitor d = new DataMonitor(dataMonitorView);
			d.setUpdatetime(new Timestamp(System.currentTimeMillis()));
			dataService.updateData(d);
		}
		return 1;
	}
	
}
