package com.iflyun.webCrawler.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.Function;
import com.iflyun.webCrawler.dao.FunctionDao;
import com.iflyun.webCrawler.service.FunctionService;


@Service("functionService")
public class FunctionServiceImpl extends BaseServiceImpl<Function> implements FunctionService {

	@Resource(name="functionDao")
	private FunctionDao functionDao;

	@Override
	public List<Function> getFunctionByName(String Name) {
		return functionDao.getFunctionByName(Name);
	}

	


	
}
