package com.iflyun.webCrawler.bean.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;


@Entity
@Table(name = "crawler_data_status")
public class DataStatus implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	@Column(length = 36, nullable = false,unique=true)
	@Id
	@GeneratedValue(generator = "uuid")   //指定生成器名称
	@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")  //生成器名称，uuid生成类
	private String id;
	
	@Column(length=255)
	private String status;
	
	private Timestamp check_time;
	
	private Timestamp max_time;
	
	@ManyToOne(fetch = FetchType.EAGER,cascade=CascadeType.REMOVE)
	@JoinColumn(name="m_id", referencedColumnName = "ID", nullable = false)
	private DataMonitor dataMonitor;
	
	@Column(name="version",length=100)
	private int version;
	
	@Column(name="team_id")
	private String teamid;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public DataMonitor getDataMonitor() {
		return dataMonitor;
	}

	public void setDataMonitor(DataMonitor dataMonitor) {
		this.dataMonitor = dataMonitor;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public String getTeamid() {
		return teamid;
	}

	public void setTeamid(String teamid) {
		this.teamid = teamid;
	}
	
}
