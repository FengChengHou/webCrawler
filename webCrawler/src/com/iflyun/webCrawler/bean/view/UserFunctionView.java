/**
 * 
 */
package com.iflyun.webCrawler.bean.view;

import com.iflyun.webCrawler.bean.entity.UserFunction;

/** 

 * @ClassName: UserFunctionView 

 * @Description: TODO(这里用一句话描述这个类的作用) 

 * @author wxy

 * @date 2016年3月1日 下午5:27:55 

 * 
 

 */
public class UserFunctionView {
	
	private String id;
	
	private String userid;
	
	private String functionid;
	
	private String status;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getFunctionid() {
		return functionid;
	}

	public void setFunctionid(String functionid) {
		this.functionid = functionid;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public UserFunctionView(UserFunction uf){
		
		this.setId(uf.getId());
		this.setFunctionid(uf.getFunction().getId());
		this.setUserid(uf.getUser().getId());
		this.setStatus(uf.getStatus());
		
	}

}
