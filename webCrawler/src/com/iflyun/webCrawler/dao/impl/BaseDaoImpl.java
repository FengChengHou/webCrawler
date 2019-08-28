package com.iflyun.webCrawler.dao.impl;


import java.io.Serializable;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import com.iflyun.webCrawler.common.util.GenericsUtils;
import com.iflyun.webCrawler.dao.BaseDao;
@Repository("baseDao")
public class BaseDaoImpl<T> implements BaseDao<T> {

	private static final Logger logger = Logger.getLogger(BaseDaoImpl.class);
	
	@Autowired
	private SessionFactory sessionFactory;

	private Class<T> persistentClass;

	@SuppressWarnings("unchecked")
	protected BaseDaoImpl() {
		this.persistentClass = (Class<T>) GenericsUtils.getSuperClassGenricType(getClass());
	}

	public Class<T> getPersistentClass() {
		return this.persistentClass;
	}

	/**
	 * 获得当前事物的session
	 * 
	 * @return org.hibernate.Session
	 */
	public Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@SuppressWarnings("unchecked")
	@Override
	public T get(Serializable id) {
		return (T) this.getCurrentSession().get(persistentClass, id);
	}

	@Override
	public Serializable save(T o) {
		if (o != null) {
			Serializable result = this.getCurrentSession().save(o);
			this.getCurrentSession().flush();
			return result;
		}
		return null;
	}
	
	/**
	 * 批量保存数据
	 * @param <T>
	 * @param entitys 要持久化的临时实体对象集合
	 */
	public void batchSave(List<T> entitys) {
		for (int i=0; i<entitys.size();i++) {
			this.getCurrentSession().save(entitys.get(i));
			if (i % 20 == 0) {
				//20个对象后才清理缓存，写入数据库
				this.getCurrentSession().flush();
				this.getCurrentSession().clear();
			}
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public T get(Class<T> c, Serializable id) {
		return (T) this.getCurrentSession().get(c, id);
	}

	@Override
	public T get(String hql) {
		Query q = this.getCurrentSession().createQuery(hql);
		@SuppressWarnings("unchecked")
		List<T> l = q.list();
		if (l != null && l.size() > 0) {
			return l.get(0);
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public T get(String hql, Map<String, Object> params) {
		Query q = this.getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		List<T> l = q.list();
		if (l != null && l.size() > 0) {
			return l.get(0);
		}
		return null;
	}

	@Override
	public void delete(T o) {
		try {
			if (o != null) {
				this.getCurrentSession().delete(o);
				this.getCurrentSession().flush();
				logger.debug("删除成功," + getPersistentClass().getName());
			}
			
		} catch (RuntimeException e) {
			logger.error("删除异常", e);
			throw e;
		}
		
	}

	@Override
	public void delete(Serializable id) {
		this.getCurrentSession().delete(this.get(id));
		this.getCurrentSession().flush();
	}

	@Override
	public void update(T o) {
		if (o != null) {
			this.getCurrentSession().update(o);
			this.getCurrentSession().flush();
		}
	}

	@Override
	public void saveOrUpdate(T o) {
		if (o != null) { 
			this.getCurrentSession().saveOrUpdate(o);
			this.getCurrentSession().flush();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T> find(String hql) {
		Query q = this.getCurrentSession().createQuery(hql);
		return q.list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T> find(String hql, Map<String, Object> params) {
		Query q = this.getCurrentSession().createQuery(hql);

		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				Object value = params.get(key);

				if (value instanceof List) {
					q.setParameterList(key, (List<Object>) value);
				} else {
					q.setParameter(key, value);
				}
			}
		}
		return q.list();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<T> find(String hql, Map<String, Object> params, int page, int rows) {
		Query q = this.getCurrentSession().createQuery(hql);
		if (!CollectionUtils.isEmpty(params)) {
			for (Map.Entry<String, Object> entry : params.entrySet()) {
				if (entry.getValue() instanceof List) {
					q.setParameterList(entry.getKey(), (List<Object>) entry.getValue());
				} else {
					q.setParameter(entry.getKey(), entry.getValue());
				}
			}
		}
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T> find(String hql, int page, int rows) {
		Query q = this.getCurrentSession().createQuery(hql);
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}

	@Override
	public long count(String hql) {
		Query q = this.getCurrentSession().createQuery(hql);
		return (Long) q.uniqueResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public long count(String hql, Map<String, Object> params) {
		Query q = this.getCurrentSession().createQuery(hql);

		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				Object value = params.get(key);

				if (value instanceof List) {
					q.setParameterList(key, (List<Object>) value);
				} else {
					q.setParameter(key, value);
				}
			}
		}
		return (Long) q.uniqueResult();
	}

	@Override
	public int executeHql(String hql) {
		Query q = this.getCurrentSession().createQuery(hql);
		return q.executeUpdate();
	}

	@Override
	public int executeHql(String hql, Map<String, Object> params) {
		Query q = this.getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findBySql(String sql) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		return q.list();
	}
	
	@SuppressWarnings({"rawtypes" })
	@Override
	public List findBySql(Class transFormClass, String sql, Map<String, Object> params) {
		Query q = this.getCurrentSession().createSQLQuery(sql).setResultTransformer(Transformers.aliasToBean(transFormClass));
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findBySql(String sql, int page, int rows) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findBySql(String sql, Map<String, Object> params) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findBySql(String sql, Map<String, Object> params,
			int page, int rows) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}

	@Override
	public int executeSql(String sql) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		return q.executeUpdate();
	}

	@Override
	public int executeSql(String sql, Map<String, Object> params) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.executeUpdate();
	}

	@Override
	public long countBySql(String sql) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		return ((BigInteger) q.uniqueResult()).longValue();
	}

	@Override
	public long countBySql(String sql, Map<String, Object> params) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return ((BigInteger) q.uniqueResult()).longValue();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T> sqlFind(String hql, int page, int rows, Map<String, Object> params) {
		Query query = this.getCurrentSession().createSQLQuery(hql).addEntity("t",persistentClass);
		if (!CollectionUtils.isEmpty(params)) {
			for (Map.Entry<String, Object> entry : params.entrySet()) {
				query.setParameter(entry.getKey(), entry.getValue());
			}
		}
		return query.setFirstResult((page - 1) * rows).setMaxResults(rows)
				.list();
	}

	@SuppressWarnings({"rawtypes" })
	@Override
	public List findBySql(Class transFormClass, String sql, Map<String, Object> params, int page, int rows) {
		Query q = getCurrentSession().createSQLQuery(sql).setResultTransformer(Transformers.aliasToBean(transFormClass));
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}
}
