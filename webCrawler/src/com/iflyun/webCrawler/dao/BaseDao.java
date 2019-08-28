package com.iflyun.webCrawler.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 基础数据库操作类
 * 
 * 其他DAO继承此类获取常用的数据库操作方法
 * 
 * @param <T>
 *            模型
 */
public interface BaseDao<T> {

	/**
	 * 保存一个对象
	 * 
	 * @param o 对象
	 * @return 对象的ID
	 */
	public Serializable save(T o);
	
	/**
	 * 批量保存对象
	 * 
	 * @param entitys 对象
	 * @return 对象的ID
	 */
	public void batchSave(List<T> entitys);

	/**
	 * 删除一个对象
	 * 
	 * @param o
	 *            对象
	 */
	public void delete(T o);
	
	
	/**
	 * 删除一个对象
	 * @param id
	 */
	public void delete(Serializable id); 
	

	/**
	 * 更新一个对象
	 * 
	 * @param o
	 *            对象
	 */
	public void update(T o);

	/**
	 * 保存或更新一个对象
	 * 
	 * @param o
	 *            对象
	 */
	public void saveOrUpdate(T o);

	/**
	 * 通过主键获得对象
	 * 
	 * @param c
	 *            类名.class
	 * @param id
	 *            主键
	 * @return 对象
	 */
	public T get(Class<T> c, Serializable id);
	
	/**
	 * 通过主键获得对象
	 * 
	 * @param id
	 *            主键
	 * @return 对象
	 */
	public T get(Serializable id);

	/**
	 * 通过HQL语句获取一个对象
	 * 
	 * @param hql
	 *            HQL语句
	 * @return 对象
	 */
	public T get(String hql);

	/**
	 * 通过HQL语句获取一个对象
	 * 
	 * @param hql
	 *            HQL语句
	 * @param params
	 *            参数
	 * @return 对象
	 */
	public T get(String hql, Map<String, Object> params);

	/**
	 * 获得对象列表
	 * 
	 * @param hql
	 *            HQL语句
	 * @return List
	 */
	public List<T> find(String hql);

	/**
	 * 获得对象列表
	 * 
	 * @param hql
	 *            HQL语句
	 * @param params
	 *            参数
	 * @return List
	 */
	public List<T> find(String hql, Map<String, Object> params);

	@SuppressWarnings("rawtypes")
	public List findBySql(Class transFormClass, String sql, Map<String, Object> params);
	
	/**
	 * 获得分页后的对象列表
	 * 
	 * @param hql
	 *            HQL语句
	 * @param page
	 *            要显示第几页
	 * @param rows
	 *            每页显示多少条
	 * @return List
	 */
	public List<T> find(String hql, int page, int rows);

	/**
	 * 获得分页后的对象列表
	 * 
	 * @param hql
	 *            HQL语句
	 * @param params
	 *            参数
	 * @param page
	 *            要显示第几页
	 * @param rows
	 *            每页显示多少条
	 * @return List
	 */
	public List<T> find(String hql, Map<String, Object> params, int page, int rows);

	/**
	 * 统计数目
	 * 
	 * @param hql
	 *            HQL语句(select count(*) from T)
	 * @return long
	 */
	public long count(String hql);

	/**
	 * 统计数目
	 * 
	 * @param hql
	 *            HQL语句(select count(*) from T where xx = :xx)
	 * @param params
	 *            参数
	 * @return long
	 */
	public long count(String hql, Map<String, Object> params);

	/**
	 * 执行一条HQL语句
	 * 
	 * @param hql
	 *            HQL语句
	 * @return 响应结果数目
	 */
	public int executeHql(String hql);

	/**
	 * 执行一条HQL语句
	 * 
	 * @param hql		HQL语句
	 * @param params	参数
	 * @return 			响应结果数目
	 */
	public int executeHql(String hql, Map<String, Object> params);

	/**
	 * 获得结果集
	 * 
	 * @param sql		SQL语句
	 * @return 			结果集
	 */
	public List<Object[]> findBySql(String sql);

	/**
	 * 获得结果集
	 * 
	 * @param sql		SQL语句
	 * @param page		要显示第几页
	 * @param rows		每页显示多少条
	 * @return 			结果集
	 */
	public List<Object[]> findBySql(String sql, int page, int rows);

	/**
	 * 获得结果集
	 * 
	 * @param sql		SQL语句
	 * @param params	参数
	 * @return 			结果集
	 */
	public List<Object[]> findBySql(String sql, Map<String, Object> params);

	/**
	 * 获得结果集
	 * 
	 * @param sql		SQL语句
	 * @param params	参数
	 * @param page		要显示第几页
	 * @param rows		每页显示多少条
	 * @return 			结果集
	 */
	public List<Object[]> findBySql(String sql, Map<String, Object> params, int page, int rows);
	
	
	public List<T> sqlFind(String hql, int page, int rows, Map<String, Object> params);

	/**
	 * 执行SQL语句
	 * 
	 * @param sql SQL语句
	 * @return 响应行数
	 */
	public int executeSql(String sql);

	/**
	 * 执行SQL语句
	 * 
	 * @param sql SQL语句
	 * @param params 参数
	 * @return 响应行数
	 */
	public int executeSql(String sql, Map<String, Object> params);

	/**
	 * 统计
	 * @param sql SQL语句
	 * @return 数目
	 */
	public long countBySql(String sql);

	/**
	 * 统计
	 * 
	 * @param sql SQL语句
	 * @param params 参数
	 * @return 数目
	 */
	public long countBySql(String sql, Map<String, Object> params);

	/**
	 *使用原生sql进行查询,transFormClass sql查询返回结果集的映射实体,该实体类的属性名要和数据库字段相同
	 * @param transFormClass 映射实体
	 * @param sql sql
	 * @param params 查询参数
	 * @param page
	 * @param rows
	 * @return 数目
	 */
	@SuppressWarnings("rawtypes")
	public List findBySql(Class transFormClass, String sql, Map<String, Object> params, int page, int rows);
	
}
