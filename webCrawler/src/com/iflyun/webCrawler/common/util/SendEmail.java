/**
 * 
 */
package com.iflyun.webCrawler.common.util;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.iflyun.webCrawler.bean.util.MailSenderInfo;
import com.iflyun.webCrawler.bean.util.SimpleMailSender;
import com.iflyun.webCrawler.constant.UrlConstants;

/** 

 * @ClassName: SendEamil 

 * @Description: 邮件发送

 * @author wxy

 * @date 2016年2月24日 下午4:31:03 

 * 
 

 */
public class SendEmail {
	
	public void sendMail(String subject, String content, String[] stoaddress) {
		// 发邮件
		List<String> toAddress = new ArrayList<String>();
		// List<String> ccAddress = new ArrayList<String>();
		// 设置邮件

		MailSenderInfo mailInfo = new MailSenderInfo();
		mailInfo.setMailServerHost(UrlConstants.MailServerHost);
		mailInfo.setMailServerPort(UrlConstants.MailServerPort);
		mailInfo.setValidate(true);
		mailInfo.setUserName(UrlConstants.UserName);
		mailInfo.setPassword(UrlConstants.Password);// 您的邮箱密码
		mailInfo.setFromAddress(UrlConstants.FromAddress);

		if (stoaddress.length > 0 && stoaddress != null) {
			for (int i = 0; i < stoaddress.length; i++) {
				if(this.checkEmail(stoaddress[i])){
					toAddress.add(stoaddress[i]);
				}
				
			}
			if(toAddress.size()>0){
				mailInfo.setToAddress(toAddress);
				// mailInfo.setCcAddress(ccAddress);

				mailInfo.setSubject(subject);
				mailInfo.setContent(content);
				// 这个类主要来发送邮件
				SimpleMailSender sms = new SimpleMailSender();
				sms.sendTextMail(mailInfo);// 发送文体格式
			}
			
		}

	}
	
	 /**
	  * 验证邮箱
	  * @param email
	  * @return
	  */
	 public  boolean checkEmail(String email){
	  boolean flag = false;
	  try{
	    String check = "^([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
	    Pattern regex = Pattern.compile(check);
	    Matcher matcher = regex.matcher(email);
	    flag = matcher.matches();
	   }catch(Exception e){
	    flag = false;
	   }
	  return flag;
	 }


}
