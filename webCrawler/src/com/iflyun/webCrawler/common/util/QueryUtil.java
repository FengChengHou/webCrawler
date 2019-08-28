package com.iflyun.webCrawler.common.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

public class QueryUtil {
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List<NameValuePair> map2NameValuePair(Map<String,?> params){
		if(params == null || params.size() == 0)
		{
			return null;
		}
		
		Iterator it = params.entrySet().iterator();
		List<NameValuePair> nvp = new ArrayList<NameValuePair>();
		while (it.hasNext()) 
		{
		   Entry<String,?> entry = (Entry<String,?>) it.next();
		   String key = entry.getKey();
		   String value =(String)entry.getValue();


		   nvp.add(new BasicNameValuePair(key,value));
		 }
		
		return nvp;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static String addQueryString(String url,Map<String ,?> params){
		if(params == null || params.size() == 0)
		{
			return url;
		}
		
		Iterator it = params.entrySet().iterator();
		url += "?";
		while(it.hasNext()){
			 Entry<String,?> entry = (Entry<String,?>) it.next();
			 String key = entry.getKey();
			 String value =  (entry.getValue() == null ? "" : (String)entry.getValue());
			 if(key.equals("params"))
			 {
				try {
					value=URLEncoder.encode(value,"utf-8");
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} 
			 }
			 
			 url += key + "="+value +"&";
		}
		
		url = url.replaceAll("&$","");
		return url;
	}

}
