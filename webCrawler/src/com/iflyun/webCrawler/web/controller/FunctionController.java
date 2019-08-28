package com.iflyun.webCrawler.web.controller;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.iflyun.webCrawler.bean.domain.EasyuiDatagridJson;
import com.iflyun.webCrawler.bean.entity.DataMonitor;
import com.iflyun.webCrawler.bean.entity.DataSourse;
import com.iflyun.webCrawler.bean.entity.Team;
import com.iflyun.webCrawler.bean.entity.User;
import com.iflyun.webCrawler.bean.entity.UserTeam;
import com.iflyun.webCrawler.bean.view.DataMonitorView;
import com.iflyun.webCrawler.bean.view.DataSourseView;
import com.iflyun.webCrawler.bean.view.DimView;
import com.iflyun.webCrawler.bean.view.TeamInterfaceNumView;
import com.iflyun.webCrawler.bean.view.UserTeamView;
import com.iflyun.webCrawler.bean.view.WarningNoticeView;
import com.iflyun.webCrawler.service.DataService;
import com.iflyun.webCrawler.service.DataSourseService;
import com.iflyun.webCrawler.service.TeamService;
import com.iflyun.webCrawler.service.UserTeamService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@RequestMapping(value = "/function")
@Controller
public class FunctionController {

	@Resource(name = "userTeamService")
	private UserTeamService userTeamService;

	@Resource(name = "teamService")
	private TeamService teamService;

	@Resource(name = "dataSourseService")
	private DataSourseService dataSourseService;

	@Resource(name = "dataService")
	private DataService dataService;

	/**
	 * 
	 * @Title: apply @Description: 跳转团队申请页面 @author byxs @date 2016年2月24日
	 * 上午11:26:09 @param @return @return String @throws
	 */
	@RequestMapping(value = "/apply")
	public String apply() {
		return "pages/apply";
	}

	/**
	 * 
	 * @Title: interfaceChect @Description: 跳转接口检测页面 @author byxs @date
	 * 2016年2月24日 上午11:25:57 @param @return @return String @throws
	* @Title: interfaceCheck 
	* @Description: 跳转接口检测页面
	* @author byxs
	* @date 2016年2月24日 上午11:25:57
	* @param @return 
	* @return String 
	* @throws
	 */
	@RequestMapping(value = "/interfaceCheck")
	public String interfaceChect() {
		return "pages/interfaceCheck";
	}

	/**
	 * 
	 * @Title: warningNotice @Description: 跳转告警通知设置页面 @author byxs @date
	 * 2016年2月24日 下午3:34:37 @param @return @return String @throws
	 */
	@RequestMapping(value = "/warningNotice")
	public String warningNotice() {
		return "pages/warningNotice";
	}

	@RequestMapping(value = "/application")
	public String application(){
		return "pages/application";
	}
	
	/**
	 * 
	 * @Title: dataCheck @Description: 跳转数据检测页面 @author byxs @date 2016年2月29日
	 * 上午10:03:55 @return String @throws
	 */
	@RequestMapping(value = "/dataCheck")
	public String dataCheck() {
		return "pages/dataCheck";
	}

	/**
	 * 
	 * @Title: UserTeamList @Description：用户申请团队列表展示 @author byxs @date
	 * 2016年2月24日 下午3:32:10 @param session @param currentPageNo @param
	 * pageSize @param @return @return EasyuiDatagridJson<UserTeamView> @throws
	 */
	@RequestMapping(value = "/userTeamList")
	@ResponseBody
	public EasyuiDatagridJson<UserTeamView> UserTeamList(HttpSession session, int currentPageNo, int pageSize) {
		User user = (User) session.getAttribute("user");
		List<UserTeamView> utView = userTeamService.getUserTeam(user.getId(), currentPageNo, pageSize);

		EasyuiDatagridJson<UserTeamView> datagrid = new EasyuiDatagridJson<UserTeamView>();
		long c = userTeamService.UserTeamCount();
		datagrid.setRows(utView);
		datagrid.setTotal(c);
		return datagrid;

	}

	/**
	 * 
	 * @Title: applyTeam @Description: 用户申请加入团队 @author byxs @date 2016年2月24日
	 * 上午9:42:01 @return @return String @throws
	 */
	@RequestMapping(value = "/applyTeam")
	@ResponseBody
	public String applyTeam(HttpSession session, String teamid) {
		User user = (User) session.getAttribute("user");
		int i = userTeamService.addOrUpdateUserTeam(user.getId(), teamid);
		HashMap<String, Object> map = new HashMap<String, Object>();
		if (i == 1) {
			map.put("status", 1);
			map.put("message", "申请成功");
		} else {
			map.put("status", 0);
			map.put("message", "系统异常，申请失败");
		}
		JSONObject json = JSONObject.fromObject(map);
		return json.toString();

	}

	/**
	 * 
	 * @Title: userTeam @Description: 加载用户申请的团队下拉框 @author byxs @date 2016年2月24日
	 * 下午3:35:35 @param session @return @return String @throws
	 */
	@RequestMapping(value = "/userTeam")
	@ResponseBody
	public String userTeam(HttpSession session) {
		User user = (User) session.getAttribute("user");
		List<UserTeam> list = userTeamService.getTeamByUserID(user.getId());
		List<DimView> dimViews = new ArrayList<DimView>();
		for (UserTeam userTeam : list) {
			dimViews.add(new DimView(userTeam.getTeam().getTeam_name(), userTeam.getTeam().getId()));

		}
		JSONArray json = JSONArray.fromObject(dimViews);
		return json.toString();

	}

	/**
	 * 
	 * @Title: warningNoticeList @Description: 加载告警通知设置列表 @author byxs @date
	 * 2016年2月26日 上午10:53:27 @param currentPageNo @param pageSize @return
	 * EasyuiDatagridJson<WarningNoticeView> @throws
	 */
	@RequestMapping(value = "/warningNoticeList")
	@ResponseBody
	public EasyuiDatagridJson<WarningNoticeView> warningNoticeList(int currentPageNo, int pageSize,
			HttpSession session) {
		User user = (User) session.getAttribute("user");
		List<UserTeam> utlist = userTeamService.TeamListByPage(user.getId(), currentPageNo, pageSize);
		List<Team> teamList = new ArrayList<Team>();
		if(utlist!=null){
			for (int i = 0; i < utlist.size(); i++) {
				Team t = utlist.get(i).getTeam();
				teamList.add(t);
			}
		}
		
		List<TeamInterfaceNumView> tnum = teamService.teamInterfaceNum();
		List<TeamInterfaceNumView> dnum = teamService.teamDataNum();
		List<WarningNoticeView> wnView = new ArrayList<WarningNoticeView>();
		int id = 1;
		if (teamList != null) {
			for (int i = 0; i < teamList.size(); i++) {
				WarningNoticeView wn = new WarningNoticeView();
				wn.setId(id++);
				wn.setTeamid(teamList.get(i).getId());
				wn.setTeamName(teamList.get(i).getTeam_name());
				wn.setTeamCode(teamList.get(i).getTeam_code());
				for (int j = 0; j < tnum.size(); j++) {
					if (teamList.get(i).getId().equals(tnum.get(j).getTeamid())) {
						wn.setTnum(tnum.get(j).getCount());
					}
				}

				for (int k = 0; k < dnum.size(); k++) {
					if (teamList.get(i).getId().equals(dnum.get(k).getTeamid())) {
						wn.setDnum(dnum.get(k).getCount());
					}
				}

				wnView.add(wn);
			}
		}

		EasyuiDatagridJson<WarningNoticeView> datagrid = new EasyuiDatagridJson<WarningNoticeView>();
		datagrid.setRows(wnView);
		long count=0;
		if(teamList!=null){
			count = teamList.size();
		}
		datagrid.setTotal(count);
		return datagrid;
	}

	/**
	 * 
	 * @Title: NoticeObject @Description: 加载短信，邮件通知对象 @author byxs @date
	 * 2016年2月26日 下午2:33:26 @return String @throws
	 */
	@RequestMapping(value = "/noticeObject")
	@ResponseBody
	public String noticeObject(String code) {
		List<DimView> list = teamService.noticeObject(code);
		DimView d = new DimView();
		if (list != null) {
			d = list.get(0);
		}
		JSONObject json = JSONObject.fromObject(d);
		return json.toString();
	}
	
	/**
	 * 	
	* @Title: userTeam 	
	* @Description: 根据userid 和状态 搜索团队申请	
	* @author wenquxing	
	* @date 2016年2月29日 上午11:43:38	
	* @param @param session
	* @param @param status
	* @param @param pageIndex
	* @param @param pageSize
	* @param @return 	
	* @return String 	
	* @throws
	 */
	@RequestMapping(value = "/userTeamListByID")
	@ResponseBody
	public EasyuiDatagridJson<UserTeamView> userTeam(String status,int currentPageNo,int pageSize){
		List<UserTeam> list= userTeamService.getUserTeamByStatus(status, currentPageNo, pageSize);
		int i=1;
		List<UserTeamView> userTeamList = new ArrayList<UserTeamView>();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		for (UserTeam userTeam : list) {
			UserTeamView teamView=new UserTeamView();
			teamView.setId(i);
			i++;
			if(userTeam.getStatus().equals("0"))
			{
				teamView.setPermissions("待审核");
			}else if(userTeam.getStatus().equals("1"))
			{
				teamView.setPermissions("通过");
			}
			else if(userTeam.getStatus().equals("2"))
			{
				teamView.setPermissions("拒绝");
			}
			teamView.setUuid(userTeam.getId());
			teamView.setProductname(userTeam.getTeam().getTeam_name());
			teamView.setPhone(userTeam.getUser().getPhone());
			teamView.setName(userTeam.getUser().getName());
			teamView.setUsername(userTeam.getUser().getUsername());
			Timestamp t =userTeam.getCreateTime();	
			teamView.setTime(format.format(t));
			userTeamList.add(teamView);
		}
		EasyuiDatagridJson<UserTeamView> datagrid = new EasyuiDatagridJson<UserTeamView>();
		long c = userTeamService.getTotalByStatus(status);
		datagrid.setRows(userTeamList);
		datagrid.setTotal(c);
		return datagrid;
		
	}
	
	@RequestMapping(value = "/updateStatus")
	@ResponseBody
	public int updateStatus(String ids,String status){
		//List<String> userTeamIds = new LinkedList<String>();
		String[] idArray;

		try {
			if (ids == null || ids.trim().equals("")) {
				return 0;
			}

			idArray = ids.split(",");

		} catch (Exception e) {
			return 0;
		}
		int i = 0;
		if (idArray.length > 0) {
			for (String s : idArray) {
				UserTeam userTeam = userTeamService.get(s);
				userTeam.setStatus(status);
				userTeam.setCreateTime(new Timestamp(System.currentTimeMillis()));
				userTeamService.edit(userTeam);
				
			}
			i=1;
			
		} else {
			return 0;
		}
		return i;
		
	}
	@RequestMapping(value = "/saveMessage")
	@ResponseBody
	public String saveMessage(String teamid, String messageTo, String emailTo) {
		int i = teamService.updateEmailAndMessage(teamid, messageTo, emailTo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		if (i == 1) {
			map.put("status", "1");
			map.put("message", "修改成功");
		} else {
			map.put("status", "0");
			map.put("message", "修改失败");
		}
		JSONObject json = JSONObject.fromObject(map);
		return json.toString();

	}

	/**
	 * 
	 * @Title: getDataBase @Description: 加载数据库列表 @author byxs @date 2016年3月1日
	 * 上午11:03:55 @return String @throws
	 */
	@RequestMapping(value = "/getDataBase")
	@ResponseBody
	public String getDataBase(String teamid) {
		List<DataSourse> list = dataSourseService.dataSourseList(teamid);
		List<DimView> dataBaseList = new ArrayList<DimView>();

		if (list != null) {
			for (int i = 0; i < list.size(); i++) {
				DimView d = new DimView();
				d.setMc(list.get(i).getDbName());
				d.setDm(list.get(i).getId());
				dataBaseList.add(d);
			}
		}

		JSONArray json = JSONArray.fromObject(dataBaseList);
		return json.toString();
	}

	/**
	 * 
	 * @Title: saveDataBase @Description: 保存新增数据库 @author byxs @date 2016年3月1日
	 * 下午3:26:37 @return String @throws
	 */
	@RequestMapping(value = "/saveDataBase")
	@ResponseBody
	public String saveDataBase(String DataSourseView) {
		JSONObject obj = JSONObject.fromObject(DataSourseView);
		DataSourseView dataSourseView = (DataSourseView) JSONObject.toBean(obj, DataSourseView.class);
		DataSourse ds = new DataSourse(dataSourseView);
		ds.setCreateTime(new Timestamp(System.currentTimeMillis()));
		ds.setUpdateTime(new Timestamp(System.currentTimeMillis()));
		int i = dataSourseService.saveDataSourse(ds);
		HashMap<String, Object> map = new HashMap<String, Object>();
		if (i == 1) {
			map.put("message", "新增数据库成功");
			map.put("status", "1");
		} else {
			map.put("message", "新增数据库失败");
			map.put("status", "0");
		}
		JSONObject json = JSONObject.fromObject(map);
		return json.toString();

	}

	/**
	 * 
	 * @Title: editDataBase @Description: 编辑数据库信息 @author byxs @date 2016年3月1日
	 * 下午4:13:14 @return String @throws
	 */
	@RequestMapping(value = "/editDataBase")
	@ResponseBody
	public String editDataBase(String dataBaseId) {
		DataSourse ds = dataSourseService.getDataSourse(dataBaseId);
		DataSourseView dsv = new DataSourseView(ds);
		JSONObject json = JSONObject.fromObject(dsv);
		return json.toString();

	}

	/**
	 * 
	 * @Title: updateDataBase @Description: 更新数据库信息 @author byxs @date 2016年3月1日
	 * 下午4:53:53 @return String @throws
	 */
	@RequestMapping(value = "/updateDataBase")
	@ResponseBody
	public String updateDataBase(String DataSourseView) {
		JSONObject obj = JSONObject.fromObject(DataSourseView);
		DataSourseView dataSourseView = (DataSourseView) JSONObject.toBean(obj, DataSourseView.class);
		DataSourse ds = new DataSourse(dataSourseView);
		ds.setCreateTime(new Timestamp(System.currentTimeMillis()));
		ds.setUpdateTime(new Timestamp(System.currentTimeMillis()));
		int i = dataSourseService.updateDataSourse(ds);
		HashMap<String, Object> map = new HashMap<String, Object>();
		if (i == 1) {
			map.put("message", "更新成功");
			map.put("status", "1");
		} else {
			map.put("message", "更新失败");
			map.put("status", "0");
		}
		JSONObject json = JSONObject.fromObject(map);
		return json.toString();
	}

	/**
	 * 
	 * @Title: deleteDataBase @Description: 根据 @author byxs @date 2016年3月1日
	 * 下午5:26:41 @return String @throws
	 */
	@RequestMapping(value = "/deleteDataBase")
	@ResponseBody
	public String deleteDataBase(String dataBaseId) {
		int i = dataSourseService.delDataSourse(dataBaseId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		if (i == 1) {
			map.put("message", "删除成功");
			map.put("status", "1");
		} else {
			map.put("message", "删除失败");
			map.put("status", "0");
		}
		JSONObject json = JSONObject.fromObject(map);
		return json.toString();
	}

	/**
	 * 
	 * @Title: saveDataCheck @Description: 保存新增数据监测 @author byxs @date 2016年3月1日
	 * 下午7:10:07 @return String @throws
	 */
	@RequestMapping(value = "/saveDataCheck")
	@ResponseBody
	public String saveDataCheck(String dataMonitorView) {
		JSONObject obj = JSONObject.fromObject(dataMonitorView);
		DataMonitorView dmv = (DataMonitorView) JSONObject.toBean(obj, DataMonitorView.class);
		DataMonitor dm = new DataMonitor(dmv);
		dm.setUpdatetime(new Timestamp(System.currentTimeMillis()));
		dm.setStatus(1);
		dm.setErrornum(0);

		int i = dataService.saveDataMonitor(dm);
		HashMap<String, Object> map = new HashMap<String, Object>();
		if (i == 1) {
			map.put("message", "新增数据监测成功");
			map.put("status", "1");
		} else {
			map.put("message", "新增数据检测失败");
			map.put("status", "0");
		}
		JSONObject json = JSONObject.fromObject(map);
		return json.toString();

	}

	/**
	 * 
	* @Title: updateMessagestatus 
	* @Description: 开启/关闭短信
	* @author byxs
	* @date 2016年3月1日 下午9:36:09
	* @param ids
	* @param messagestatus
	* @return int 
	* @throws
	 */
	@RequestMapping(value = "/updateMessagestatus")
	@ResponseBody
	public int updateMessagestatus(String ids, String messagestatus) {

		List<String> urlIds = new LinkedList<String>();

		String[] idArray;

		try {
			if (ids == null || ids.trim().equals("")) {
				return 0;
			}

			idArray = ids.split(",");

		} catch (Exception e) {
			return 0;
		}

		if (idArray.length > 0) {
			for (String s : idArray) {
				urlIds.add(s);
			}
			try {
				dataService.updateMessagestatus(urlIds, messagestatus);
			} catch (Exception e) {
				return -1;
			}

		} else {
			return 0;
		}
		return 1;

	}
	
	/**
	 * 
	* @Title: getDataMonitor 
	* @Description: 根据数据监测id获取记录
	* @author byxs
	* @date 2016年3月1日 下午10:04:06
	* @param id
	* @return DataMonitorView 
	* @throws
	 */
	@RequestMapping(value = "/getDataMonitor")
	@ResponseBody
	public DataMonitorView getDataMonitor(String id){
		DataMonitor dataMonitor = dataService.getDataMonitorById(id);
		DataMonitorView dmv = new DataMonitorView(dataMonitor);
		return dmv;
	}

		
	
	

}
