package com.iflyun.webCrawler.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.Team;
import com.iflyun.webCrawler.bean.view.DimView;
import com.iflyun.webCrawler.bean.view.TeamInterfaceNumView;
import com.iflyun.webCrawler.dao.TeamDao;
import com.iflyun.webCrawler.service.TeamService;

@Service("teamService")
public class TeamServiceImpl extends BaseServiceImpl<Team> implements TeamService {
	
	@Resource(name="teamDao")
	private TeamDao teamDao;

	@Override
	public List<Team> TeamList() {
		return teamDao.TeamList();
	}

	/* (non-Javadoc)
	 * @see com.iflyun.webCrawler.service.TeamService#getTeamById(java.lang.String)
	 */
	@Override
	public Team getTeamById(String id) {
		return teamDao.getTeamById(id);
	}

	@Override
	public List<TeamInterfaceNumView> teamInterfaceNum() {
		return teamDao.teamInterfaceNum();
	}

	@Override
	public List<TeamInterfaceNumView> teamDataNum() {
		return teamDao.teamDataNum();
	}

	@Override
	public List<Team> TeamListPage(String userid,int pageIndex, int pageSize) {
		return teamDao.TeamListPage(userid,pageIndex, pageSize);
	}

	@Override
	public long TeamCount() {
		return teamDao.TeamCount();
	}

	@Override
	public List<DimView> noticeObject(String code) {
		return teamDao.noticeObject(code);
	}

	@Override
	public int updateEmailAndMessage(String teamid, String messageTo, String emailTo) {
		return teamDao.updateEmailAndMessage(teamid, messageTo, emailTo);
	}

}
