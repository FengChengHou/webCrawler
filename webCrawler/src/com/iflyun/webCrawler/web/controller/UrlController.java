package com.iflyun.webCrawler.web.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.iflyun.webCrawler.bean.domain.EasyuiDatagridJson;
import com.iflyun.webCrawler.bean.entity.Param;
import com.iflyun.webCrawler.bean.entity.Url;
import com.iflyun.webCrawler.bean.entity.UrlStatus;
import com.iflyun.webCrawler.bean.entity.User;
import com.iflyun.webCrawler.bean.view.ParamView;
import com.iflyun.webCrawler.bean.view.UrlView;
import com.iflyun.webCrawler.common.util.JsonUtil;
import com.iflyun.webCrawler.service.UrlService;
import com.iflyun.webCrawler.service.UserTeamService;
import com.iflyun.webCrawler.service.impl.UrlCrawler;

@Controller
@RequestMapping(value = "/url")
public class UrlController extends BaseController {

	private static final Logger logger = Logger.getLogger(UrlController.class);

	@Resource(name = "urlService")
	public UrlService urlService;
	
	@Resource(name = "userTeamService")
	public UserTeamService userTeamService;

	@Resource(name = "urlCrawlerService")
	public UrlCrawler crawler;

	@RequestMapping(value = "/list")
	@ResponseBody()
	public EasyuiDatagridJson<UrlView> getAllUrls(String dept,int page,int rows) {
		//List<Url> url = urlService.urlGrid();
		
		List<Url> url = urlService.getListUrl(page, rows,dept);

		List<UrlView> urlViews = new LinkedList<UrlView>();

		for (Url u : url) {
			UrlView urlView = new UrlView(u);

			urlViews.add(urlView);
		}

		EasyuiDatagridJson<UrlView> datagrid = new EasyuiDatagridJson<UrlView>();
		datagrid.setRows(urlViews);
		
		//datagrid.setTotal((long) urlViews.size());
		datagrid.setTotal(urlService.getTotal(dept));

		return datagrid;
	}
	
	@RequestMapping(value = "/urlList")
	@ResponseBody()
	public EasyuiDatagridJson<UrlView> urlList(HttpSession session,int currentPageNo,int pageSize,String teamid,String interfaceName) {
		
		User user = (User) session.getAttribute("user");
		List<UrlView> urlViews = new ArrayList<UrlView>();
		EasyuiDatagridJson<UrlView> datagrid = new EasyuiDatagridJson<UrlView>();
		if(teamid==null||teamid.equals(""))
		{
			
			if(userTeamService.getTeamByUserID(user.getId()).size()==0)
			{
				datagrid.setRows(urlViews);
				datagrid.setTotal(new Long('0'));
				return datagrid;
			}else{				
				teamid=userTeamService.getTeamByUserID(user.getId()).get(0).getTeam().getId();
			}
		}
		
		List<Url> url = urlService.getListUrl(currentPageNo, pageSize, teamid, interfaceName);

	
		
		for (Url u : url) {
			UrlView urlView = new UrlView(u);

			urlViews.add(urlView);
		}
		
		
		long c = urlService.getTotalByTeam(teamid,interfaceName);
		datagrid.setRows(urlViews);
		datagrid.setTotal(c);
		return datagrid;
		
	}

	@RequestMapping(value = "/add")
	@ResponseBody
	public int insertUrl(String url) { // return 1:saved a record successfully;
		// 0:database does nothing.
		UrlView urlView;

		try {
			if (url == null || url.trim().equals("")) {
				return 0;
			}

			JSONObject o = JSONObject.fromObject(url);
			

		    Timestamp ts = new Timestamp(System.currentTimeMillis());   
          
            JSONArray jsonArray = o.getJSONArray("paramViews");
            List<ParamView> paramViews = JsonUtil.jsonToList(new ParamView(),
					jsonArray);
            urlView = new UrlView(o.getString("id"), o.getInt("time"), o.getString("host"), o.getInt("port"), o.getString("path"), o.getString("name"), "2", o.getString("flag1"), ts, o.getString("updatetime1"), o.getInt("error_num"), o.getString("teamid"), o.getString("messagestatus"), o.getString("messagestatus1"), o.getString("emailstatus"), o.getString("emailstatus1"), o.getString("requestmethod"), o.getString("checkfield"),o.getInt("checkcondition"),o.getString("checkvalue"),paramViews,o.getInt("resulttype"));
			
			urlView.setParamViews(paramViews);
		} catch (Exception e) {
			logger.error(url
					+ "\n :String cannot be parsed to a java bean UrlView!");
			return 0;
		}

		if (urlView != null) {

			Url u = new Url(urlView);

			for (Param p : u.getParams()) {
				p.setUrl(u);
			}

			urlService.add(u);
		}

		return 1;
	}

	@RequestMapping("/remove")
	@ResponseBody()
	public int removeUrl(String ids) {

		List<String> urlIds = new LinkedList<String>();

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
				urlIds.add(s);
			}
			try {
				System.out.println("------需要删的-----" + urlIds.toString());
				i = urlService.deleteUrlIds(urlIds);
			} catch (Exception e) {
				return -1;
			}

		} else {
			return 0;
		}
		return i;
	}

	@RequestMapping(value = "/request")
	@ResponseBody
	public String request(String urlStr) {

		String flag;

		UrlStatus status = new UrlStatus();


		try {
			status = crawler.check((urlStr.trim().equals("") ? "" : "http://" + urlStr), "", 0);

			flag = (status.getStatusCode().substring(0, 1));

		} catch (Exception e) {
			flag = "-1";
		}
		return flag;
	}

	// 改变是否发短信状态
	@RequestMapping(value = "/updateMessagestatus")
	@ResponseBody
	public int updateAllMail(String ids, String messagestatus) {

		List<String> urlIds = new LinkedList<String>();

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
				urlIds.add(s);
			}
			try {
				urlService.updateMessagestatus(urlIds, messagestatus);
			} catch (Exception e) {
				return -1;
			}

		} else {
			return 0;
		}
		return 1;

	}

	
	@RequestMapping(value = "/updateAll")
	@ResponseBody
	public int updateAllFlag(String ids, String flag) {

		List<String> urlIds = new LinkedList<String>();

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
				urlIds.add(s);
			}
			try {
				urlService.updateAllUrl(urlIds, flag);
			} catch (Exception e) {
				return -1;
			}

		} else {
			return 0;
		}
		return 1;

	}
	@RequestMapping(value = "/update")
	@ResponseBody
	public int updateFlag(String id, String flag) {

		int i = urlService.updateUrl(id, flag);

		return i;

	}

	@RequestMapping(value = "/get")
	@ResponseBody
	public UrlView getUrl(String id) {

		if(id==""||id.equals(""))
		{
			return new UrlView();
		}
		Url url = urlService.getUrl(id);
		//
		// JSONObject obj = JSONObject.fromObject(url);
		// String str = obj.toString();

		UrlView urlView = new UrlView(url);

		return urlView;
	}

	@RequestMapping(value = "/getParams")
	@ResponseBody
	public EasyuiDatagridJson<ParamView> getParams(String id) {

		UrlView urlView;

		Url url = urlService.getUrl(id);

		urlView = new UrlView(url);

		List<ParamView> paramViews = null;

		paramViews = urlView.getParamViews();

		EasyuiDatagridJson<ParamView> datagrid = new EasyuiDatagridJson<ParamView>();
		datagrid.setRows(paramViews);
		datagrid.setTotal((long) paramViews.size());

		return datagrid;
	}
	
	@RequestMapping(value = "/editUrl")
	@ResponseBody
	public int editAndSaveUrl(String url){
		
		UrlView urlView;

		try {
			if (url == null || url.trim().equals("")) {
				return 0;
			}

			JSONObject o = JSONObject.fromObject(url);

		    Timestamp ts = new Timestamp(System.currentTimeMillis());   
            String tsStr = o.get("updatetime").toString();   
            try {   
                ts = Timestamp.valueOf(tsStr);   
               
            } catch (Exception e) {   
                e.printStackTrace();   
            }  
            JSONArray jsonArray = o.getJSONArray("paramViews");
            List<ParamView> paramViews = JsonUtil.jsonToList(new ParamView(),
					jsonArray);
			urlView = new UrlView(o.getString("id"), o.getInt("time"), o.getString("host"), o.getInt("port"), o.getString("path"), o.getString("name"), o.getString("flag"), o.getString("flag1"), ts, o.getString("updatetime1"), o.getInt("error_num"), o.getString("teamid"), o.getString("messagestatus"), o.getString("messagestatus1"), o.getString("emailstatus"), o.getString("emailstatus1"), o.getString("requestmethod"), o.getString("checkfield"),o.getInt("checkcondition"),o.getString("checkvalue"),paramViews,o.getInt("resulttype"));
					
			
			
			

			
		} catch (Exception e) {
			logger.error(url
					+ "\n :String cannot be parsed to a java bean UrlView!");
			return 0;
		}

		if (urlView != null) {

			Url u = new Url(urlView);
			u.setId(urlView.getId());

			for (Param p : u.getParams()) {
				p.setUrl(u);
			}
			urlService.updateUrlParams(urlView.getId(), u.getParams());
			
			u.setUpdatetime(new Timestamp(System.currentTimeMillis()));
			urlService.update(u);
		}

		return 1;
	}
	

}
