package com.iflyun.webCrawler.service;


import java.util.List;

import com.iflyun.webCrawler.bean.entity.UserFunction;

public interface UserFunctionService extends BaseService<UserFunction>{

	public List<UserFunction> getUserFunctionByUser (String userid);
	
	public int updateUserFunction(String userid,String[] id);

}
