package com.iflyun.webCrawler.bean.view;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.LinkedList;
import java.util.List;


import com.iflyun.webCrawler.bean.entity.Param;
import com.iflyun.webCrawler.bean.entity.Url;

public class UrlView { 
	private String id;
	
	private int time;
	
	private String host;
	
	private int port;
	
	private String path;

	private String name;
	
	private String flag;
	
	private String flag1;
	
	private Timestamp updatetime;
	
	private String updatetime1;
	
	private int error_num;
	
	private String teamid;
	
	private String messagestatus;
	
	private String messagestatus1;
	
	private String emailstatus;
	
	private String emailstatus1;
	
	private String requestmethod;
		
    private String checkfield;
	
	private int checkcondition;
	
	private String checkvalue;
	
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

	private List<ParamView> paramViews;
	
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

	public String getMessagestatus() {
		return messagestatus;
	}

	public void setMessagestatus(String messagestatus) {
		this.messagestatus = messagestatus;
	}

	public List<ParamView> getParamViews() {
		return paramViews;
	}

	public void setParamViews(List<ParamView> paramViews) {
		this.paramViews = paramViews;
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


	public UrlView(){
		
	}

	public UrlView(Url url){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		this.setId(url.getId());
		this.setHost(url.getHost());
		this.setName(url.getName());
		this.setPath(url.getPath());
		this.setPort(url.getPort());
		this.setFlag(url.getFlag());
		this.setTime(url.getTime());
		this.setTeamid(url.getTeamid());
		this.setUpdatetime(url.getUpdatetime());
		this.setError_num(url.getErrornum());
		this.setMessagestatus(url.getMessagestatus());
		this.setEmailstatus(url.getEmailstatus());
		this.setRequestmethod(url.getRequestmethod());
		Timestamp t =url.getUpdatetime();		
		this.setUpdatetime1(format.format(t));
		if(url.getFlag().equals("-1"))
		{
			this.setFlag1("关闭");
		}else if(url.getFlag().equals("0"))
		{
			this.setFlag1("超时");
		}else if(url.getFlag().equals("1"))
		{
			this.setFlag1("临时响应");
		}else if(url.getFlag().equals("2"))
		{
			this.setFlag1("正常");
		}else if(url.getFlag().equals("3"))
		{
			this.setFlag1("重定向");
		}else if(url.getFlag().equals("4"))
		{
			this.setFlag1("请求错误");
		}else if(url.getFlag().equals("5"))
		{
			this.setFlag1("服务器错误");
		}
		this.setCheckfield(url.getCheckfield());
		this.setCheckcondition(url.getCheckcondition());
		this.setCheckvalue(url.getCheckvalue());
		this.setEmailstatus1(url.getEmailstatus().equals("0")?"开启":"关闭");
		this.setMessagestatus1(url.getMessagestatus().equals("0")?"开启":"关闭");
		List<ParamView> paramView = new LinkedList<ParamView>();
		List<Param> params = url.getParams();
		
		for(Param p :params){
			ParamView pView = new ParamView(p);
			paramView.add(pView);
		}
		
		this.setParamViews(paramView);
		this.setResulttype(url.getResulttype());
	}
	
	
	

	

	public UrlView(String id, int time, String host, int port, String path, String name, String flag, String flag1,
			Timestamp updatetime, String updatetime1, int error_num, String teamid, String messagestatus,
			String messagestatus1, String emailstatus, String emailstatus1, String requestmethod, String checkfield,
			int checkcondition, String checkvalue, List<ParamView> paramViews,int resulttype) {
		super();
		this.id = id;
		this.time = time;
		this.host = host;
		this.port = port;
		this.path = path;
		this.name = name;
		this.flag = flag;
		this.flag1 = flag1;
		this.updatetime = updatetime;
		this.updatetime1 = updatetime1;
		this.error_num = error_num;
		this.teamid = teamid;
		this.messagestatus = messagestatus;
		this.messagestatus1 = messagestatus1;
		this.emailstatus = emailstatus;
		this.emailstatus1 = emailstatus1;
		this.requestmethod = requestmethod;
		this.checkfield = checkfield;
		this.checkcondition = checkcondition;
		this.checkvalue = checkvalue;
		this.paramViews = paramViews;
		this.resulttype=resulttype;
	}


	public String getUpdatetime1() {
		return updatetime1;
	}

	public void setUpdatetime1(String updatetime1) {
		this.updatetime1 = updatetime1;
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

	public int getError_num() {
		return error_num;
	}

	public void setError_num(int errorNum) {
		error_num = errorNum;
	}

	public String getFlag1() {
		return flag1;
	}

	public void setFlag1(String flag1) {
		this.flag1 = flag1;
	}

	public String getMessagestatus1() {
		return messagestatus1;
	}

	public void setMessagestatus1(String messagestatus1) {
		this.messagestatus1 = messagestatus1;
	}

	public String getEmailstatus1() {
		return emailstatus1;
	}

	public void setEmailstatus1(String emailstatus1) {
		this.emailstatus1 = emailstatus1;
	}
	
	
	
	
	
}
