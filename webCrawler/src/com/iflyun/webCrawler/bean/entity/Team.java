package com.iflyun.webCrawler.bean.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name = "crawler_team")
/**
 * 

* @ClassName: Team 

* @Description: 团队实体类

* @author wenquxing

* @date 2016年2月23日 上午9:47:31 

*
 */
public class Team {
	
	@Column(name = "id", length = 36, nullable = false)
	@Id
	private String id;
	
	@Column(name="team_code")
	private String  team_code;
	
	@Column(name="team_name")
	private String team_name;
	
	@Column(name="email_to")
	private String email_to;
	
	@Column(name="message_to")
	private String message_to;
	
	@Column(name="status")
	private String status;

	@OneToMany(mappedBy = "team", cascade = { CascadeType.ALL,
			CascadeType.REMOVE }, fetch = FetchType.EAGER)
	@Fetch(FetchMode.JOIN)
	private List<UserTeam> userTeam;
	
	public Team(){};

	public Team(String id, String team_code, String team_name, String email_to, String message_to, String status) {
		super();
		this.id = id;
		this.team_code = team_code;
		this.team_name = team_name;
		this.email_to = email_to;
		this.message_to = message_to;
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTeam_code() {
		return team_code;
	}

	public void setTeam_code(String team_code) {
		this.team_code = team_code;
	}

	public String getTeam_name() {
		return team_name;
	}

	public void setTeam_name(String team_name) {
		this.team_name = team_name;
	}

	public String getEmail_to() {
		return email_to;
	}

	public void setEmail_to(String email_to) {
		this.email_to = email_to;
	}

	public String getMessage_to() {
		return message_to;
	}

	public void setMessage_to(String message_to) {
		this.message_to = message_to;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<UserTeam> getUserTeam() {
		return userTeam;
	}

	public void setUserTeam(List<UserTeam> userTeam) {
		this.userTeam = userTeam;
	}
	
	
}
