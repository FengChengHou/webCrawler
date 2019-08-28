package com.iflyun.webCrawler.bean.view;

import com.iflyun.webCrawler.bean.entity.Param;


public class ParamView {
	
	private String key;
	
	private String value;
	
	private int order;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}
	
	public ParamView(Param p){
		this.setKey(p.getKey());
		this.setValue(p.getValue());
		this.setOrder(p.getOrder());
	}
	
	public ParamView(){

	}
	
}
