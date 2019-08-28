package com.iflyun.webCrawler.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.iflyun.webCrawler.bean.entity.Function;
import com.iflyun.webCrawler.bean.entity.User;
import com.iflyun.webCrawler.bean.entity.UserFunction;
import com.iflyun.webCrawler.service.FunctionService;
import com.iflyun.webCrawler.service.UserFunctionService;
import com.iflyun.webCrawler.service.UserService;

@Controller
public class HomeController extends BaseController {
	
	@Resource(name="userService")
	private UserService userService;
	
	@Resource(name="userFunctionService")
	private UserFunctionService userFunctionService;
	
	@Resource(name="functionService")
	private FunctionService functionService;
	
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(HomeController.class);

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	/**
	 * 
	* @Title: home 	
	* @Description: 跳转首页	
	* @author wenquxing	
	* @date 2016年2月24日 下午3:00:59	
	* @param @param request
	* @param @return 	
	* @return String 	
	* @throws
	 */
	public String home(HttpServletRequest request) {
		HttpSession session = request.getSession();
		
		if(session.getAttribute("user")!=null)
		{
			User user =(User) session.getAttribute("user");
			List<UserFunction> list= userFunctionService.getUserFunctionByUser(user.getId());
			List<Function> list1=new ArrayList<Function>();
			if(list.size()==0)
			{
				list1=functionService.getFunctionByName("接口监测");
				list1.addAll(functionService.getFunctionByName("团队申请加入"));
				for (Function function : list1) {
					UserFunction userFunction =new UserFunction(user, function, "1");
					userFunctionService.add(userFunction);
				}
			}
			
			List<UserFunction> functionList=userFunctionService.getUserFunctionByUser(user.getId());
			List<String> menuList=new ArrayList<String>();
			for (UserFunction userFunction : functionList) {
				menuList.add(userFunction.getFunction().getFunction_name());
			}
			
			
			request.setAttribute("functionList", menuList);
			return "user/home";
		}else{
			return "login";
		}
		
		
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String index() {	
		return "login";
	}
	
	@RequestMapping(value = "/checklogin")
	@ResponseBody
	public String adminLogin(String username, String password,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		HashMap<String, Object> map = new HashMap<String, Object>();
		map = userService.checkLogin(username, password);
		if (StringUtils.isBlank(username) && StringUtils.isBlank(password)) {
			return "0";
		} else if (map.get("errCode").equals("1001")) {
			String userId = map.get("userId")==null?"":map.get("userId").toString();
			String userName = map.get("accountCode")==null?"":map.get("accountCode").toString();
			String phone = map.get("mobilephone")==null?"":map.get("mobilephone").toString();
			String name = map.get("name")==null?"":map.get("name").toString();
			User user = userService.saveUser(userId, userName, phone, name);
			session.setMaxInactiveInterval(30 * 60);
			session.setAttribute("user", user);
			session.setAttribute("username", username);
			return "1";
		}
		return "2";
	}
	
	@RequestMapping(value = "/exist")
	public String exist(HttpServletRequest request) {	
		HttpSession session = request.getSession();
		session.removeAttribute("user");
		session.removeAttribute("user");
		return "login";
	}

	
	

}
