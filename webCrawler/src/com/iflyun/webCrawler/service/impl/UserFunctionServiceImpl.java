package com.iflyun.webCrawler.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.UserFunction;
import com.iflyun.webCrawler.dao.UserFunctionDao;
import com.iflyun.webCrawler.service.UserFunctionService;

@Service("userFunctionService")
public class UserFunctionServiceImpl extends BaseServiceImpl<UserFunction> implements UserFunctionService {

	@Resource(name="userFunctionDao")
	private UserFunctionDao userFunctionDao;

	@Override
	public List<UserFunction> getUserFunctionByUser(String userid) {
		
		return userFunctionDao.getUserFunctionByUser(userid);
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.service.UserFunctionService#updateUserFunction(java.lang.String, java.lang.String[])
	 */
	@Override
	public int updateUserFunction(String userid, String[] id) {
		return userFunctionDao.updateUserFunction(userid, id);
	}



	
}
