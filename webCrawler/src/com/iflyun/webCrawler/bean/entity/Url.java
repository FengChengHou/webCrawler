package com.iflyun.webCrawler.bean.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.GenericGenerator;

import com.iflyun.webCrawler.bean.view.ParamView;
import com.iflyun.webCrawler.bean.view.UrlView;

@Entity
@Table(name = "crawler_url")
public class Url implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(length = 36, nullable = false, unique = true)
	@Id
	@GeneratedValue(generator = "uuid")
	// 指定生成器名称
	@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
	// 生成器名称，uuid生成类
	private String id;

	@Column(length = 10, name = "time")
	private int time;

	@Column(length = 20)
	private String host;

	@Column(length = 10)
	private int port;

	@Column(length = 225)
	private String path;

	@Column(length = 225)
	private String name;

	@Column(name = "flag", length = 255)
	private String flag;

	@Column(name = "updatetime")
	private Timestamp updatetime;

	@Column(name = "error_num")
	private int errornum;

	@Column(name = "team_id")
	private String teamid;

	@Column(name = "message_status")
	private String messagestatus;

	@Column(name = "email_status")
	private String emailstatus;

	@Column(name = "request_method")
	private String requestmethod;

	@OneToMany(mappedBy = "url", cascade = { CascadeType.ALL,
			CascadeType.REMOVE }, fetch = FetchType.EAGER)
	@Fetch(FetchMode.JOIN)
	private List<Param> params;
	
	@Column(name = "check_field")
	private String checkfield;
	
	@Column(name = "check_condition")
	private int checkcondition;
	
	@Column(name = "check_value")
	private String checkvalue;
	
	@Column(name = "result_type")
	private int resulttype;

	public String getTeamid() {
		return teamid;
	}

	public void setTeamid(String teamid) {
		this.teamid = teamid;
	}

	public String getEmailstatus() {
		return emailstatus;
	}

	public void setEmailstatus(String emailstatus) {
		this.emailstatus = emailstatus;
	}

	public String getRequestmethod() {
		return requestmethod;
	}

	public void setRequestmethod(String requestmethod) {
		this.requestmethod = requestmethod;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Param> getParams() {
		return params;
	}

	public void setParams(List<Param> params) {
		this.params = params;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public Timestamp getUpdatetime() {
		return updatetime;
	}

	public void setUpdatetime(Timestamp updatetime) {
		this.updatetime = updatetime;
	}

	public Url() {

	}

	public int getErrornum() {
		return errornum;
	}

	public void setErrornum(int errornum) {
		this.errornum = errornum;
	}

	public String getMessagestatus() {
		return messagestatus;
	}

	public void setMessagestatus(String messagestatus) {
		this.messagestatus = messagestatus;
	}
	
	

	public String getCheckfield() {
		return checkfield;
	}

	public void setCheckfield(String checkfield) {
		this.checkfield = checkfield;
	}

	public int getCheckcondition() {
		return checkcondition;
	}

	public void setCheckcondition(int checkcondition) {
		this.checkcondition = checkcondition;
	}

	public String getCheckvalue() {
		return checkvalue;
	}

	public void setCheckvalue(String checkvalue) {
		this.checkvalue = checkvalue;
	}

	
	

	public int getResulttype() {
		return resulttype;
	}

	public void setResulttype(int resulttype) {
		this.resulttype = resulttype;
	}

	public Url(UrlView u) {
		this.setHost(u.getHost());
		this.setPort(u.getPort());
		this.setName(u.getName());
		this.setPath(u.getPath());
		this.setTime(u.getTime());
		this.setFlag(u.getFlag());
		this.setErrornum(u.getError_num());
		this.setMessagestatus(u.getMessagestatus() == null ? "0" : u
				.getMessagestatus());
		this.setEmailstatus(u.getEmailstatus());
		this.setRequestmethod(u.getRequestmethod());
		this.setTeamid(u.getTeamid());
		this.setUpdatetime(u.getUpdatetime());
		List<Param> params = new LinkedList<Param>();
		for (ParamView pView : u.getParamViews()) {
			Param p = new Param(pView);
			params.add(p);
		}
		this.setCheckfield(u.getCheckfield());
		this.setCheckcondition(u.getCheckcondition());
		this.setCheckvalue(u.getCheckvalue());
		this.setParams(params);
		this.setResulttype(u.getResulttype());
	}

}
