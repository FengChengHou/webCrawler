package com.iflyun.webCrawler.bean.domain;

import net.sf.json.JSON;

public class ResultJson {
	
	private String status;
	
	private String code;
	
	private String msg;
	
	private JSON data;
	
	public ResultJson(){}
	
	public ResultJson(String status, String code, String msg, JSON data) {
		super();
		this.status = status;
		this.code = code;
		this.msg = msg;
		this.data = data;
	}

	public JSON getData() {
		return data;
	}

	public void setData(JSON data) {
		this.data = data;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}


}
