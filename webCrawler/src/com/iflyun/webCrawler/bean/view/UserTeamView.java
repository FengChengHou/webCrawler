package com.iflyun.webCrawler.bean.view;


import com.iflyun.webCrawler.bean.entity.User;

/**
 * 
* @ClassName: UserTeamView 
* @Description: 团队申请加入
* @author byxs
* @date 2016年2月23日 下午2:25:27 
*
 */
public class UserTeamView {
	
	private int id;
	
	private String teamid;
	
	private String productname;
	
	private String permissions;
	
	private String time;
	
	private User user;
	
	private String phone;
	
	private String name;
	
	private String username;
	
	private String uuid;
	

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

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public String getPermissions() {
		return permissions;
	}

	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public UserTeamView() {
		super();
		
	}

	
	
	
	
	
	


}
