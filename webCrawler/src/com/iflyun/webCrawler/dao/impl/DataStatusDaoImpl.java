package com.iflyun.webCrawler.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.iflyun.webCrawler.bean.entity.DataStatus;
import com.iflyun.webCrawler.bean.view.DataStatusView;
import com.iflyun.webCrawler.common.Common;
import com.iflyun.webCrawler.common.util.SqlConn;
import com.iflyun.webCrawler.dao.DataStatusDao;

@Repository("dataStatusDao")
public class DataStatusDaoImpl extends BaseDaoImpl<DataStatus> implements
		DataStatusDao {
	SqlConn mysql = new SqlConn();
	private PreparedStatement ps;
	private ResultSet rs;

	@Override
	public List<DataStatusView> getdataStatus() {

	
		List<DataStatusView> list = new ArrayList<DataStatusView>();
		String sql = "SELECT t.check_name,t.dbName,c.max_time,c.`status`,c.check_time,t.`status` code FROM crawler_data_status c JOIN (SELECT d.id,e.dbName,d.check_name,d.`status` FROM crawler_data_monitor d JOIN crawler_datasource e ON e.id = d.sid) t ON t.id = c.m_id WHERE c.version = (SELECT MAX(version) FROM crawler_data_status)";
		Connection conn = null;
		DataStatusView dataStatusView = null;
		try {
			conn = mysql.getConnection(Common.mysqlDriver,Common.mysqlUrl,Common.mysqlUsername,Common.mysqlPassword);
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				dataStatusView = new DataStatusView();
				dataStatusView.setCheck_name(rs.getString(1));
				dataStatusView.setDbName(rs.getString(2));
				dataStatusView.setMax_time(rs.getTimestamp(3));
				dataStatusView.setStatus(rs.getString(4));
				dataStatusView.setCheck_time(rs.getTimestamp(5));
				dataStatusView.setCode(rs.getInt(6));
				list.add(dataStatusView);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mysql.close(rs, ps, conn);
		}

		return list;
	}

	@Override
	public int inserDataAtatus(List<DataStatus> dvs) {
		int i = 0;
		this.batchSave(dvs);
		return i;
	}

	@Override
	public int getMaxVersion() {

		int seq = Integer.parseInt(this.getCurrentSession().createSQLQuery(
				"select max(version) from crawler_data_status ").uniqueResult()
				.toString());
		seq = seq + 1;

		return seq;
	}

	@Override
	public List<DataStatusView> getDataStatusList(String teamid,int page, int rows) {
		int begin = (page-1)*rows;
		StringBuffer sql = new StringBuffer("SELECT t.check_name,t.dbName,c.max_time,c.`status`,c.check_time,t.`status` code FROM crawler_data_status c JOIN (SELECT d.id,e.dbName,d.check_name,d.`status` FROM crawler_data_monitor d JOIN crawler_datasource e ON e.id = d.sid) t ON t.id = c.m_id WHERE c.team_id='"+teamid+"' and c.version = (SELECT MAX(version) FROM crawler_data_status) limit "+begin+","+rows);
		List<DataStatusView> list = new ArrayList<DataStatusView>();
		Connection conn = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		
		try {
			conn = mysql.getConnection(Common.mysqlDriver,Common.mysqlUrl,Common.mysqlUsername,Common.mysqlPassword);
			ps = conn.prepareStatement(sql.toString());
			rs = ps.executeQuery();
			int i=1;
			while(rs.next()){
				DataStatusView dataStatusView = new DataStatusView();
				dataStatusView.setId(i++);
				dataStatusView.setCheck_name(rs.getString(1));
				dataStatusView.setDbName(rs.getString(2));
				if(rs.getTimestamp(3)!=null){
					dataStatusView.setMaxTime(sdf.format(rs.getTimestamp(3)));
				}
				else{
					dataStatusView.setMaxTime("--");
				}
				dataStatusView.setStatus(rs.getString(4));
				dataStatusView.setCheckTime(sdf.format(rs.getTimestamp(5)));
				dataStatusView.setCode(rs.getInt(6));
				list.add(dataStatusView);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally{
			mysql.close(rs, ps, conn);
		}
		
		return list;
	}

	@Override
	public long getTotal(String teamid) {
		long count = this.countBySql("select count(*) from crawler_data_status c where c.team_id='"+teamid+"' and c.version = (SELECT MAX(version) FROM crawler_data_status)");
		return count;
	}

}
