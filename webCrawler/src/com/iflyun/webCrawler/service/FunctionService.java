package com.iflyun.webCrawler.service;


import java.util.List;

import com.iflyun.webCrawler.bean.entity.Function;


public interface FunctionService extends BaseService<Function>{

	public List<Function> getFunctionByName(String Name);

}
