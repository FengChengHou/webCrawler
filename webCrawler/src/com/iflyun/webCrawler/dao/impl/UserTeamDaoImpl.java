package com.iflyun.webCrawler.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.iflyun.webCrawler.bean.entity.Team;
import com.iflyun.webCrawler.bean.entity.User;
import com.iflyun.webCrawler.bean.entity.UserTeam;
import com.iflyun.webCrawler.bean.view.UserTeamView;
import com.iflyun.webCrawler.common.Common;
import com.iflyun.webCrawler.common.util.SqlConn;
import com.iflyun.webCrawler.dao.UserTeamDao;

@Repository("userTeamDao")
public class UserTeamDaoImpl extends BaseDaoImpl<UserTeam> implements UserTeamDao {

	SqlConn sqlConn = new SqlConn();
	
	@Override
	public List<UserTeamView> getUserTeam(String userid,int pageIndex,int pageSize) {
		StringBuffer sql = new StringBuffer("select t.id, t.team_name, t1.`status`,t1.createTime from crawler_team t left join crawler_user_team t1 on t.id=t1.teamid and t1.userid=? order by t1.createTime desc limit ?,?");
		PreparedStatement ps = null;
		ResultSet rs = null;
		Connection conn = null;
		List<UserTeamView> userTeamList = new ArrayList<UserTeamView>();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			conn = sqlConn.getConnection(Common.mysqlDriver, Common.mysqlUrl, Common.mysqlUsername,
					Common.mysqlPassword);
			ps = conn.prepareStatement(sql.toString());
			ps.setString(1, userid);
			ps.setInt(2, (pageIndex-1)*pageSize);
			ps.setInt(3, pageSize);
			rs = ps.executeQuery();
			int i = 1;
			while(rs.next()){
				UserTeamView ut = new UserTeamView();
				ut.setId(i++);
				ut.setTeamid(rs.getString(1));
				ut.setProductname(rs.getString(2));
				String p = rs.getString(3);
				if(StringUtils.isBlank(p)){
					ut.setPermissions("");
				}else if(p.equals("0")){
					ut.setPermissions("待审核");
				}else if(p.equals("1")){
					ut.setPermissions("审核通过");
				}else{
					ut.setPermissions("拒绝");
				}
				Timestamp t = rs.getTimestamp(4);
				ut.setTime(t==null?"":format.format(t));
				userTeamList.add(ut);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			sqlConn.close(rs, ps, conn);
		}
		
		return userTeamList;
	}

	@Override
	public long UserTeamCount() {
		StringBuffer sql = new StringBuffer("select count(*) from Team");
		long count = this.count(sql.toString());
		return count;
	}

	@Override
	public int addOrUpdateUserTeam(String userid, String teamid) {
		StringBuffer sql = new StringBuffer("from UserTeam where user.id='"+userid+"'"+"and team.id='"+teamid+"'");
		UserTeam Ut = this.get(sql.toString());
		if(Ut!=null){
			Ut.setStatus("0");
			this.update(Ut);
		}else if(Ut==null){
			UserTeam userTeam = new UserTeam();
			Team t = new Team();
			User u = new User();
			t.setId(teamid);
			u.setId(userid);
			userTeam.setTeam(t);
			userTeam.setUser(u);
			userTeam.setStatus("0");
			userTeam.setCreateTime(new Timestamp(System.currentTimeMillis()));
			this.save(userTeam);
		}
		return 1;
	}


	@Override
	public List<UserTeam> getTeamByUserID(String userid) {
		StringBuffer sql = new StringBuffer(" from UserTeam where user.id = ");
		sql.append("'" + userid + "' and status = '1' ");
		List<UserTeam> userTeamList = this.find(sql.toString());
		return userTeamList;
	}

	@Override
	public List<UserTeam> getUserTeamByStatus(String status, int pageIndex, int pageSize) {
		StringBuffer sql = new StringBuffer("from UserTeam ");	
		if(!status.equals("-1"))
		{
			sql.append( "where status = '"+status+"' ");
		}
		sql.append( "order by createTime desc");
		List<UserTeam> userTeamList = this.find(sql.toString(), pageIndex, pageSize);
		return userTeamList;
	}

	@Override
	public long getTotalByStatus(String status) {
		StringBuffer sql = new StringBuffer("select count(*) from UserTeam ");
		if(!status.equals("-1"))
		{
			sql.append( "where status = '"+status+"' ");
		}
		long count = this.count(sql.toString());
		return count;
	}

	@Override
	public List<UserTeam> TeamListByPage(String userid, int pageIndex, int pageSize) {
		StringBuffer sql = new StringBuffer("from UserTeam where user.id='"+userid+"' and status='1'");
		List<UserTeam> list = this.find(sql.toString(), pageIndex, pageSize);
		return list;
	}


}
