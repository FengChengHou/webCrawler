package com.iflyun.webCrawler.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.iflyun.webCrawler.bean.entity.Function;
import com.iflyun.webCrawler.dao.FunctionDao;

@Repository("functionDao")
public class FunctionDaoImpl extends BaseDaoImpl<Function> implements FunctionDao {

	
	@Override	
	public List<Function> getFunctionByName(String Name){
		// TODO Auto-generated method stub
		StringBuffer sql = new StringBuffer(" from Function where function_name = ");
		sql.append("'" + Name + "'");
		List<Function> functionList = this.find(sql.toString());
		String code=functionList.get(0).getFunction_code().substring(0, 3);
		sql=new StringBuffer(" from Function where  function_code like ");
		sql.append("'" + code + "%' and status='1'");
		functionList = this.find(sql.toString());
		return functionList;
	}

}
