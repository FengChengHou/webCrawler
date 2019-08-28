package com.iflyun.webCrawler.bean.view;

import java.sql.Timestamp;

import com.iflyun.webCrawler.bean.entity.DataSourse;



public class DataSourseView {
	private String id;

	private String dbName;

	private String url;

	private String type;

	private String userName;

	private String password;

	private Timestamp createTime;

	private Timestamp updateTime;
	
	private String teamid;
	
	public DataSourseView(){};
	
	public DataSourseView(DataSourse dataSourse) {
		this.setId(dataSourse.getId());
		this.setDbName(dataSourse.getDbName());
		this.setUrl(dataSourse.getUrl());
		this.setType(dataSourse.getType());
		this.setUserName(dataSourse.getUserName());
		this.setPassword(dataSourse.getPassword());
		this.setCreateTime(dataSourse.getCreateTime());
		this.setUpdateTime(dataSourse.getUpdateTime());
		this.setTeamid(dataSourse.getTeamid());
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public Timestamp getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}

	public String getTeamid() {
		return teamid;
	}

	public void setTeamid(String teamid) {
		this.teamid = teamid;
	}
	
	
	
}
