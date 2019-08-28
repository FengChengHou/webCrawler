package com.iflyun.webCrawler.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.apache.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.DataMonitor;
import com.iflyun.webCrawler.bean.entity.DataStatus;
import com.iflyun.webCrawler.bean.entity.Param;
import com.iflyun.webCrawler.bean.entity.Team;
import com.iflyun.webCrawler.bean.entity.Url;
import com.iflyun.webCrawler.bean.entity.UrlStatus;
import com.iflyun.webCrawler.bean.view.ResultView;
import com.iflyun.webCrawler.common.Common;
import com.iflyun.webCrawler.common.util.SendEmail;
import com.iflyun.webCrawler.common.util.SendMessageUtil;
import com.iflyun.webCrawler.common.util.UrlUtil;
import com.iflyun.webCrawler.service.DataService;
import com.iflyun.webCrawler.service.DataStatusService;
import com.iflyun.webCrawler.service.TeamService;
import com.iflyun.webCrawler.service.UrlService;
import com.iflyun.webCrawler.service.UrlStatusService;

@Service
public class CronJobService {

	private static final Logger logger = Logger.getLogger(CronJobService.class);

	@Resource(name = "urlService")
	public UrlService urlService;

	@Resource(name = "urlCrawlerService")
	public UrlCrawler crawler;

	@Resource(name = "urlStatusService")
	public UrlStatusService urlStatusService;

	@Resource(name = "dataService")
	public DataService dataService;

	@Resource(name = "dataStatusService")
	public DataStatusService dataStatusService;

	@Resource(name = "teamService")
	public TeamService teamService;

	ExecutorService es;// 新建一个线程为8的线程池;

	/*
	 * * 1.second 2.min 3.hour 4.day 5.month 6.week (1) every 5 min; Eg: 0 '*'/5
	 * * * * * ? (2) specify min; Eg: 0 1,11,21,31 * * * * ? (3) from a to b
	 * min;Eg: 0 23-39 * * * * ?
	 */
	@Scheduled(cron = "0 0/10 4-23 * * ?")
	public void checksUrlTask() {
		
		// 检查赶时间公交数据是否更细、检查赶时间坐标是否转化为百度坐标
		// Expand expand = new Expand();
		// expand.checkBusData();
		// expand.checkBusStation();
		Expand expand=new Expand();
		expand.checkBusData();
		expand.checkBusStation();
		
		List<String> teams = urlService.getTeamUrl();

		if (teams.size() < 1 || teams == null) {
			return;
		}

		final String version = urlStatusService.getVersion();
		
		es = Executors.newFixedThreadPool(teams.size());
		
		for (final String  teamid: teams) {
			es.execute(new Runnable() {
				@Override
				public void run() {
					SendEmail sendE = new SendEmail();
					List<Url> urls = urlService.urlByTeamId(teamid);
					if (urls.size() < 1 || urls == null) {
						return;
					}
					for (Url url : urls) {
						UrlStatus status = new UrlStatus();
						// 拼接url
						//crawler.setUrl((String) UrlUtil.wapperUrl(url));
						// 超时时间
						//crawler.setTime(url.getTime());
						if (url.getRequestmethod().equals("get")) {
							status = crawler.check( UrlUtil.wapperUrl(url), teamid, url.getTime());// get请求
						} else if (url.getRequestmethod().equals("post")) {
							// post请求
							List<NameValuePair> params = new ArrayList<NameValuePair>();
							if (url.getParams() != null && url.getParams().size() > 0) {
								for (Param p : url.getParams()) {
									params.add(new BasicNameValuePair(p.getKey(), p.getValue()));
								}
							}
							status = crawler.checkPost(params, UrlUtil.wapperUrl(url), teamid, url.getTime());
						}

						String statuss = "";

						Url u = null;

						int a = Integer.parseInt(status.getStatusCode() == null ? "0" : status.getStatusCode().substring(0, 1));
						switch (a) {
						case 0:
							statuss = "请求超时/服务器拒绝";
							u = urlService.getUrl(url.getId());
							if (!u.getFlag().equals("-1")) {
								urlService.updateUrl(url.getId(), "0");
							}
							break;
						case 1:
							statuss = "临时响应";
							u = urlService.getUrl(url.getId());
							if (!u.getFlag().equals("-1")) {
								urlService.updateUrl(url.getId(), "1");
							}
							break;
						case 2:
							statuss = "成功";
							u = urlService.getUrl(url.getId());
							if (!u.getFlag().equals("-1")) {
								urlService.updateUrl(url.getId(), "2");
							}
							break;
						case 3:
							statuss = "重定向";
							u = urlService.getUrl(url.getId());
							if (!u.getFlag().equals("-1")) {
								urlService.updateUrl(url.getId(), "3");
							}
							break;
						case 4:
							statuss = "请求错误";
							u = urlService.getUrl(url.getId());
							if (!u.getFlag().equals("-1")) {
								urlService.updateUrl(url.getId(), "4");
							}
							break;
						case 5:
							statuss = "服务器错误 ";
							u = urlService.getUrl(url.getId());
							if (!u.getFlag().equals("-1")) {
								urlService.updateUrl(url.getId(), "5");
							}
							break;
						default:
							statuss = "";
							u = urlService.getUrl(url.getId());
							if (!u.getFlag().equals("-1")) {
								urlService.updateUrl(url.getId(), "-2");
							}
						}
						int errornum = urlService.getErrorNum(url.getId());

						if (status.getStatusCode() == null || status.getStatusCode().length() <= 0
								|| !statuss.equals("成功")) {
							
							int i = urlService.addErrorNum(url.getId());// 错误一次加1
							// String b =
							// urlService.getMessagestatus(url.getId()); //
							// 获取发送短信状态
							String m = url.getMessagestatus();
							String e = url.getEmailstatus();
							if (i > 0) {
								int error = errornum + 1;
								Team t = teamService.getTeamById(url.getTeamid());

								String str = String.format(Common.messageContent, t.getTeam_name(), url.getName(),
										statuss);

								// 发邮件的方法
								if (e.equals("0") && t.getEmail_to() != null && !t.getEmail_to().equals("")) {
									sendE.sendMail("接口检测：" + t.getTeam_name() + ":" + url.getName(), str,
											t.getEmail_to().split(","));
								}
								// 告警短信
								if (error == 3 && m.equals("0") && t.getMessage_to() != null
	 
										&& !t.getMessage_to().equals("")) {

									SendMessageUtil sendMessage = new SendMessageUtil();

									sendMessage.httpRequest(t.getMessage_to(), str);
								}

							}

						} else {

							if (url.getResulttype() != 1 || StringUtils.isBlank(url.getCheckfield())) {// 返回结果不是标准json格式，只检查http的状态，不判断返回值
								urlService.cleanZero(url.getId());// "正常"则清零

							} else if (StringUtils.isBlank(status.getResult())) {
								int i = urlService.addErrorNum(url.getId());// 错误一次加1

								if (i > 0) {
									int error = errornum + 1;
									Team t = teamService.getTeamById(url.getTeamid());

//									// 邮件内容
									String str = String.format(Common.messageContent, t.getTeam_name(), url.getName(),
											"返回结果有误");

									String m = url.getMessagestatus();
									String e = url.getEmailstatus();

									if (error == 3 && m.equals("0") && StringUtils.isNotBlank(t.getMessage_to())) {

										SendMessageUtil sendMessage = new SendMessageUtil();

										sendMessage.httpRequest(t.getMessage_to(), str);
									}
									// 发邮件的方法
									if (e.equals("0") && StringUtils.isNotBlank(t.getEmail_to())) {
										sendE.sendMail("接口检测：" + t.getTeam_name() + ":" + url.getName(), str,
												t.getEmail_to().split(","));
									}
								}

							} else {

								String code = null;
								//String msg = null;
								String codekey = url.getCheckfield();
								String codevalue = url.getCheckvalue();
								int codecondition = url.getCheckcondition();
								// 赶时间接口的返回值不是统一格式,所以跳过监测内容
								if (status.getResult().startsWith("{")) {
									JSONObject obj = JSONObject.fromObject(status.getResult());
									
									code = obj.containsKey(codekey) ? obj.get(codekey).toString() : "";
								}
								if (StringUtils.isBlank(code)) {
									urlService.cleanZero(url.getId());// "正常"则清零
								} else if (codecondition == 1 && !code.equals(codevalue)) {
									urlService.cleanZero(url.getId());// "正常"则清零
								} else if (codecondition == 2 && code.equals(codevalue)) {
									urlService.cleanZero(url.getId());// "正常"则清零
								} else {
									int i = urlService.addErrorNum(url.getId());// 错误一次加1
									System.out.println(status.getResult()+" and "+teamid.equals(status.getTeamid()));
									if (i > 0) {
										int error = errornum + 1;
										Team t = teamService.getTeamById(url.getTeamid());

										// 邮件内容
										String str = String.format(Common.messageContent, t.getTeam_name(),
												url.getName(), "返回结果有误");

										String m = url.getMessagestatus();
										String e = url.getEmailstatus();

										if (error == 3 && m.equals("0") && t.getMessage_to() != null
												&& !t.getMessage_to().equals("")) {

											SendMessageUtil sendMessage = new SendMessageUtil();

											sendMessage.httpRequest(t.getMessage_to(), str);
										}
										// 发邮件的方法
										if (e.equals("0") && t.getEmail_to() != null && !t.getEmail_to().equals("")) {
											sendE.sendMail("接口检测：" + t.getTeam_name() + ":" + url.getName(), str,
													t.getEmail_to().split(","));
										}
									}

								}
							}

						}

						status.setStatus(statuss);
						status.setUrl(url);
						status.setVersion(Long.parseLong(version));

						urlStatusService.add(status);

					}
				}
				
			});
		}
		
		
		//es.isTerminated();
		logger.info("over");
		es.shutdown();
		return;
	}

	@Scheduled(cron = "0 35 7 * * ?")
//	@Scheduled(cron = "0 26 16 * * ?")
	public void checksDataTask() {

		List<String> teams = dataService.getTeamMonitor();

		if (teams.size() < 1 || teams == null) {
			return;
		}
		es = Executors.newFixedThreadPool(teams.size());

		final int maxVersion = dataStatusService.getMaxVersion();
		for (int i = 0; i < teams.size(); i++) {
			final String teamid = teams.get(i);
			es.execute(new Runnable() {
				@Override
				public void run() {
					List<DataMonitor> dm = new ArrayList<DataMonitor>();
					dm = dataService.getdataMonitorByTeamdId(teamid);
					if (dm.size() < 0) {
						return;
					}

					List<ResultView> datas = dataService.checkMaxUpdate(dm);
					List<DataStatus> dvs = new ArrayList<DataStatus>();

					if (datas == null || datas.size() < 1) {
						return;
					} else {
						for (ResultView re : datas) {
							/*try {*/
								String tid = "";
								DataStatus dv = new DataStatus();
								DataMonitor dataMonitor = new DataMonitor();
								String statusc = "";
								int a = re.getI();
								DataMonitor datam = dataService.getDataMonitorById(re.getMid());
								Team t = teamService.getTeamById(datam.getTeamid());
								if (a >= 0) {
									statusc = "正常";
									tid = t.getId();
									dataService.cleanZero(re.getMid(), 1);// data开启是1关闭是0超时是2

								} else {
									statusc = "数据交换超时";
									int errornum = dataService.getErrorNum(re.getMid());
									int i = dataService.addErrorNum(re.getMid());
									if (i > 0) {
										int error = errornum + 1;
										if (error >= 1) {

											SendEmail sendE = new SendEmail();

											tid = t.getId();

											String content = "(7)" + re.getContent();
											String c = content.substring(content.indexOf("在"),
													content.indexOf("库") + 1);
											String maxtime = c + "中最后更新时间为：" + re.getMaxupdate();
											String checkName = "检查项名为：" + re.getCheckname();

											if (datam.getEmailstatus().equals("0") && t.getEmail_to() != null
													&& !t.getEmail_to().equals("")) {// 0发送邮件，1不发送邮件
												sendE.sendMail("数据监测：" + re.getCheckname(),
														content + "\n" + checkName + "\n" + maxtime,
														t.getEmail_to().split(","));
											}

											if (error == 3 && datam.getMessagestatus().equals("0")
													&& t.getMessage_to() != null && !t.getMessage_to().equals("")) {// 0发送短信，1不发送短信
												SendMessageUtil sendMessage = new SendMessageUtil();

												sendMessage.httpRequest(t.getMessage_to(),
														content + ";" + checkName + ";" + maxtime);

											}

										}
										dataService.updateStatus(re.getMid());
									}
								}
								dv.setStatus(statusc);
								dv.setCheck_time(re.getChecktime());
								dv.setMax_time(re.getMaxupdate());
								dataMonitor.setId(re.getMid());
								dv.setDataMonitor(dataMonitor);
								dv.setTeamid(tid);
								dv.setVersion(maxVersion);

								dvs.add(dv);

							/*} catch (Exception e) {
								logger.info(e.getMessage());
							}*/
							// ReadPropertiesUtil readProperties = new
							// ReadPropertiesUtil();

						}
						dataStatusService.inserDataAtatus(dvs);
						

						logger.info("over");
						es.shutdown();
						return;
					}

				}
			});
		}

	}

	public static void main(String[] args) {

		// CronJobService cj = new CronJobService();
		// cj.checksUrlTask();
		// cj.checksDataTask();
		/*
		 * 暂时不删除 String path =
		 * cj.getClass().getResource("/conf.properties").getPath();
		 * System.out.println("path:"+path); SendMessageUtil sendMessage = new
		 * SendMessageUtil(); ReadPropertiesUtil readProperties = new
		 * ReadPropertiesUtil(); String p = readProperties.readValue(path,
		 * "phone"); String requestUrl = readProperties.readValue(path,
		 * "sendMessageUrl");
		 * 
		 * String content = "nihao"; System.out.println(p+"/"+requestUrl);
		 */

	}

}
