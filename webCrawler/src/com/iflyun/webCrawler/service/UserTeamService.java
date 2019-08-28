package com.iflyun.webCrawler.service;


import java.util.List;


import com.iflyun.webCrawler.bean.entity.UserTeam;
import com.iflyun.webCrawler.bean.view.UserTeamView;

public interface UserTeamService extends BaseService<UserTeam>{

	public List<UserTeamView> getUserTeam(String userid,int pageIndex,int pageSize);
	
	public long UserTeamCount();
	
	public int addOrUpdateUserTeam(String userid,String teamid);
	
	public List<UserTeam> getTeamByUserID(String userid);
	
	public List<UserTeam> getUserTeamByStatus(String status,int pageIndex,int pageSize);

	public long getTotalByStatus(String status);
	
	/**
	 * 
	* @Title: TeamListByPage 
	* @Description: 根据userid分页获取用户已经申请通过的团队 
	* @author byxs
	* @date 2016年3月2日 下午5:00:31
	* @param userid
	* @param pageIndex
	* @param pageSize
	* @return List<UserTeam> 
	* @throws
	 */
	public List<UserTeam> TeamListByPage(String userid,int pageIndex,int pageSize);

}
