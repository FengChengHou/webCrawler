package com.iflyun.webCrawler.common.util;

import java.net.URL;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.iflyun.webCrawler.bean.entity.Param;
import com.iflyun.webCrawler.bean.entity.Url;
import com.iflyun.webCrawler.common.util.comparator.ParamComparator;
import com.iflyun.webCrawler.constant.UrlConstants;

public class UrlUtil {
	
	private static final Logger logger = Logger.getLogger(UrlUtil.class);
	
	
	public static String wapperUrl(Url url){
		if(url == null){
			return null;
		}
		
		if(!StringUtil.hasLength(url.getHost())){
			
			return null;
		}
		
		String urlString = "";
		
		URL netUrl = null;
		
		try{
			netUrl = new URL(UrlConstants.PROTOCOL_HTTP, url.getHost(), url.getPort(), url.getPath());
			
			urlString = wapperUrlParams(url,netUrl.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
		}
		return urlString;
	}
	
	
	public  static String  wapperUrlParams(Url url,String baseUrl){
		List<Param> params = url.getParams() ;
		
		if(params ==  null || params.size()==0 ){
			return "";
		}
		
		ParamComparator paramComparator = new ParamComparator();
		Collections.sort(params, paramComparator);
		
		
		
		Map<String,String> maps = new LinkedHashMap<String , String>();
		
		for(Param  p:params){
			maps.put(p.getKey(), p.getValue());
		}
		
		return  QueryUtil.addQueryString((baseUrl == null?"":baseUrl), maps);
	}
}
