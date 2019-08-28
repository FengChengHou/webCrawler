package com.iflyun.webCrawler.service;

/**
 * 基础Service
 * 
 * @author 柏耀明
 * 
 */
public interface BaseService<T> {	
	
	public T del(T obj);
	
	public T add(T obj);
	
	public T edit(T obj);
	
	public T get(String id);
	
	public T update(T obj);
	
	/**
	 * 获得资源文件中的中文消息
	 * @param key 消息key
	 * @return    如果找到消息key对应的消息,返回该消息,否则返回空
	 */
	public String getMessage(String key);
	
	/**
	 * 获得资源文件中的中文消息
	 * @param key    消息key
	 * @param params 占位符参数数组
	 * @return 如果找到消息key对应的消息,返回该消息,否则返回空
	 */
	public String getMessage(String key, Object[] params);
	
	/**
	 * 获得资源文件中的中文消息
	 * @param key        消息key
	 * @param replaceMsg 替代消息
	 * @return 如果找到消息key对应的消息,返回该消息,否则返回替代消息
	 */
	public String getMessage(String key, String replaceMsg);
	
	/**
	 * 获得资源文件中的中文消息
	 * @param key		  消息key
	 * @param params	  占位符参数数组
	 * @param replaceMsg 替代消息
	 * @return 如果找到消息key对应的消息,返回该消息,否则返回替代消息
	 */
	public String getMessage(String key, Object[] params, String replaceMsg);

}
