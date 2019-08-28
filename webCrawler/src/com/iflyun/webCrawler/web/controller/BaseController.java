package com.iflyun.webCrawler.web.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Locale;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;

import com.iflyun.webCrawler.common.util.WebUtils;
import com.iflyun.webCrawler.web.propertyeditor.CustomTimestampEditor;

/**
 * 基础控制器，其他控制器需extends此控制器获得initBinder自动转换的功能
 * @author 柏耀明
 * 
 */

@Controller
public class BaseController {

	private static final Logger logger = Logger.getLogger(BaseController.class);
	
	@Autowired
	@Qualifier("messageSource")
	public MessageSource messageSource;

	/**
	 *  spring 属性注册器
	 * 1.CustomDateEditor 将前台传递过来的日期格式的字符串，自动转化为Date类型<br />
	 * 
	 */
	@InitBinder
	public void initBinder(ServletRequestDataBinder binder) {
		logger.debug("initBinder->param[" + binder + "]");
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		dateFormat.setLenient(false);

		SimpleDateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		datetimeFormat.setLenient(false);

		binder.registerCustomEditor(java.util.Date.class, new CustomDateEditor(dateFormat, true));
		binder.registerCustomEditor(java.sql.Timestamp.class, new CustomTimestampEditor(datetimeFormat, true));
	}
	
	/*@ExceptionHandler(RuntimeException.class)  //@ExceptionHandler(value={IOException.class,SQLException.class})  
    public @ResponseBody OperationResult runtimeExceptionHandler(RuntimeException runtimeException) {  
        logger.error(runtimeException.getStackTrace());  
        runtimeException.printStackTrace();
        OperationResult result = new OperationResult();
        result.setSuccess(false);
		result.setResultMsg("操作失败");
        return result;  
    }*/
	
	/**
	 * 获得 request
	 * @return request
	 */
	public HttpServletRequest getRequest(){
		return  ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
	}
	
	/**
	 * 放置值到 request
	 */
	public void setRequestAttribute(String attr, Object value){
		getRequest().setAttribute(attr, value);
	}
	
	/**
	 * 获取request中的属性
	 */
	public Object getRequestAttribute(String attr){
		return getRequest().getAttribute(attr);
	}
	
	/**
	 * 获取request中的请求参数
	 */
	public String getRequestParmameter(String attr){
		return getRequest().getParameter(attr);
	}
	
	/**
	 * 获得 session中的变量,推荐使用 注解 @SessionAttributes({“attr1”,”attr2”}) 
	 * @return 变量
	 */
	public Object getSessionAttribute(String attrName){
		Session session = SecurityUtils.getSubject().getSession();
		return session.getAttribute(attrName);
		//return WebUtils.getSessionAttribute(getRequest(), attrName);
	}
	
	/**
	 * 获得 session中的变量,推荐使用 注解 
	 * @return 变量
	 */
	public void setSessionAttribute(String attrName, Object value){
		Session session = SecurityUtils.getSubject().getSession();
		session.setAttribute(attrName,value);
		//WebUtils.setSessionAttribute(getRequest(), attrName, value);
	}
	
	/**
	 * 获得 ServletContext 
	 * @return ServletContext变量
	 */
	public ServletContext getServletContext(){
		return getSession().getServletContext();
	}
	
	/**
	 * 设置 application 中的变量
	 * @param attrName
	 * @param value
	 */
	public void setServletContextAttribute(String attrName, Object value){
		getServletContext().setAttribute(attrName, value);
	} 
	
	/**
	 * 获得application 中的变量
	 * @param attrName
	 * @param value
	 */
	public Object getServletContextAttribute(String attrName){
		return getServletContext().getAttribute(attrName);
	}
	
	/**
	 * 获得 session id
	 * @return session id
	 */
	public String getSessionId(){
		return WebUtils.getSessionId(getRequest());
	}
	
	/**
	 * 获得 session
	 * @return session
	 */
	public HttpSession getSession(){
		return getRequest().getSession();
	}
	
	/**
	 * 获得response
	 * @return
	 */
	public HttpServletResponse getResponse() {
		return ((ServletWebRequest) RequestContextHolder.getRequestAttributes()).getResponse();
	}

	/**
	 * 获得 客户端IP
	 * @return 客户端IP
	 */
	public String getClientIP(){
		return WebUtils.getClientIP(getRequest());
	}
	
	/**
	 * 获得 cookie
	 * @param cookieName cookie名称
	 * @return cookie
	 */
	public Cookie getCookie(String cookieName){
		return WebUtils.getCookie(getRequest(), cookieName);
	}
	
	/**
	 *  获取cookie内容
	 * @param cookieName cookie名称
	 * @return cookie
	 * @throws IOException 
	 */
	public String getCookieValue(String cookieName) throws IOException{
		return WebUtils.getCookieValue(getRequest(),cookieName);
	}
	
	/**
	 * 获得资源文件中的中文消息
	 * @param key 消息key
	 * @return    如果找到消息key对应的消息,返回该消息,否则返回空
	 */
	public String getMessage(String key){
		return messageSource.getMessage(key, null, Locale.CHINA);
	}
	
	/**
	 * 获得资源文件中的中文消息
	 * @param key    消息key
	 * @param params 占位符参数数组
	 * @return 如果找到消息key对应的消息,返回该消息,否则返回空
	 */
	public String getMessage(String key, Object[] params){
		return messageSource.getMessage(key, params, Locale.CHINA);
	}
	
	/**
	 * 获得资源文件中的中文消息
	 * @param key        消息key
	 * @param replaceMsg 替代消息
	 * @return 如果找到消息key对应的消息,返回该消息,否则返回替代消息
	 */
	public String getMessage(String key, String replaceMsg){
		return messageSource.getMessage(key, null ,replaceMsg, Locale.CHINA);
	}
	
	/**
	 * 获得资源文件中的中文消息
	 * @param key		  消息key
	 * @param params	  占位符参数数组
	 * @param replaceMsg 替代消息
	 * @return 如果找到消息key对应的消息,返回该消息,否则返回替代消息
	 */
	public String getMessage(String key, Object[] params, String replaceMsg){
		return messageSource.getMessage(key, params ,replaceMsg, Locale.CHINA);
	}
	
}
