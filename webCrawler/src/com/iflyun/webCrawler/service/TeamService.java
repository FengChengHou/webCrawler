package com.iflyun.webCrawler.service;

import java.util.List;

import com.iflyun.webCrawler.bean.entity.Team;
import com.iflyun.webCrawler.bean.view.DimView;
import com.iflyun.webCrawler.bean.view.TeamInterfaceNumView;

public interface TeamService extends BaseService<Team> {
	
	/**
	 * 
	
	* @Title: TeamList 
	
	* @Description: 获取所有团队信息
	
	* @author wxy
	
	* @date 2016年2月24日 下午2:58:42
	
	* @param @return 
	
	* @return List<Team> 
	
	* @throws
	 */
	public List<Team> TeamList();
	
	/**
	 * 
	
	* @Title: getTeamById 
	
	* @Description: 根据id获取团队信息
	
	* @author wxy
	
	* @date 2016年2月24日 下午2:59:01
	
	* @param @param id
	* @param @return 
	
	* @return Team 
	
	* @throws
	 */
	public Team getTeamById(String id);
	
	/**
	 * 
	* @Title: teamInterfaceNum 
	* @Description: 获取团队接口数量
	* @author byxs
	* @date 2016年2月24日 下午4:40:54
	* @param teamid
	* @return 
	* @return List<TeamInterfaceNumView> 
	* @throws
	 */
	public List<TeamInterfaceNumView> teamInterfaceNum();
	
	/**
	 * 
	* @Title: teamDataNum 
	* @Description: 获取团队数据监测数量
	* @author byxs
	* @date 2016年2月24日 下午4:58:40
	* @param teamid
	* @return 
	* @return List<TeamInterfaceNumView> 
	* @throws
	 */
	public List<TeamInterfaceNumView> teamDataNum();
	
	/**
	 * 
	* @Title: TeamListPage 
	* @Description: 分页查询团队列表
	* @author byxs
	* @date 2016年2月26日 上午10:15:21
	* @param pageIndex
	* @param pageSize
	* @param 
	* @return List<Team> 
	* @throws
	 */
	public List<Team> TeamListPage(String userid,int pageIndex,int pageSize);

	/**
	 * 
	* @Title: TeamCount 
	* @Description: 查询团队数量 
	* @author byxs
	* @date 2016年2月26日 上午10:25:13
	* @return long 
	* @throws
	 */
	public long TeamCount();
	
	/**
	 * 
	* @Title: noticeObject 
	* @Description: 根据团队代码加载短信邮件通知对象
	* @author byxs
	* @date 2016年2月26日 下午2:37:37
	* @param code
	* @return List<DimView> 
	* @throws
	 */
	public List<DimView> noticeObject(String code);
	
	/**
	 * 
	* @Title: updateEmailAndMessage 
	* @Description: 更新报错短信邮件通知对象
	* @author byxs
	* @date 2016年2月26日 下午4:15:13
	* @return int 
	* @throws
	 */
	public int updateEmailAndMessage(String teamid,String messageTo,String emailTo);

}
