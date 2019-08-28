package com.iflyun.webCrawler.dao.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.iflyun.webCrawler.bean.entity.Team;
import com.iflyun.webCrawler.bean.view.DimView;
import com.iflyun.webCrawler.bean.view.TeamInterfaceNumView;
import com.iflyun.webCrawler.dao.TeamDao;

@Repository("teamDao")
public class TeamDaoImpl extends BaseDaoImpl<Team> implements TeamDao {

	
	@Override
	public List<Team> TeamList() {
		
		StringBuffer sb = new StringBuffer("from Team");
		
		List<Team> teams = this.find(sb.toString());
		
		return teams;
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.dao.TeamDao#getTeamById(java.lang.String)
	 */
	@Override
	public Team getTeamById(String id) {
		
		Team team = null;
		
		StringBuffer sb = new StringBuffer("from Team where id = ");
		
		sb.append("'" + id + "'");
		
		List<Team> teams = this.find(sb.toString());
		if(teams!=null && teams.size()>0){
			 team = teams.get(0);
		}
		
		return team;
	}

	@Override
	public List<TeamInterfaceNumView> teamInterfaceNum() {
		StringBuffer sql = new StringBuffer("select u.teamid,count(*) from Url u group by u.teamid");
		List<TeamInterfaceNumView> list = new ArrayList<TeamInterfaceNumView>();
		@SuppressWarnings("rawtypes")
		Iterator it = this.getCurrentSession().createQuery(sql.toString()).iterate();
		while(it.hasNext()){
			TeamInterfaceNumView t = new TeamInterfaceNumView();
			Object[] o = (Object[]) it.next();
			t.setTeamid(o[0]==null?"":o[0].toString());
			t.setCount((Long)o[1]);
			list.add(t);
		}
		return list;
	}

	@Override
	public List<TeamInterfaceNumView> teamDataNum() {
		StringBuffer sql = new StringBuffer("select d.teamid,count(*) from DataMonitor d group by d.teamid");
		List<TeamInterfaceNumView> list = new ArrayList<TeamInterfaceNumView>();
		@SuppressWarnings("rawtypes")
		Iterator it = this.getCurrentSession().createQuery(sql.toString()).iterate();
		while(it.hasNext()){
			TeamInterfaceNumView t = new TeamInterfaceNumView();
			Object[] o = (Object[]) it.next();
			t.setTeamid(o[0]==null?"":o[0].toString());
			t.setCount((Long)o[1]);
			list.add(t);
		}
		return list;
	}

	@Override
	public List<Team> TeamListPage(String userid,int pageIndex, int pageSize) {
//		StringBuffer sql = new StringBuffer("select new com.iflyun.webCrawler.bean.entity.Team(t.team.id,t.team.team_code,t.team.team_name,t.team.email_to,t.team.message_to,t.team.status) from UserTeam t where t.user.id='"+userid+"' and t.status='1'");
//		Query q = this.getCurrentSession().createQuery(sql.toString());
//		Iterator it = q.setFirstResult((pageIndex - 1) * pageSize).setMaxResults(pageSize).list().iterator();
//		List<Team> list = new ArrayList<Team>();
//		while(it.hasNext()){
//			Team t = (Team)it.next();
//			list.add(t);
//		}
		
		
		StringBuffer sql = new StringBuffer("from Team");
		
		return this.find(sql.toString());
	}

	@Override
	public long TeamCount() {
		StringBuffer sql = new StringBuffer("select count(*) from Team");
		long count = this.count(sql.toString());
		return count;
	}

	@Override
	public List<DimView> noticeObject(String code) {
		StringBuffer sql = new StringBuffer("select new com.iflyun.webCrawler.bean.view.DimView(message_to,email_to) from Team where id='"+code+"'");
		Query q = this.getCurrentSession().createQuery(sql.toString());
		@SuppressWarnings("unchecked")
		List<DimView> list = q.list();
		return list;
	}

	@Override
	public int updateEmailAndMessage(String teamid, String messageTo, String emailTo) {
		Team t = this.get(Team.class, teamid);
		t.setMessage_to(messageTo);
		t.setEmail_to(emailTo);
		this.update(t);
		return 1;
	}
	

}
