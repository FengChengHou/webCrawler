/**
 * 
 */
package com.iflyun.webCrawler.web.controller;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.iflyun.webCrawler.bean.domain.EasyuiDatagridJson;
import com.iflyun.webCrawler.bean.entity.User;
import com.iflyun.webCrawler.bean.entity.UserFunction;
import com.iflyun.webCrawler.bean.view.UserFunctionView;
import com.iflyun.webCrawler.bean.view.UserView;
import com.iflyun.webCrawler.service.UserFunctionService;
import com.iflyun.webCrawler.service.UserService;
import com.iflyun.webCrawler.service.UserTeamService;

/**
 * 
 * @ClassName: UserContorller
 * 
 * @Description: TODO(这里用一句话描述这个类的作用)
 * 
 * @author wxy
 * 
 * @date 2016年2月29日 下午3:16:13
 * 
 * 
 */

@RequestMapping(value = "/user")
@Controller
public class UserContorller extends BaseController {

	@Resource(name = "userService")
	public UserService userService;

	@Resource(name = "userTeamService")
	public UserTeamService userTeamService;

	@Resource(name = "userFunctionService")
	public UserFunctionService userFunctionService;

	/**
	 * 
	 * @Title: userManager
	 * 
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * 
	 * @author wxy
	 * 
	 * @date 2016年3月1日 下午2:07:49
	 * 
	 * @param @param request
	 * @param @param userid
	 * @param @return
	 * 
	 * @return ModelAndView
	 * 
	 * @throws
	 */
	@RequestMapping(value = "/userManager")
	public ModelAndView userManager(HttpServletRequest request) {

		ModelAndView mv = new ModelAndView();

		mv.setViewName("pages/userManager");
		return mv;
	}

	@RequestMapping(value = "/getUserById")
	@ResponseBody
	public UserView getUserById(String userid) {

		User user = new User();

		user = userService.getUserById(userid);
		UserView uv = new UserView(user);

		return uv;
	}

	/**
	 * 
	 * @Title: getTeamAndFunction
	 * 
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * 
	 * @author wxy
	 * 
	 * @date 2016年3月1日 下午2:07:32
	 * 
	 * @param @param userid
	 * @param @return
	 * 
	 * @return String
	 * 
	 * @throws
	 */
	@RequestMapping(value = "/teamAndFunction")
	@ResponseBody
	public List<UserFunctionView> getTeamAndFunction(String userid) {

		List<UserFunction> ufs = userFunctionService
				.getUserFunctionByUser(userid);
		List<UserFunctionView> ufvs = new LinkedList<UserFunctionView>();
		
		for(UserFunction uf:ufs){
			UserFunctionView ufv = new UserFunctionView(uf);
			ufvs.add(ufv);
		}
		
		return ufvs;
	}

	/**
	 * 
	 * @Title: getUsers
	 * 
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * 
	 * @author wxy
	 * 
	 * @date 2016年3月1日 下午3:39:01
	 * 
	 * @param @param currentPageNo
	 * @param @param pageSize
	 * @param @return
	 * 
	 * @return EasyuiDatagridJson<UserView>
	 * 
	 * @throws
	 */
	@RequestMapping(value = "getUsers")
	@ResponseBody
	public EasyuiDatagridJson<UserView> getUsers(int currentPageNo, int pageSize) {

		List<User> users = userService.getUsers(currentPageNo, pageSize);

		List<UserView> uvs = new LinkedList<UserView>();
		int i = 0;
		for (User u : users) {

			UserView uv = new UserView(u);
			if (u.getStatus().equals("1")) {
				uv.setStatus("有效");
			} else {
				uv.setStatus("无效");
			}
			uv.setI(++i);
			uvs.add(uv);

		}

		EasyuiDatagridJson<UserView> datagrid = new EasyuiDatagridJson<UserView>();
		datagrid.setRows(uvs);
		long c = userService.getUserNum();
		datagrid.setTotal(c);

		return datagrid;

	}
	
	@RequestMapping(value = "updateUser")
	@ResponseBody
	public int updateUser(String userid,String remarks,String fids,String status){
		
		int i = userService.updateUser(userid, remarks, status);
		
		
		if(i>0){
			String[] fid = fids.split(",");
			userFunctionService.updateUserFunction(userid, fid);
		}
		
		return i;
	}

}
