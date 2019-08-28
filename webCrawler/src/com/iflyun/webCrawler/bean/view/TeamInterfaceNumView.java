package com.iflyun.webCrawler.bean.view;

/**
 * 
* @ClassName: TeamInterfaceNumView 
* @Description: 团队接口数量工具类 
* @author byxs
* @date 2016年2月24日 下午4:38:50 
*
 */
public class TeamInterfaceNumView {
	
	private String teamid;
	private long count;
	
	public TeamInterfaceNumView(){};
	
	public TeamInterfaceNumView(String teamid, long count) {
		super();
		this.teamid = teamid;
		this.count = count;
	}

	public String getTeamid() {
		return teamid;
	}

	public void setTeamid(String teamid) {
		this.teamid = teamid;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}
	

}
