package com.iflyun.webCrawler.bean.view;

import java.sql.Timestamp;


public class DataStatusView {

	private int id;
	
	private int code;
	
	private String status;
	
	private Timestamp check_time;
	 
	private Timestamp max_time;
	
	private String checkTime;
	
	private String maxTime;
	
	private String dbName;
	
	private String check_name;
	

	public DataStatusView(){
		
	}
   
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Timestamp getCheck_time() {
		return check_time;
	}

	public void setCheck_time(Timestamp check_time) {
		this.check_time = check_time;
	}

	public Timestamp getMax_time() {
		return max_time;
	}

	public void setMax_time(Timestamp max_time) {
		this.max_time = max_time;
	}


	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}

	public String getCheck_name() {
		return check_name;
	}

	public void setCheck_name(String checkName) {
		check_name = checkName;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCheckTime() {
		return checkTime;
	}

	public void setCheckTime(String checkTime) {
		this.checkTime = checkTime;
	}

	public String getMaxTime() {
		return maxTime;
	}

	public void setMaxTime(String maxTime) {
		this.maxTime = maxTime;
	}
	
	
}
