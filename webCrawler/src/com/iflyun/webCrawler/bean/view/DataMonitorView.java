package com.iflyun.webCrawler.bean.view;


import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import com.iflyun.webCrawler.bean.entity.DataMonitor;

public class DataMonitorView {

	private String id;
	
	private String check_name;
	
	private String sid;
	
	private String sql;
	
	private String text;
	
	private String status;
	
	private int error_num;
	
	private Timestamp updatetime;
	
	private String updateTime;
	//private List<DataStatusView> dataStatusView;
	private String dbName;
	
	private String messagestatus;
	
	private String emailstatus;
	
	private String teamid;
	
	public DataMonitorView() {
		
	}
	
	public DataMonitorView(DataMonitor dataMonitor) {
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		this.setId(dataMonitor.getId());
		this.setCheck_name(dataMonitor.getCheck_name());
		this.setSid(dataMonitor.getSid());
		this.setSql(dataMonitor.getSql());
		this.setText(dataMonitor.getText());
		if(dataMonitor.getStatus()==0){
			this.setStatus("关闭");
		}else if(dataMonitor.getStatus()==1){
			this.setStatus("开启");
		}else{
			this.setStatus("超时");
		}
		
		this.setError_num(dataMonitor.getErrornum());
		this.setUpdateTime(sdf.format(dataMonitor.getUpdatetime()));
		if(dataMonitor.getMessagestatus().equals("0")){
			this.setMessagestatus("开启");
		}else{
			this.setMessagestatus("关闭");
		}
		
		if(dataMonitor.getEmailstatus().equals("0")){
			this.setEmailstatus("开启");
		}else{
			this.setEmailstatus("关闭");
		}
		this.setTeamid(dataMonitor.getTeamid());
		
//		List<DataStatusView> dataStatusView = new LinkedList<DataStatusView>();
//		List<DataStatus> params = dataMonitor.getDataStatus();
//		
//		for(DataStatus p :params){
//			DataStatusView dataStatus = new DataStatusView(p);
//			dataStatusView.add(dataStatus);
//		}
//		this.setDataStatusView(dataStatusView);
		
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public int getError_num() {
		return error_num;
	}

	public void setError_num(int errorNum) {
		error_num = errorNum;
	}

	public Timestamp getUpdatetime() {
		return updatetime;
	}

	public void setUpdatetime(Timestamp updatetime) {
		this.updatetime = updatetime;
	}

	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
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

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	public String getTeamid() {
		return teamid;
	}

	public void setTeamid(String teamid) {
		this.teamid = teamid;
	}
	

}
