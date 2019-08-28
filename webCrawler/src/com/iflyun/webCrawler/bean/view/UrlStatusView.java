package com.iflyun.webCrawler.bean.view;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import com.iflyun.webCrawler.bean.entity.Url;
import com.iflyun.webCrawler.bean.entity.UrlStatus;

public class UrlStatusView { 
	
	private String name;
	
	private String url;
	
	private String code;
	
	private String status;
	
	private Timestamp requestTime;
	
	private String requestTime1;
	
	private int timeUsed;
	
	private String result;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Timestamp getRequestTime() {
		return requestTime;
	}

	public void setRequestTime(Timestamp requestTime) {
		this.requestTime = requestTime;
	}

	public int getTimeUsed() {
		return timeUsed;
	}

	public void setTimeUsed(int timeUsed) {
		this.timeUsed = timeUsed;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}
	
	
	
	public String getRequestTime1() {
		return requestTime1;
	}

	public void setRequestTime1(String requestTime1) {
		this.requestTime1 = requestTime1;
	}

	public UrlStatusView(){

	}
	
	public UrlStatusView(UrlStatus status){
		
		Url url = status.getUrl();
		
		this.setName(url.getName());
		this.setCode(status.getStatusCode());
		this.setRequestTime(status.getRequestTime());
		Timestamp t =status.getRequestTime();		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		this.setRequestTime1(format.format(t));
		this.setResult(status.getResult());
		this.setStatus(status.getStatus()==null?"0":status.getStatus());
		this.setTimeUsed((int)status.getResponseTime());
		this.setUrl(url.getHost() +":"+url.getPort()+ url.getPath());
		
	}
}
 