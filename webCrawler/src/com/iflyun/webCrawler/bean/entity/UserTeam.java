package com.iflyun.webCrawler.bean.entity;

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
@Table(name="crawler_user_team")
public class UserTeam {
	
	@Column(length = 36, nullable = false, unique = true)
	@Id
	@GeneratedValue(generator = "uuid")
	// 指定生成器名称
	@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
	// 生成器名称，uuid生成类
	private String id;
	 
//	@ManyToOne(fetch = FetchType.LAZY,cascade=CascadeType.REMOVE)
//	@JoinColumn(name="userid", referencedColumnName = "ID", nullable = false)
	@ManyToOne(targetEntity = User.class,cascade = CascadeType.REMOVE)
	@JoinColumn(name = "userid")
	private User user;

//	@ManyToOne(fetch = FetchType.LAZY,cascade=CascadeType.REMOVE)
//	@JoinColumn(name="teamid", referencedColumnName = "ID", nullable = false)
	@ManyToOne(targetEntity = Team.class,cascade = CascadeType.REMOVE)
	@JoinColumn(name = "teamid")
	private Team team;
	
	@Column(name="status")
	private String status;
	
	@Column(name="createTime")
	private	Timestamp createTime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	


}
