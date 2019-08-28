package com.iflyun.webCrawler.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.iflyun.webCrawler.bean.entity.DataSourse;
import com.iflyun.webCrawler.bean.view.DataSourseView;
import com.iflyun.webCrawler.common.Common;
import com.iflyun.webCrawler.common.util.SqlConn;
import com.iflyun.webCrawler.dao.DataSoursesDao;

@Repository("dataSourseDao")
public class DataSourseDaoImpl extends BaseDaoImpl<DataSourse> implements
		DataSoursesDao {
	
	SqlConn mysql = new SqlConn();
	private PreparedStatement ps;
	private ResultSet rs;

	@Override
	public List<DataSourseView> getDataBaseName() {
		List<DataSourseView> list = new ArrayList<DataSourseView>();
		String sql = "select c.dbName,c.id from  crawler_datasource c;";
		Connection conn = null;
		DataSourseView dataSourseView = null;
		try {
			conn = mysql.getConnection(Common.mysqlDriver, Common.mysqlUrl,
					Common.mysqlUsername, Common.mysqlPassword);
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				dataSourseView = new DataSourseView();
				dataSourseView.setDbName(rs.getString(1));
				dataSourseView.setId(rs.getString(2));
				list.add(dataSourseView);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mysql.close(rs, ps, conn);
		}

		return list;
	}

	@Override
	public int saveDataSourse(DataSourse dataSourse) {
		this.save(dataSourse);
		return 1;
	}

	@Override
	public int delDataSourse(String id) {
		int i = 0;
		String hql = "delete from DataSourse where id = (:id)";
		Query query = null;
		query = this.getCurrentSession().createQuery(hql);
		query.setParameter("id", id);
		i = query.executeUpdate();
		return i;
	}

	@Override
	public DataSourse getDataSourse(String id) {
		DataSourse ds = this.get(DataSourse.class, id);
		return ds;
	}

	@Override
	public int updateDataSourse(DataSourse dataSourse) {
		this.update(dataSourse);
		return 1;
	}

	@Override
	public List<DataSourse> dataSourseList(String teamid) {
		StringBuffer sql = new StringBuffer("from DataSourse");
		if(StringUtils.isNotBlank(teamid)){
			sql.append(" where teamid='"+teamid+"'");
		}
		List<DataSourse> list = this.find(sql.toString());
		return list;
	}

}
