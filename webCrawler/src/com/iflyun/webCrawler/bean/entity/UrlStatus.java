package com.iflyun.webCrawler.bean.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "crawler_url_status")
public class UrlStatus implements Serializable {

	private static final long serialVersionUID = 1L;

	@SequenceGenerator(sequenceName = "seq_crawler_url_status", initialValue = 1, allocationSize = 1, name = "seq")
	@Id
	@Column(length = 36, nullable = false)
	@GeneratedValue(generator = "uuid")
	// 指定生成器名称
	@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
	// 生成器名称，uuid生成类
	private String id;

	@ManyToOne(targetEntity = Url.class,cascade = CascadeType.REMOVE)
	@JoinColumn(name = "url_id")
	private Url url;
	
	@Column(name = "request_time")
	private Timestamp requestTime;

	@Column(name = "status_code", length = 10)
	private String statusCode;

	@Column(name = "status", length = 20)
	private String status;

	@Column(name = "error_code", length = 10)
	private String errorCode;

	@Column(name = "error_mssg", length = 200)
	private String errorMssg;

	@Column(name = "response_time")
	private int responseTime;

	@Column(name = "version", length = 30)
	private long version;

	@Column(name = "result", length = 200000)
	private String result;
	
	@Column(name="team_id",length=36)
	private String teamid;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Url getUrl() {
		return url;
	}

	public void setUrl(Url url) {
		this.url = url;
	}

	public Timestamp getRequestTime() {
		return requestTime;
	}

	public void setRequestTime(Timestamp requestTime) {
		this.requestTime = requestTime;
	}

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public String getStatus() {
		switch (Integer.parseInt(this.statusCode == null ? "0"
				: this.statusCode.substring(0, 1))) {
		case 0:
			status = "请求超时/服务器拒绝";
			break;
		case 1:
			status = "临时响应";
			break;
		case 2:
			status = "成功";
			break;
		case 3:
			status = "重定向";
			break;
		case 4:
			status = "请求错误";
			break;
		case 5:
			status = "服务器错误 ";
			break;
		default:
			status = "";
		}

		this.setStatus(status);

		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMssg() {
		return errorMssg;
	}

	public void setErrorMssg(String errorMssg) {
		this.errorMssg = errorMssg;
	}

	public String getResult() {
		return result;
	}

	public long getResponseTime() {
		return responseTime;
	}

	public void setResponseTime(int responseTime) {
		this.responseTime = responseTime;
	}

	public long getVersion() {
		return version;
	}

	public void setVersion(long version) {
		this.version = version;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getTeamid() {
		return teamid;
	}

	public void setTeamid(String teamid) {
		this.teamid = teamid;
	}

}
