package com.iflyun.webCrawler.bean.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.iflyun.webCrawler.bean.view.DataMonitorView;

@Entity
@Table(name = "crawler_data_monitor")
public class DataMonitor implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Column(name="id",length = 36, nullable = false)
	@Id
	@GeneratedValue(generator = "uuid")   //指定生成器名称
	@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")  //生成器名称，uuid生成类
	private String id;
	
	@Column(length=255)
	private String check_name;
	
	@Column(length=255)
	private String sid;
	
	@Column(length=500)
	private String sql;
	
	@Column(length=255)
	private String text;
	
	@Column(length=20)
	private int status;
	
	@Column(name="error_num")
	private int errornum;
	
	@Column(name="updatetime")
	private Timestamp updatetime;
	
	@Column(name = "team_id")
	private String teamid;

	@Column(name = "message_status")
	private String messagestatus;

	@Column(name = "email_status")
	private String emailstatus; 
	
//	@OneToMany(mappedBy="dataMonitor" ,cascade={CascadeType.ALL,CascadeType.REMOVE},fetch = FetchType.EAGER)
//	@Fetch(FetchMode.JOIN)
//	private List<DataStatus> dataStatus;

	public DataMonitor(){
		
	}
	
	public DataMonitor(DataMonitorView data) {
		this.setId(data.getId());
		this.setCheck_name(data.getCheck_name());
		this.setSid(data.getSid());
		this.setSql(data.getSql());
		this.setText(data.getText());
		this.setErrornum(data.getError_num());
		this.setUpdatetime(data.getUpdatetime());
		this.setTeamid(data.getTeamid());
		this.setMessagestatus(data.getMessagestatus());
		this.setEmailstatus(data.getEmailstatus());
		//this.setStatus(data.getStatus());
		
//		List<DataStatus> dataStatus = new LinkedList<DataStatus>();
//		for (DataStatusView dView:data.getDataStatusView()){
//			DataStatus d = new DataStatus(dView);
//			dataStatus.add(d);
//		}
		
//		this.setDataStatus(dataStatus);
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCheck_name() {
		return check_name;
	}

	public void setCheck_name(String check_name) {
		this.check_name = check_name;
	}

	

	public String getSid() {
		return sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

//	public List<DataStatus> getDataStatus() {
//		return dataStatus;
//	}
//
//	public void setDataStatus(List<DataStatus> dataStatus) {
//		this.dataStatus = dataStatus;
//	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public int getErrornum() {
		return errornum;
	}

	public void setErrornum(int errornum) {
		this.errornum = errornum;
	}

	public Timestamp getUpdatetime() {
		return updatetime;
	}

	public void setUpdatetime(Timestamp updatetime) {
		this.updatetime = updatetime;
	}

	public String getTeamid() {
		return teamid;
	}

	public void setTeamid(String teamid) {
		this.teamid = teamid;
	}

	public String getMessagestatus() {
		return messagestatus;
	}

	public void setMessagestatus(String messagestatus) {
		this.messagestatus = messagestatus;
	}

	public String getEmailstatus() {
		return emailstatus;
	}

	public void setEmailstatus(String emailstatus) {
		this.emailstatus = emailstatus;
	}

	
	
}
