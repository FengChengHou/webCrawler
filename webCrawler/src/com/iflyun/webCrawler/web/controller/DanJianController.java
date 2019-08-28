package com.iflyun.webCrawler.web.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.iflyun.webCrawler.bean.entity.Param;
import com.iflyun.webCrawler.bean.entity.Url;
import com.iflyun.webCrawler.bean.view.ParamView;
import com.iflyun.webCrawler.bean.view.UrlView;
import com.iflyun.webCrawler.common.util.HttpRequest;
import com.iflyun.webCrawler.common.util.JsonUtil;
import com.iflyun.webCrawler.common.util.QueryUtil;
import com.iflyun.webCrawler.common.util.UrlUtil;
import com.iflyun.webCrawler.common.util.comparator.ParamComparator;
import com.iflyun.webCrawler.service.UrlService;
import com.iflyun.webCrawler.service.UserTeamService;
import com.iflyun.webCrawler.service.impl.UrlCrawler;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


@Controller
@RequestMapping(value = "/jian")
public class DanJianController {

	private static final Logger logger = Logger.getLogger(UrlController.class);

	@Resource(name = "urlService")
	public UrlService urlService;
	
	@Resource(name = "userTeamService")
	public UserTeamService userTeamService;

	@Resource(name = "urlCrawlerService")
	public UrlCrawler crawler;
	
	@RequestMapping(value = "/reque")
	@ResponseBody
	public String request(String id,HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		//response.setContentType("text/html;charset=UTF-8");  
		HttpRequest req = new HttpRequest();
		String str=null;
		if(id==""||id.equals(""))
		{
			return new String();
		}
		Url url = urlService.getUrl(id);
		crawler.setUrl((String) UrlUtil.wapperUrl(url));
		crawler.setTime(url.getTime());
		if (url.getRequestmethod().equals("get")) {
			str = req.httpRequest(crawler.getUrl());
		} else if (url.getRequestmethod().equals("post")) {
			List<NameValuePair> params=new ArrayList<NameValuePair>();
			String uurl=crawler.getUrl();
			String[] aa = uurl.split("[?]");
			if(aa.length>1){
				String[] bb=aa[1].split("&");
				for (String string : bb) {
					String[] cc=string.split("=");
					if(cc.length>1){
						if(cc[1].equals("/")){
							params.add(new BasicNameValuePair(cc[0],""));
						}else{
							params.add(new BasicNameValuePair(cc[0], cc[1]));
						}
						
					}else{
						params.add(new BasicNameValuePair(cc[0],""));
					}
				}
			}
			str = req.httpRequestPost(aa[0],params);
		}
        return str;
	}
	
	@RequestMapping(value = "/zenreq")
	@ResponseBody
	public String zenRequest(String url,HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		response.setContentType("text/html;charset=UTF-8");
		HttpRequest req = new HttpRequest();
		String str=null;
		try {
			if (url == null || url.trim().equals("")) {
				return new String();
			}
			JSONObject o = JSONObject.fromObject(url);
            String host=o.getString("host");
			String path=o.getString("path");
			String port=o.getString("port");
			String action=o.getString("action");
			StringBuffer buffer=new StringBuffer("http://");
			buffer.append(host);
			buffer.append(":");
			buffer.append(port);
			buffer.append(path); 
			JSONArray jsonArray = o.getJSONArray("paramViews");
			List<ParamView> paramViews = JsonUtil.jsonToList(new ParamView(),jsonArray);
			if(action.equals("get")){
				buffer.append("?");
				for (ParamView paramView : paramViews) {
					if(paramView.getKey().equals("params")){
						
						String aa=URLEncoder.encode(paramView.getValue(),"utf-8");
						buffer.append(paramView.getKey());
						buffer.append("=");
						buffer.append(aa);
						buffer.append("&");
					}
					else{
						buffer.append(paramView.getKey());
						buffer.append("=");
						buffer.append(paramView.getValue());
						buffer.append("&");
					}
				}
				buffer.deleteCharAt(buffer.length()-1);
				String aa = buffer.toString(); 
				str = req.httpRequest(aa);
			}else{
				List<NameValuePair> params=new ArrayList<NameValuePair>();
				for (ParamView paramView : paramViews) {
					if(paramView.getKey().equals("params")){
						String aa=URLEncoder.encode(paramView.getValue(),"utf-8");
						if(aa.equals("/")){
							aa="";
						}
						params.add(new BasicNameValuePair(paramView.getKey(),aa));
					}
					else{
						String aa=paramView.getValue();
						if(aa.equals("/")){
							aa="";
						}
						params.add(new BasicNameValuePair(paramView.getKey(),aa));
					}
				}
				str = req.httpRequestPost(buffer.toString(),params);
			}
		} catch (Exception e) {
			return new String();
		}


        return str;
	}
}
