package com.iflyun.webCrawler.service.impl;


import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.common.util.GenericsUtils;
import com.iflyun.webCrawler.dao.BaseDao;
import com.iflyun.webCrawler.service.BaseService;

/**
 * @author 柏耀明
 */
@Service("baseService")
public class BaseServiceImpl<T> implements BaseService<T> {
	
	@Autowired
	public MessageSource messageSource;
	
	@Autowired
	private BaseDao<T> baseDao;
	
	private Class<T> persistentClass;
	
	@SuppressWarnings("unchecked")
	protected BaseServiceImpl() {
		this.persistentClass = (Class<T>) GenericsUtils.getSuperClassGenricType(getClass());  
	}
	
	@Override
	public T del(T obj) {
		baseDao.delete(obj);
		return obj;
	}
	
	@Override
	public T update(T obj){
		baseDao.update(obj);
		return obj;
	}

	@Override
	public T add(T obj) {
		baseDao.save(obj);
		return obj;
	}

	@Override
	public T edit(T obj) {
		baseDao.update(obj);
		return obj;
	}

	@Override
	public T get(String id) {
		return baseDao.get(this.getPersistentClass(), id);
	}
	
	/**
	 * 获得资源文件中的中文消息
	 * @param key 消息key
	 * @return    如果找到消息key对应的消息,返回该消息,否则返回空
	 */
	public String getMessage(String key){
		return messageSource.getMessage(key, null, Locale.CHINA);
	}
	
	/**
	 * 获得资源文件中的中文消息
	 * @param key    消息key
	 * @param params 占位符参数数组
	 * @return 如果找到消息key对应的消息,返回该消息,否则返回空
	 */
	public String getMessage(String key, Object[] params){
		return messageSource.getMessage(key, params, Locale.CHINA);
	}
	
	/**
	 * 获得资源文件中的中文消息
	 * @param key        消息key
	 * @param replaceMsg 替代消息
	 * @return 如果找到消息key对应的消息,返回该消息,否则返回替代消息
	 */
	public String getMessage(String key, String replaceMsg){
		return messageSource.getMessage(key, null ,replaceMsg, Locale.CHINA);
	}
	
	/**
	 * 获得资源文件中的中文消息
	 * @param key		  消息key
	 * @param params	  占位符参数数组
	 * @param replaceMsg 替代消息
	 * @return 如果找到消息key对应的消息,返回该消息,否则返回替代消息
	 */
	public String getMessage(String key, Object[] params, String replaceMsg){
		return messageSource.getMessage(key, params ,replaceMsg, Locale.CHINA);
	}

	public Class<T> getPersistentClass() {
		return persistentClass;
	}

	public void setPersistentClass(Class<T> persistentClass) {
		this.persistentClass = persistentClass;
	}
	
	/*
		 属性					类型				默认值			说明
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
		propagation 			Propagation		枚举REQUIRED 	事务传播属性 
		 
		isolation				isolation       枚举DEFAULT			事务隔离级别
		
		readOnly				boolean			false			是否只读
		
		timeout					int				-1				超时(秒)
		
		rollbackFor				Class[]			{}				需要回滚的异常类
		
		rollbackForClassName	String[]		{}				需要回滚的异常类名
		
		noRollbackFor			Class[]			{}				不需要回滚的异常类
		
		noRollbackForClassName	String[]		{}				不需要回滚的异常类名
	*/

}
