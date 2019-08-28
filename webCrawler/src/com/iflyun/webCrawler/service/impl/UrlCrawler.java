package com.iflyun.webCrawler.service.impl;

import java.sql.Timestamp;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.UrlStatus;
import com.iflyun.webCrawler.common.util.DateUtil;


@Service("urlCrawlerService")
public class UrlCrawler {

	private static final Logger logger = Logger.getLogger(UrlCrawler.class);

	private String url;
	
	private int time;
	
	private String teamid;
	
	public UrlStatus check( String url ,String teamid,int time) {
		
		CloseableHttpClient client =  HttpClients.createDefault();

		HttpGet httppost = new HttpGet(url);
		
		UrlStatus urlStatus =  new UrlStatus();
		urlStatus.setTeamid(teamid);
		urlStatus.setRequestTime(new Timestamp(System.currentTimeMillis()));
		
		Timestamp finishedTime;
		
		try {
			
			RequestConfig requestConfig = RequestConfig.custom()
					.setSocketTimeout(60000).setConnectTimeout(time).build();// set// ms(毫秒).
			
			httppost.setConfig(requestConfig);
			HttpResponse response = client.execute(httppost);
			int statusCode = response.getStatusLine().getStatusCode();// response
																		// statusCode:
																		// 303,
			
			//System.out.println("http:"+response);
			
			finishedTime = new Timestamp(System.currentTimeMillis());															// 404,
			
			urlStatus.setStatusCode(String.valueOf(statusCode));
			
			urlStatus.setResult(IOUtils.toString(response.getEntity().getContent(),
			"utf8"));
			urlStatus.setResponseTime(DateUtil.TimestampDiff(finishedTime, urlStatus.getRequestTime()));

		} catch (Exception e) {
			logger.error(e.getMessage());
			
			finishedTime = new Timestamp(System.currentTimeMillis());
			
			urlStatus.setResponseTime(DateUtil.TimestampDiff(finishedTime, urlStatus.getRequestTime()));
			urlStatus.setStatusCode("0");
			urlStatus.setResult(e.getMessage());
			return urlStatus;//20140813wxy
		}
		
		return urlStatus;

	}
	
	public UrlStatus checkPost(List<NameValuePair> params,String url,String teamid,int time) {
		String requestUrl = url.substring(0,url.indexOf("?"));
		HttpPost htttRequest = new HttpPost(requestUrl);
		htttRequest.addHeader("Content-Type", "application/x-www-form-urlencoded");
		
		UrlStatus urlStatus =  new UrlStatus();
		urlStatus.setTeamid(teamid);
		urlStatus.setRequestTime(new Timestamp(System.currentTimeMillis()));
		
		Timestamp finishedTime;
		
		try {
			RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(30000).setConnectTimeout(time).build();// set
																			// ms(毫秒).
			htttRequest.setConfig(requestConfig);
			
			/* 添加请求参数到请求对象 */
			htttRequest.setEntity((HttpEntity) new UrlEncodedFormEntity(params, HTTP.UTF_8));
			//method.setEntity(new UrlEncodedFormEntity(params, HTTP.UTF_8));
			/* 发送请求并等待响应 */
			HttpResponse httpResponse = new DefaultHttpClient().execute(htttRequest);

			int statusCode = httpResponse.getStatusLine().getStatusCode();// response
																		// statusCode:
			//System.out.println("http:"+response);
			
			String strResult = EntityUtils.toString(httpResponse.getEntity());
			
			finishedTime = new Timestamp(System.currentTimeMillis());															// 404,
			
			urlStatus.setStatusCode(String.valueOf(statusCode));
			
			urlStatus.setResult(strResult);
			urlStatus.setResponseTime(DateUtil.TimestampDiff(finishedTime, urlStatus.getRequestTime()));

		} catch (Exception e) {
			logger.error(e.getMessage());
			
			finishedTime = new Timestamp(System.currentTimeMillis());
			
			urlStatus.setResponseTime(DateUtil.TimestampDiff(finishedTime, urlStatus.getRequestTime()));
			urlStatus.setStatusCode("0");
			urlStatus.setResult(e.getMessage());
			return urlStatus;//20140813wxy
		}
		
		return urlStatus;

	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public String getTeamid() {
		return teamid;
	}

	public void setTeamid(String teamid) {
		this.teamid = teamid;
	}

}
