package com.iflyun.webCrawler.common;

public class Common {
	public static String orcaleDriver = "oracle.jdbc.driver.OracleDriver";

	public static String mysqlDriver = "com.mysql.jdbc.Driver";

	public static String sqlDriver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

	/**
	 * 测试接口检测数据库
	 */
//	public static String mysqlUrl ="jdbc:mysql://xxx.xx.xx.xx:xx/xxx?useUnicode=true&characterEncoding=UTF-8";
//	public static String mysqlUsername = "xx";
//	public static String mysqlPassword = "xx";	
	// （生产）
	public static String mysqlUrl ="jdbc:mysql://xxx.xx.xx.xx:xx/xxx?useUnicode=true&characterEncoding=UTF-8";
	public static String mysqlUsername = "xx";
	public static String mysqlPassword = "xx";

	
	// 登录(测试)
//	public static String UCLogin = "http://xx.xx.xx.xx:xx/xx/xx/eho/login";
	// （生产）
	public static String UCLogin = "http://xxx.xx.xx.xx:80/xx/xx/eho/login";

	public static String loginSrc = "080100";

	// 检测报警内容模板
	public static String messageContent = "(129)%s，%s接口错误，原因：%s。【监测平台】";
	public static String emailContent = "(129)在%s，%s表中数据没有正常更新。表中文名为：%s。在中心库中最新更新时间为：%s。【监测平台】";

}
