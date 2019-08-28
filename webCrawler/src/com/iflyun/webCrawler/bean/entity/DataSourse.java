package com.iflyun.webCrawler.bean.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.iflyun.webCrawler.bean.view.DataSourseView;

@Entity
@Table(name = "crawler_datasource")
public class DataSourse implements Serializable{

	private static final long serialVersionUID = 1L;

	@Column(name = "id", length = 36, nullable = false)
	@Id
	@GeneratedValue(generator = "uuid")
	// 指定生成器名称
	@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
	// 生成器名称，uuid生成类
	private String id;

	@Column(length = 30)
	private String dbName;

	@Column(length = 500)
	private String url;

	@Column(length = 30)
	private String type;

	@Column(length = 30)
	private String userName;

	@Column(length = 30)
	private String password;

	@Column(name="createTime")
	private Timestamp createTime;

	@Column(name="updateTime")
	private Timestamp updateTime;
	
	@Column(name="team_id")
	private String teamid;
	
	public DataSourse(){};
	
	public DataSourse(DataSourseView dataSourseView){
		this.setCreateTime(dataSourseView.getCreateTime());
		this.setDbName(dataSourseView.getDbName());
		this.setId(dataSourseView.getId());
		this.setPassword(dataSourseView.getPassword());
		this.setType(dataSourseView.getType());
		this.setUpdateTime(dataSourseView.getUpdateTime());
		this.setUrl(dataSourseView.getUrl());
		this.setUserName(dataSourseView.getUserName());
		this.setTeamid(dataSourseView.getTeamid());
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
