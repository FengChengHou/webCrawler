package com.iflyun.webCrawler.bean.view;

/**
 * 
* @ClassName: WarningNoticeView 
* @Description: 告警通知设置工具类
* @author byxs
* @date 2016年2月24日 下午5:14:58 
*
 */
public class WarningNoticeView {
	
	private int id;
	private String teamid;
	private String teamName;
	private String teamCode;
	private long tnum;
	private long dnum;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTeamid() {
		return teamid;
	}
	public void setTeamid(String teamid) {
		this.teamid = teamid;
	}
	public String getTeamName() {
		return teamName;
	}
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	public long getTnum() {
		return tnum;
	}
	public void setTnum(long tnum) {
		this.tnum = tnum;
	}
	public long getDnum() {
		return dnum;
	}
	public void setDnum(long dnum) {
		this.dnum = dnum;
	}
	public String getTeamCode() {
		return teamCode;
	}
	public void setTeamCode(String teamCode) {
		this.teamCode = teamCode;
	}
	


}
