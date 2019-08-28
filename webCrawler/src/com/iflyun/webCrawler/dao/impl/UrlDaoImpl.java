package com.iflyun.webCrawler.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.*;//5w

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.iflyun.webCrawler.bean.entity.Param;
import com.iflyun.webCrawler.bean.entity.Url;
import com.iflyun.webCrawler.common.Common;
import com.iflyun.webCrawler.common.util.SqlConn;
import com.iflyun.webCrawler.dao.UrlDao;

@Repository("urlDao")
public class UrlDaoImpl extends BaseDaoImpl<Url> implements UrlDao {

	private PreparedStatement ps;
	private ResultSet rs;
	
	Common common = new Common();
//	SqlConn mysql = new SqlConn(common.mysqlDriver, common.mysqlUrl,
//			common.mysqlUsername, Common.mysqlPassword);
	
	SqlConn mysql = new SqlConn();
	
	public List<Url> gerAllUrl() {

		StringBuffer sql = new StringBuffer(" from Url ");

		List<Url> urlList = this.find(sql.toString());

		return urlList;
	}

	public int deleteUrlIds(List<String> ids) {

		System.out.println("ids:" + ids);
		for (int i = 0; i < ids.size(); i++) {
			System.out.println("ids[" + i + "]:" + ids.get(i).toString());
		}
		String hql = "delete from Url where id = (:id)";
		Query query = null;
		for (String id : ids) {
			query = this.getCurrentSession().createQuery(hql);
			query.setParameter("id", id);
			query.executeUpdate();
		}

		return 1;
	}

	public int updateUrl(String id, String flag) {//5w
		String hql = "update Url set flag =:flag  where id=:id";
		Query query = this.getCurrentSession().createQuery(hql);
		query.setString("flag", flag);
		query.setString("id", id);
		return query.executeUpdate();
	}

	public int updateAllUrl(List<String> ids, String flag) {
		Timestamp updatetime = new Timestamp(System.currentTimeMillis());
		String hql = "update Url set flag =:flag ,updatetime="
			+ "'"+updatetime +"'"+ " where id=:id";
		Query query = this.getCurrentSession().createQuery(hql);
		int a = 0;
		for (String id : ids) {
			query.setString("flag", flag);
			query.setString("id", id);
			if (query.executeUpdate()>= 1) {
				a = 1;
			} else {
				a = 0;
			}
			this.cleanZero(id);
		}
		return a;
	}

	@Override
	public List<Url> getUrlFlag() {
		//StringBuffer sql = new StringBuffer(" from Url where flag!='-1' and errornum < 3");
		StringBuffer sql = new StringBuffer(" from Url where flag!='-1' ");

		List<Url> urlList = this.find(sql.toString());
		return urlList;
	}

	@Override
	public Url getPath(String path) {
		StringBuffer sql = new StringBuffer(" from Url where path=");

		sql.append(path);

		System.out.println("sql---" + sql);

		List<Url> urls = this.find(sql.toString());
		Url url = urls.get(0);

		return url;
	}
	
	@Override
	public Url getUrl(String id) {
		StringBuffer sql = new StringBuffer("from Url where id = ");
		sql.append("'" + id + "'");
		Url url = null;
		
		List<Url> urls = this.find(sql.toString());
		url = urls.get(0);
		return url;
		
	}

	@Override
	public int deleteParam(String id) {
		String sql = "delete from crawler_param where url_id =?";
		int flag = 1;
		Connection conn = null;
		try {
			conn = mysql.getConnection(Common.mysqlDriver, Common.mysqlUrl,Common.mysqlUsername, Common.mysqlPassword);
			ps = conn.prepareStatement(sql);
			ps.setString(1, id);
			int count = ps.executeUpdate();
			if(count==0){
				flag=0;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally{
			mysql.close(rs, ps, conn);
		}
		
		return flag;
	}

	
	@Override
	public int updateUrlParams(String urlId, List<Param> list) {
		
		this.deleteParam(urlId);
		
		if(list!=null){
			for(int i = 0;i<list.size();i++){
				list.get(i).getUrl().setId(urlId);
				this.getCurrentSession().save(list.get(i));
			}
				this.getCurrentSession().flush();
				this.getCurrentSession().clear();
				return 1;
		}
		else {
			return 0;
		}
		
	}

	@Override
	public int addErrorNum(String urlId) {
		String sql = "update crawler_url set error_num=error_num+1 where id="+"'"+urlId+"'";
		return this.executeSql(sql);		
	}
	
	
    //根据id获取错误次数
	@Override
	public int getErrorNum(String urlId) {
		StringBuffer sql = new StringBuffer(" from Url where id = ");
		sql.append("'" + urlId + "'");
		List<Url> urlList = this.find(sql.toString());
		return urlList.get(0).getErrornum();
	}
	
	@Override
	public String getMessagestatus(String urlId) {
		StringBuffer sql = new StringBuffer(" from Url where id = ");
		sql.append("'" + urlId + "'");
		List<Url> urlList = this.find(sql.toString());
		return urlList.get(0).getMessagestatus();
	}

	@Override
	public void cleanZero(String urlId) {
		//Timestamp updatetime = new Timestamp(System.currentTimeMillis());
		String hql = "update Url set errornum =:errornum where id=:id";
		Query query = this.getCurrentSession().createQuery(hql);
		query.setString("id", urlId);
		query.setInteger("errornum", 0);
		query.executeUpdate();
	}
	
	public List<Url> getListUrl(int page,int rows,String dept) {

		StringBuffer sql = new StringBuffer(" from Url where department=");
		sql.append("'" + dept + "'");
		List<Url> urlList = this.find(sql.toString(),page,rows);

		return urlList;
	}

	public List<Url> getListUrl(int page,int rows,String teamid,String interfaceName){
		StringBuffer sql = new StringBuffer(" from Url where teamid=");
		sql.append("'" + teamid + "'");
		if(interfaceName!=null&&!interfaceName.equals("")){
			sql.append(" and name like'%" + interfaceName + "%'");
		}
		List<Url> urlList = this.find(sql.toString(),page,rows);
		return urlList;
	}
	
	
	@Override
	public long getTotal(String dept) {
		long count = this.count("select count(*) from Url where department='"+dept+"'");
		return count;
	}

	//修改短信状态
	@Override
	public int updateMessagestatus(List<String> id,String messagestatus) {
		System.out.println(messagestatus);
		String hql = "update Url set messagestatus='"+messagestatus+"' where id=:id";
		Query query = this.getCurrentSession().createQuery(hql);
		int a = 0;
		for (String ids : id) {
			query.setString("id", ids);
			if (query.executeUpdate()>= 1) {
				a = 1;
			} else {
				a = 0;
			}
		}
		return a;
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.dao.UrlDao#getTeamUrl()
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getTeamUrl() {
		
		List<String> teamids = null;
		
		StringBuffer sql = new StringBuffer("select DISTINCT(teamid) FROM Url");
		
		Query query = this.getCurrentSession().createQuery(sql.toString());
		
		teamids = query.list();
		
		return teamids;
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.dao.UrlDao#urlByTeamId(java.lang.String)
	 */
	@Override
	public List<Url> urlByTeamId(String teamid) {
		
		StringBuffer sb = new StringBuffer("from Url where flag !='-1' and teamid = ");
		sb.append("'"+teamid+"'");
		
		List<Url> urls = this.find(sb.toString());
		
		return urls;
	}

	@Override
	public long getTotalByTeam(String teamid,String interfaceName) {
		String sql="select count(*) from Url where teamid='"+teamid+"'";
		if(interfaceName!=null&&!interfaceName.equals(""))
		{
			sql+=" and name like '%"+interfaceName+"%'";
		}
		long count = this.count(sql);
		return count;
	}

	

}
