package com.iflyun.webCrawler.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.iflyun.webCrawler.bean.entity.DataMonitor;
import com.iflyun.webCrawler.bean.view.DataMonitorView;
import com.iflyun.webCrawler.bean.view.DataSourseView;
import com.iflyun.webCrawler.bean.view.DataStatusView;
import com.iflyun.webCrawler.bean.view.ResultView;
import com.iflyun.webCrawler.common.Common;
import com.iflyun.webCrawler.common.util.SqlConn;
import com.iflyun.webCrawler.dao.DataDao;

@Repository("dataDao")
public class DataDaoImpl extends BaseDaoImpl<DataMonitor> implements DataDao {

	private static final Logger logger = Logger.getLogger(DataDaoImpl.class);
	
	private PreparedStatement ps;
	private ResultSet rs;
	Common common = new Common();

	SqlConn racCeneter = new SqlConn();
	SqlConn mysql = new SqlConn();

	@Override
	public List<ResultView> checkMaxUpdate(List<DataMonitor> dm) {
		
			List<ResultView> list = new ArrayList<ResultView>();
			ResultView result = null;
			for (DataMonitor s : dm) {
					try {
						DataSourseView dataSourseView = this.getDataBaseType(s.getId());
						DataStatusView dataStatusView = this.getDataStatus(s.getId());
						if (dataSourseView.getType().trim().equals("oracle")) {

							result = new ResultView();
							result = this.dynamicMonitor(Common.orcaleDriver, s.getSql()
									.toString(), dataSourseView.getUserName(),
									dataSourseView.getPassword(), dataSourseView.getUrl(),
									s.getId(), s.getText(), dataStatusView.getCheck_name());

						} else if (dataSourseView.getType().trim().equals("mysql")) {
							result = new ResultView();
							result = this.dynamicMonitor(Common.mysqlDriver, s.getSql()
									.toString(), dataSourseView.getUserName(),
									dataSourseView.getPassword(), dataSourseView.getUrl(),
									s.getId(), s.getText(), dataStatusView.getCheck_name());
						} else if (dataSourseView.getType().trim().equals("sqlserver")) {
							result = new ResultView();
							result = this.dynamicMonitor(Common.sqlDriver, s.getSql()// 忘修改了
									.toString(), dataSourseView.getUserName(),
									dataSourseView.getPassword(), dataSourseView.getUrl(),
									s.getId(), s.getText(), dataStatusView.getCheck_name());
						}
						list.add(result);
					} catch (Exception e) {
						// TODO: handle exception
					}
					
				
				
				
			}
			return list;
		
	
	}

	@Override
	public List<DataMonitor> getdataMonitorList() {

		StringBuffer sql = new StringBuffer("from DataMonitor where status!=0");
		List<DataMonitor> list = this.find(sql.toString());
		return list;
	}

	@Override
	public int deleteDataIds(List<String> ids) {
		int j = 0;
		for (int i = 0; i < ids.size(); i++) {
			System.out.println("ids[" + i + "]:" + ids.get(i).toString());
		}
		String hql = "delete from DataMonitor where id = (:id)";
		Query query = null;
		for (String id : ids) {
			query = this.getCurrentSession().createQuery(hql);
			query.setParameter("id", id);
			j = query.executeUpdate();
		}

		return j;
	}

	// 新增数据监视器
	@Override
	public int saveDataMonitor(DataMonitor dataMonitor) {
		int flag = 1;
		String uuid = UUID.randomUUID().toString();
		String sql = "insert into crawler_data_monitor(id,check_name,sid,`sql`,text,`status`,error_num,updatetime,team_id,message_status,email_status) values(?,?,?,?,?,?,?,?,?,?,?)";
		Connection conn = null;
		try {
			conn = mysql.getConnection(Common.mysqlDriver, Common.mysqlUrl,
					Common.mysqlUsername, Common.mysqlPassword);
			ps = conn.prepareStatement(sql);
			ps.setString(1, uuid);
			ps.setString(2, dataMonitor.getCheck_name());
			ps.setString(3, dataMonitor.getSid());
			ps.setString(4, dataMonitor.getSql());
			ps.setString(5, dataMonitor.getText());
			ps.setInt(6, 1);
			ps.setInt(7, 0);
			ps.setTimestamp(8, dataMonitor.getUpdatetime());
			ps.setString(9, dataMonitor.getTeamid());
			ps.setString(10, dataMonitor.getMessagestatus());
			ps.setString(11, dataMonitor.getEmailstatus());
			int count = ps.executeUpdate();
			if (count == 0) {
				flag = 0;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mysql.close(rs, ps, conn);
		}
		return flag;

	}

	// 批量开启关闭
	public int updateAllData(List<String> ids, String status) {
		
		Timestamp updatetime = new Timestamp(System.currentTimeMillis());
		String hql = "update DataMonitor set updatetime=" + "'" + updatetime + "',errornum=0,status='"+status+"' where id=:id";
		Query query = this.getCurrentSession().createQuery(hql);
		int a = 0;
		for (String id : ids) {
			query.setString("id", id);
			if (query.executeUpdate() == 1) {
				a = 1;
			} else {
				a = 0;
			}
			//this.cleanZero(id, s);
		}
		return a;
	}

	@Override
	public DataMonitorView getDataMonitor(String id) {
		String sql = "select c.*,d.dbName from crawler_data_monitor c join crawler_datasource d on d.id=c.sid where c.id = ?";
		Connection conn = null;
		DataMonitorView dataMonitorView = null;
		try {
			conn = mysql.getConnection(Common.mysqlDriver, Common.mysqlUrl,
					Common.mysqlUsername, Common.mysqlPassword);
			ps = conn.prepareStatement(sql);
			ps.setString(1, id);
			rs = ps.executeQuery();
			while (rs.next()) {
				dataMonitorView = new DataMonitorView();
				dataMonitorView.setId(rs.getString(1));
				dataMonitorView.setCheck_name(rs.getString(2));
				dataMonitorView.setSid(rs.getString(3));
				dataMonitorView.setSql(rs.getString(4));
				dataMonitorView.setText(rs.getString(5));
				dataMonitorView.setStatus(rs.getString(6));
				dataMonitorView.setError_num(rs.getInt(7));
				dataMonitorView.setUpdatetime(rs.getTimestamp(8));
				dataMonitorView.setDbName(rs.getString(9));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mysql.close(rs, ps, conn);
		}
		return dataMonitorView;
	}

	@Override
	public int updateStatus(String id) {
		String sql = "update crawler_data_monitor set status = 2"
				+ " where id = " + "'" + id + "'";
		this.executeSql(sql);
		return 1;
	}

	@Override
	public int updateData(DataMonitor data) {
		String sql = "update crawler_data_monitor c set c.check_name=?,c.sid=?,c.sql=?,c.text=?,c.updatetime=?,c.team_id=?,c.message_status=?,c.email_status=? where c.id=?";
		int flag = 1;
		Connection conn = null;
		try {
			conn = mysql.getConnection(Common.mysqlDriver, Common.mysqlUrl,
					Common.mysqlUsername, Common.mysqlPassword);
			ps = conn.prepareStatement(sql);
			ps.setString(1, data.getCheck_name());
			ps.setString(2, data.getSid());
			ps.setString(3, data.getSql());
			ps.setString(4, data.getText());
			ps.setTimestamp(5, data.getUpdatetime());
			ps.setString(6, data.getTeamid());
			ps.setString(7, data.getMessagestatus());
			ps.setString(8, data.getEmailstatus());
			ps.setString(9, data.getId());
			int count = ps.executeUpdate();
			if (count < 1) {
				flag = 0;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mysql.close(rs, ps, conn);
		}
		return flag;
		
	}

	@Override
	public int addErrorNum(String urlId) {
		String hql = "update DataMonitor set errornum =:errornum where id=:id";
		Query query = this.getCurrentSession().createQuery(hql);
		query.setString("id", urlId);
		query.setInteger("errornum", this.getErrorNum(urlId) + 1);
		return query.executeUpdate();
	}

	@Override
	public int getErrorNum(String urlId) {
		StringBuffer sql = new StringBuffer(" from DataMonitor where id = ");
		sql.append("'" + urlId + "'");
		List<DataMonitor> urlList = this.find(sql.toString());
		System.out.println("错误data名称：" + urlList.get(0).getCheck_name());
		System.out.println("错误次数：" + urlList.get(0).getErrornum());
		return urlList.get(0).getErrornum();
	}

	@Override
	public void cleanZero(String urlId, int status) {

		String hql = "update DataMonitor set errornum =:errornum,status=:status where id=:id";
		Query query = this.getCurrentSession().createQuery(hql);
		query.setString("id", urlId);
		query.setInteger("errornum", 0);
		query.setInteger("status", status);
		query.executeUpdate();
	}

	@Override
	public List<DataMonitorView> dataMonitorList() {
		// StringBuffer sql = new StringBuffer("from DataMonitor");
		List<DataMonitorView> list = new ArrayList<DataMonitorView>();
		String sql = "select c.*,d.dbName from crawler_data_monitor c join crawler_datasource d on d.id=c.sid";
		Connection conn = null;
		DataMonitorView dataMonitorView = null;
		try {
			conn = mysql.getConnection(Common.mysqlDriver, Common.mysqlUrl,
					Common.mysqlUsername, Common.mysqlPassword);
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				dataMonitorView = new DataMonitorView();
				dataMonitorView.setId(rs.getString(1));
				dataMonitorView.setCheck_name(rs.getString(2));
				dataMonitorView.setSid(rs.getString(3));
				dataMonitorView.setSql(rs.getString(4));
				dataMonitorView.setText(rs.getString(5));
				dataMonitorView.setStatus(rs.getString(6));
				dataMonitorView.setError_num(rs.getInt(7));
				dataMonitorView.setUpdatetime(rs.getTimestamp(8));
				dataMonitorView.setDbName(rs.getString(9));
				list.add(dataMonitorView);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mysql.close(rs, ps, conn);
		}
		return list;
	}

	// 动态的检查
	@Override
	public ResultView dynamicMonitor(String driver, String sql,
			String username, String password, String url, String mid,
			String content, String checkName) {
		Connection conn = null;
		// @SuppressWarnings("static-access")
		SqlConn racC = new SqlConn();
		ResultView result = null;
		try {
			result = new ResultView();
			conn = racC.getConnection(driver, url, username, password);
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();

			while (rs.next()) {
				result.setI(rs.getInt(1));
				result.setMaxupdate(rs.getTimestamp(2));
				// i>0说明当前没有超时
			}
			result.setMid(mid);
			result.setChecktime(new Timestamp(System.currentTimeMillis()));
			result.setContent(content);
			// result.setMaxupdate(maxtime);
			result.setCheckname(checkName);

		} catch (Exception e) {
			//e.printStackTrace();
			logger.info(e.getMessage());
		} finally {
			racC.close(rs, ps, conn);
		}

		return result;
	}

	@Override
	public DataSourseView getDataBaseType(String id) {
		String sql = "select d.* from crawler_datasource d join crawler_data_monitor c on d.id=c.sid where c.id = ?";
		Connection conn = null;
		DataSourseView dataSourseView = null;
		try {
			conn = mysql.getConnection(Common.mysqlDriver, Common.mysqlUrl,
					Common.mysqlUsername, Common.mysqlPassword);
			ps = conn.prepareStatement(sql);
			ps.setString(1, id);
			rs = ps.executeQuery();
			while (rs.next()) {
				dataSourseView = new DataSourseView();
				dataSourseView.setId(rs.getString(1));
				dataSourseView.setDbName(rs.getString(2));
				dataSourseView.setUrl(rs.getString(3));
				dataSourseView.setType(rs.getString(4));
				dataSourseView.setUserName(rs.getString(5));
				dataSourseView.setPassword(rs.getString(6));
				System.out.println("Password:" + rs.getString(6) + "-username"
						+ rs.getString(5) + "-url" + rs.getString(3));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mysql.close(rs, ps, conn);
		}
		return dataSourseView;
	}

	@Override
	public List<DataMonitorView> getDataList(int page, int rows) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
		int begin = (page - 1) * rows;
		StringBuffer sql = new StringBuffer(
				"select c.*,d.dbName from crawler_data_monitor c join crawler_datasource d on d.id=c.sid limit "
						+ begin + "," + rows);
		// String sql =
		// "select c.*,d.dbName from crawler_data_monitor c join crawler_datasource d on d.id=c.sid limit"+indexPage+"*"+rows+","+rows;

		Connection conn = null;
		List<DataMonitorView> list = new ArrayList<DataMonitorView>();
		try {
			conn = mysql.getConnection(Common.mysqlDriver, Common.mysqlUrl,
					Common.mysqlUsername, Common.mysqlPassword);
			ps = conn.prepareStatement(sql.toString());
			rs = ps.executeQuery();
			while (rs.next()) {
				DataMonitorView dataMonitorView = new DataMonitorView();
				dataMonitorView.setId(rs.getString(1));
				dataMonitorView.setCheck_name(rs.getString(2));
				dataMonitorView.setSid(rs.getString(3));
				dataMonitorView.setSql(rs.getString(4));
				dataMonitorView.setText(rs.getString(5));
				dataMonitorView.setStatus(rs.getString(6));
				dataMonitorView.setError_num(rs.getInt(7));
				dataMonitorView.setUpdateTime(sdf.format(rs.getTimestamp(8)));
				dataMonitorView.setMessagestatus(rs.getString(10));
				dataMonitorView.setEmailstatus(rs.getString(11));
				dataMonitorView.setDbName(rs.getString(12));
				list.add(dataMonitorView);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mysql.close(rs, ps, conn);
		}

		return list;
	}

	@Override
	public long getTotal() {
		long count = this
				.countBySql("select count(*) from crawler_data_monitor");
		return count;
	}

	@Override
	public DataStatusView getDataStatus(String mid) {
		DataStatusView datastatusview = null;
		/*
		 * String sql =
		 * "select d.max_time,t.check_name from crawler_data_status d join crawler_data_monitor t on d.m_id=t.id where d.m_id=?"
		 * ; Connection conn = null; try { conn =
		 * mysql.getConnection(Common.mysqlDriver, Common.mysqlUrl,
		 * Common.mysqlUsername, Common.mysqlPassword); ps =
		 * conn.prepareStatement(sql); ps.setString(1, mid); rs =
		 * ps.executeQuery(); while (rs.next()) { datastatusview = new
		 * DataStatusView(); datastatusview.setMax_time(rs.getTimestamp(1));
		 * datastatusview.setCheck_name(rs.getString(2)); } } catch (Exception
		 * e) { e.printStackTrace(); } finally { mysql.close(rs, ps, conn); }
		 */
		String sql = "select t.check_name from crawler_data_monitor t where t.id=?";
		Connection conn = null;
		try {
			conn = mysql.getConnection(Common.mysqlDriver, Common.mysqlUrl,
					Common.mysqlUsername, Common.mysqlPassword);
			ps = conn.prepareStatement(sql);
			ps.setString(1, mid);
			rs = ps.executeQuery();
			while (rs.next()) {
				datastatusview = new DataStatusView();
				datastatusview.setCheck_name(rs.getString(1));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mysql.close(rs, ps, conn);
		}
		return datastatusview;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.iflyun.webCrawler.dao.DataDao#getDataMonitorById(java.lang.String)
	 */
	@Override
	public DataMonitor getDataMonitorById(String id) {
//		StringBuffer sb = new StringBuffer("from DataMonitor where id =");
//		sb.append("'" + id + "'");
//
//		List<DataMonitor> dataMonitors = this.find(sb.toString());
//		DataMonitor dm = new DataMonitor();
//
//		if (dataMonitors.size() > 0 && dataMonitors != null) {
//			dm = dataMonitors.get(0);
//		}
//
//		return dm;
		DataMonitor dm = this.get(DataMonitor.class, id);
		return dm;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.iflyun.webCrawler.dao.DataDao#getTeamMonitor()
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getTeamMonitor() {
		List<String> teamids = null;

		StringBuffer sql = new StringBuffer(
				"select DISTINCT(teamid) FROM DataMonitor");

		Query query = this.getCurrentSession().createQuery(sql.toString());

		teamids = query.list();

		return teamids;
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.dao.DataDao#getdataMonitorByTeamdId(java.lang.String)
	 */
	@Override
	public List<DataMonitor> getdataMonitorByTeamdId(String teamid) {
		StringBuffer sql = new StringBuffer("from DataMonitor where status!=0 and teamid=");
		sql.append("'"+teamid+"'");
		List<DataMonitor> list = this.find(sql.toString());
		return list;
	}

	@Override
	public List<DataMonitor> getDataListByTeamId(String teamid, String dataName, int pageIndex, int pageSize) {
		StringBuffer sql = new StringBuffer("from DataMonitor where teamid='"+teamid+"'");
		if(StringUtils.isNotBlank(dataName)){
			sql.append(" and check_name like '%"+dataName+"%'");
		}
		List<DataMonitor> list = this.find(sql.toString(), pageIndex, pageSize);
		return list;
	}

	@Override
	public long dataCountByTeamId(String teamid,String dataName) {
		StringBuffer sql = new StringBuffer("select count(*) from DataMonitor where teamid='"+teamid+"'");
		if(StringUtils.isNotBlank(dataName)){
			sql.append(" and check_name like '%"+dataName+"%'");
		}
		long count = this.count(sql.toString());
		return count;
	}

	@Override
	public int updateMessagestatus(List<String> ids, String messagestatus) {
		Timestamp updatetime = new Timestamp(System.currentTimeMillis());
		String hql = "update DataMonitor set messagestatus='"+messagestatus+"',updatetime='"+updatetime+"' where id=:id";
		Query query = this.getCurrentSession().createQuery(hql);
		int a = 0;
		for (String id : ids) {
			query.setString("id", id);
			if (query.executeUpdate()>= 1) {
				a = 1;
			} else {
				a = 0;
			}
		}
		return a;
		
	}

}
