package com.iflyun.webCrawler.dao;

import java.util.List;

import com.iflyun.webCrawler.bean.entity.UserTeam;
import com.iflyun.webCrawler.bean.view.UserTeamView;

public interface UserTeamDao extends BaseDao<UserTeam> {
	
	/**
	 * 
	* @Title: getUserTeam 
	* @Description: 根据userid分页获取team 
	* @author byxs
	* @date 2016年2月23日 下午2:05:14
	* @param @param userid
	* @param @return 
	* @return List<UserTeam> 
	* @throws
	 */
	public List<UserTeamView> getUserTeam(String userid,int pageIndex,int pageSize);
	
	/**
	 * 
	* @Title: UserTeamCount 
	* @Description: 根据userid获取team数量
	* @author byxs
	* @date 2016年2月23日 下午2:43:22
	* @return 
	* @return long 
	* @throws
	 */
	public long UserTeamCount();
	
	/**
	 * 
	* @Title: addOrUpdateUserTeam 
	* @Description: 用户申请加入团队
	* @author byxs
	* @date 2016年2月24日 上午9:46:20
	* @param userid
	* @param teamid
	* @param @return 
	* @return int 
	* @throws
	 */
	public int addOrUpdateUserTeam(String userid,String teamid);

	/**
	 * 
	
	* @Title: getTeamByUserID 
	* @Description: 根据userid获取通过团队
	* @author wenquxing	
	* @date 2016年2月24日 上午10:59:10	
	* @param @param userid
	* @param @return 	
	* @return List<UserTeam> 
	* @throws
	 */
	public List<UserTeam> getTeamByUserID(String userid);
	
	/**
	 * 	
	* @Title: getUserTeamByStatus 	
	* @Description: 根据状态值获取申请列表	
	* @author wenquxing	
	* @date 2016年2月29日 下午4:40:28	
	* @param @param status
	* @param @param pageIndex
	* @param @param pageSize
	* @param @return 	
	* @return List<UserTeam> 
	* @throws
	 */
	public List<UserTeam> getUserTeamByStatus(String status,int pageIndex,int pageSize);
	
	/**
	 * 	
	* @Title: getTotalByStatus 	
	* @Description: 根据状态获取总数	
	* @author wenquxing	
	* @date 2016年2月29日 下午4:37:39
	* @param @param status
	* @param @return 	
	* @return long 	
	* @throws
	 */
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
