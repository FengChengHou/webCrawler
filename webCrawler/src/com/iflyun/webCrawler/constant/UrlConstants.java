package com.iflyun.webCrawler.constant;

public class UrlConstants {

	public final static String PROTOCOL_HTTP = "HTTP";

	//public final static String phone = "15755363752";
//	public final static String phone = "13083216027";
	
	public final static String phone = "18356986267,13004066565,18155313181,18356982126,18315380836,13083216027";
	//public final static String phone = "18315380836";
	
	//邮件发送地址
	//public final static String email = "rulai@iflyun.com";
	//public final static String email = "xinyuehu@iflyun.com";
	//public final static String email = "wenquxing@iflyun.com";
//	public final static String email = "baiyixiushi@iflyun.com";
	//public final static String email = "xuanyingdong@iflyun.com";
	
	//基本配置
	public final static String MailServerHost = "220.181.12.12";
	/*public final static String MailServerHost = "smtp.163.com";*/
	public final static String MailServerPort = "25"; 
	public final static String UserName = "jinson_88@163.com";
	public final static String Password = "w654321";
	public final static String FromAddress = "jinson_88@163.com";
	//抄送地址
	//接口监测
//	 public final static String[] JkcopyToEmail = {"xuanyingdong@iflyun.com"};
	 //数据监测
//	 public final static String[] copyToEmail ={"ruigu@iflytek.com","zxwang2@iflytek.com","wuliuqi@iflyun.com","xinyuehu@iflyun.com","saitaisui@iflyun.com"};
//	 public final static String[] copyToEmail ={"xuanyingdong@iflyun.com"};
	 
	 //public final static String wxyphone = "13004066565";
   
	 //短信接口
//	public final static String sendMessageUrl = "http://172.16.10.19:8080/OpenApiWeb/rest/openApi?key=931cf29e-f1fa-11e4-82a2-005056907b03&method=sendGeneralMess&params=";//测试
	 public final static String sendMessageUrl = "http://172.16.7.37:8080/OpenApiWeb/rest/openApi?key=2fab5e81-d81a-45db-b447-0e75ce939380&method=sendGeneralMess&params=";//生产
	 
	//赶时间载入接口
	public final static String loadService = "http://60.169.88.245:8008/loadService?mobile_serial_number=18705586510&load_operation=1&x=118.369079&y=31.386377&user_name=test1";//

}
