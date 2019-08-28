package com.iflyun.webCrawler.common;

public class Common {
	public static String orcaleDriver = "oracle.jdbc.driver.OracleDriver";

	public static String mysqlDriver = "com.mysql.jdbc.Driver";

	public static String sqlDriver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

	/**
	 * 测试接口检测数据库
	 */
//	public static String mysqlUrl ="jdbc:mysql://172.16.10.185:3306/crawler?useUnicode=true&characterEncoding=UTF-8";
//	public static String mysqlUsername = "crawler";
//	public static String mysqlPassword = "crawlerDB12345";
	// 登录(测试)
//	public static String UCLogin = "http://172.16.10.39:8080/uucenter-ws-web/webservice/eho/login";

	public static String mysqlUrl = "jdbc:mysql://172.16.7.135:3306/crawlers?useUnicode=true&characterEncoding=UTF-8";
	public static String mysqlUsername = "crawlers";
	public static String mysqlPassword = "crawlersDB12345";

	// （生产）
//	public static String UCLogin = "http://172.16.7.55:85/uucInterface/webservice/eho/login";
	public static String UCLogin = "http://jkcsl.uc.iflyun.com:80/uucInterface/webservice/eho/login";

	public static String loginSrc = "080100";

	// 检测报警内容模板
	public static String messageContent = "(129)%s，%s接口错误，原因：%s。【监测平台】";
	public static String emailContent = "(129)在%s，%s表中数据没有正常更新。表中文名为：%s。在中心库中最新更新时间为：%s。【监测平台】";

}
