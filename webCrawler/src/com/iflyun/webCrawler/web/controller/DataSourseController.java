package com.iflyun.webCrawler.web.controller;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.iflyun.webCrawler.bean.view.DataSourseView;
import com.iflyun.webCrawler.bean.view.UrlView;
import com.iflyun.webCrawler.service.DataSourseService;

@RequestMapping(value="/dataSourse")
@Controller
public class DataSourseController extends  BaseController{
	
	@Resource(name="dataSourseService")
	public DataSourseService dataSourseService;
	
	
	@RequestMapping(value="/datalist")
	@ResponseBody
	public  List<DataSourseView>  list(){
		
		List<DataSourseView> dataList = dataSourseService.getDataBaseName();
		return dataList;
	}
	
	@RequestMapping(value="/delDataSourse")
	@ResponseBody
	public int  deldataSourse(String id){
		
		int i = dataSourseService.delDataSourse(id);
		
		return i;
	}
	
	@RequestMapping(value="/addDataSourse")
	@ResponseBody
	public int  addDataSourse(String data){
//		JSONObject ob = JSONObject.fromObject(data);
//		System.out.println("-ob:"+ob.toString());
//		DataSourseView dataSourseView = (DataSourseView) JSONObject.toBean(ob, DataSourseView.class);
//		int i = dataSourseService.saveDataSourse(dataSourseView);
//		
//		return i;
		return 1;
	}
//	@RequestMapping(value="/getDataSourse")
//	@ResponseBody
//	public DataSourseView  getDataSourse(String id){
//		System.out.println("--------------------------------------"+id);
//		DataSourseView dataSourseView = dataSourseService.getDataSourseView(id);
//		System.out.println("dataSourseView:"+dataSourseView.getDbName());
//		return dataSourseView;
//	}
	
//	@RequestMapping(value="/ediDataSourse")
//	@ResponseBody
//	public int  editDataSourse(String data){
//		JSONObject ob = JSONObject.fromObject(data);
//		System.out.println("-ob:"+ob.toString());
//		DataSourseView dataSourseView = (DataSourseView) JSONObject.toBean(ob, DataSourseView.class);
//		System.out.println("---dataSourseView:"+dataSourseView.getDbName());
//		int i = dataSourseService.updateDataSourse(dataSourseView);
//		return i;
//	}
}