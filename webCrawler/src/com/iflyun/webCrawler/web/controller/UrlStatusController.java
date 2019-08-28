package com.iflyun.webCrawler.web.controller;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.iflyun.webCrawler.bean.domain.EasyuiDatagridJson;
import com.iflyun.webCrawler.bean.entity.Url;
import com.iflyun.webCrawler.bean.entity.UrlStatus;
import com.iflyun.webCrawler.bean.entity.User;
import com.iflyun.webCrawler.bean.view.UrlStatusView;
import com.iflyun.webCrawler.common.util.StringUtil;
import com.iflyun.webCrawler.common.util.UrlUtil;
import com.iflyun.webCrawler.service.UrlStatusService;
import com.iflyun.webCrawler.service.UserTeamService;
import com.iflyun.webCrawler.service.impl.UrlCrawler;


@RequestMapping(value="/urlStatus")
@Controller
public class UrlStatusController  extends  BaseController{
	
	private static final Logger logger = Logger.getLogger(UrlStatusController.class);
	
	@Resource(name="urlStatusService")
	public UrlStatusService urlStatusService;
	
	@Resource(name = "urlCrawlerService")
	public  UrlCrawler crawler;
	
	@Resource(name = "userTeamService")
	public UserTeamService userTeamService;
	
	@RequestMapping(value="/check")
	public int checkUrl(Url url){
		String urlString = (UrlUtil.wapperUrl(url));
		
		if(urlString == null || !StringUtil.hasLength(urlString)){
			return 0;
		} 
		
		
		//crawler = new  UrlCrawler();
		
		UrlStatus status = null;
		

		
		try {
			status = crawler.check(UrlUtil.wapperUrl(url), "", url.getTime());
		} catch (Exception e) {
			logger.error("There is no urlStatus got!");
		}
		
		if(status != null){
			status.setUrl(url);
			
			urlStatusService.add(status);
			
			return 1;
		}
		
		return 0;
	}
	
	@RequestMapping(value="/list")
	@ResponseBody
	public EasyuiDatagridJson<UrlStatusView> list(int page,int rows,String dept){
		
		//List<UrlStatus> urlStatus = urlStatusService.urlStatusGrid();
		List<UrlStatus> urlStatus = urlStatusService.getUrlStatusList(page, rows,dept);
		
		List<UrlStatusView> urlStatusList = new LinkedList<UrlStatusView>();
 		
		for (UrlStatus status : urlStatus) {
			UrlStatusView urlStatusView = new UrlStatusView(status);

			urlStatusList.add(urlStatusView);
		}
		EasyuiDatagridJson<UrlStatusView> datagrid = new EasyuiDatagridJson<UrlStatusView>();
		datagrid.setRows(urlStatusList);
		datagrid.setTotal(urlStatusService.getTotal(dept));
		return datagrid;
	}
	
	
	@RequestMapping(value="/listUrl")
	@ResponseBody
	public EasyuiDatagridJson<UrlStatusView> listUrl(HttpSession session,int currentPageNo,int pageSize,String teamid){
		
		User user = (User) session.getAttribute("user");
		EasyuiDatagridJson<UrlStatusView> datagrid = new EasyuiDatagridJson<UrlStatusView>();
		List<UrlStatusView> urlStatusList = new ArrayList<UrlStatusView>();
		if(teamid==null||teamid.equals(""))
		{
			if(userTeamService.getTeamByUserID(user.getId()).size()==0)
			{
				datagrid.setRows(urlStatusList);
				datagrid.setTotal(new Long('0'));
				return datagrid;
			}
			teamid=userTeamService.getTeamByUserID(user.getId()).get(0).getTeam().getId();
		}
		//List<UrlStatus> urlStatus = urlStatusService.urlStatusGrid();
		List<UrlStatus> urlStatus = urlStatusService.getUrlStatusListByTeam(currentPageNo, pageSize, teamid);
		
		
 		
		for (UrlStatus status : urlStatus) {
			UrlStatusView urlStatusView = new UrlStatusView(status);

			urlStatusList.add(urlStatusView);
		}
		
		long c = urlStatusService.getTotalByTeam(teamid);
		datagrid.setRows(urlStatusList);
		datagrid.setTotal(c);
		return datagrid;
	}
	


}
