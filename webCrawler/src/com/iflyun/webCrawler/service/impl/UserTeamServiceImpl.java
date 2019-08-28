package com.iflyun.webCrawler.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.UserTeam;
import com.iflyun.webCrawler.bean.view.UserTeamView;
import com.iflyun.webCrawler.dao.UserTeamDao;
import com.iflyun.webCrawler.service.UserTeamService;

@Service("userTeamService")
public class UserTeamServiceImpl extends BaseServiceImpl<UserTeam> implements UserTeamService {

	@Resource(name="userTeamDao")
	private UserTeamDao userTeamDao;

	@Override
	public List<UserTeamView> getUserTeam(String userid,int pageIndex,int pageSize) {
		return userTeamDao.getUserTeam(userid, pageIndex, pageSize);
	}

	@Override
	public long UserTeamCount() {
		return userTeamDao.UserTeamCount();
	}

	@Override
	public int addOrUpdateUserTeam(String userid, String teamid) {
		return userTeamDao.addOrUpdateUserTeam(userid, teamid);
	}

	@Override
	public List<UserTeam> getTeamByUserID(String userid) {		
		return userTeamDao.getTeamByUserID(userid);
	}

	@Override
	public List<UserTeam> getUserTeamByStatus(String status, int pageIndex, int pageSize) {
		return userTeamDao.getUserTeamByStatus(status, pageIndex, pageSize);
	}

	@Override
	public long getTotalByStatus(String status) {
		return userTeamDao.getTotalByStatus(status);
	}

	@Override
	public List<UserTeam> TeamListByPage(String userid, int pageIndex, int pageSize) {
		return userTeamDao.TeamListByPage(userid, pageIndex, pageSize);
	}


	
}
