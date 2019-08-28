package com.iflyun.webCrawler.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.iflyun.webCrawler.bean.domain.EasyuiDatagridJson;
import com.iflyun.webCrawler.bean.view.DataStatusView;
import com.iflyun.webCrawler.service.DataStatusService;

@RequestMapping(value="/dataStatus")
@Controller
public class DataStatusController extends  BaseController{
	
	@Resource(name="dataStatusService")
	public DataStatusService dataStatusService;
	
	
	@RequestMapping(value="/list")
	@ResponseBody
	public EasyuiDatagridJson<DataStatusView> list(String teamid,int currentPageNo,int pageSize){
		
		List<DataStatusView> dataStatus = dataStatusService.getDataStatusList(teamid,currentPageNo, pageSize);
		EasyuiDatagridJson<DataStatusView> datagrid = new EasyuiDatagridJson<DataStatusView>();
		//List<DataStatusView> dataStatus = dataStatusService.getdataStatus();
		datagrid.setRows(dataStatus);
		
		long total = dataStatusService.getTotal(teamid);
		datagrid.setTotal(total);
		
		return datagrid;
	}

}
