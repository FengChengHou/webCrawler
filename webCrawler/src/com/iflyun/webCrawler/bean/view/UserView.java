/**
 * 
 */
package com.iflyun.webCrawler.bean.view;

import com.iflyun.webCrawler.bean.entity.User;

/** 

 * @ClassName: UserView 

 * @Description: TODO(这里用一句话描述这个类的作用) 

 * @author wxy

 * @date 2016年3月1日 下午3:15:43 

 * 
 

 */
public class UserView {
	
	private int i;

	private String id;
	
	private String username;
	
	private String name;
	
	private String telephone;
	
	private String teamname;
	
	private String status;
	
	private String remarks;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getTeamname() {
		return teamname;
	}

	public void setTeamname(String teamname) {
		this.teamname = teamname;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public int getI() {
		return i;
	}

	public void setI(int i) {
		this.i = i;
	}

	public UserView(User u){
		this.setId(u.getId());
		this.setUsername(u.getUsername());
		this.setName(u.getName());
		this.setTelephone(u.getPhone());
		
		StringBuffer sb = new StringBuffer("");
		if(u.getUserTeam().size() > 0){
			for(int i = 0;i<u.getUserTeam().size();i++){
				sb.append(u.getUserTeam().get(i).getTeam().getTeam_name()+",");
			}
		}else{
			sb.append("暂未参加团队");
		}
		
		this.setTeamname(sb.toString());
		this.setStatus(u.getStatus());
		this.setRemarks(u.getRemarks());
		
		
		
	}

}
