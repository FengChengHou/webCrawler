package com.iflyun.webCrawler.service.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.iflyun.webCrawler.bean.entity.UrlStatus;
import com.iflyun.webCrawler.common.util.SendMessageUtil;
import com.iflyun.webCrawler.constant.UrlConstants;

@Service
public class Expand {

	/**
	 * 检查百度坐标是否已经转了
	 * 
	 */

	public void checkBusStation() {

		UrlCrawler crawler = new UrlCrawler();

		UrlStatus status = null;

		String statuss = "";

		String url="http://172.16.7.55:10808/loadService?mobile_serial_number=18705586510&load_operation=1&x=118.369079&y=31.386377&user_name=test1";
		try {

			status = crawler.check(url, "", 30000);

		} catch (Exception e) {
			System.out.println("There is no urlStatus got!");
		}

		int a = Integer.parseInt(status.getStatusCode() == null ? "0" : status
				.getStatusCode().substring(0, 1));
		switch (a) {
		case 0:
			statuss = "请求超时/服务器拒绝";
			break;
		case 1:
			statuss = "临时响应";
			break;
		case 2:
			statuss = "成功";// 200
			break;
		case 3:
			statuss = "重定向";
			break;
		case 4:
			statuss = "请求错误";
			break;
		case 5:
			statuss = "服务器错误 ";// 500
			break;
		default:
			statuss = "";
		}

		if (statuss.equals("成功")) {

			try {
				JSONArray jArray = new JSONArray(status.getResult());
				JSONObject jsonObject = jArray.getJSONObject(0);
				String result = jsonObject.getString("result");

				String relativelyPath=System.getProperty("user.dir"); 
				String filename =relativelyPath+"/baidunum.txt";
				int i = this.readFileByChars(filename);
				if (!"1".equals(result)) {
					if (i == 48) {
						this.write('6', filename);
						SendMessageUtil sendMessage = new SendMessageUtil();

						String str = "赶时间站点查不到，可能是百度坐标原因。【接口监测】";
						//String content = sendMessage.urlEncodeUTF8(str);
						sendMessage.httpRequest(UrlConstants.phone, str);
					} else {
						i = i - 1;
						this.write((char) i, filename);
					}

				}

			} catch (JSONException e) {
				e.printStackTrace();
			}

		}

		System.out.println("检查百度坐标执行成功！status：" + status.getStatusCode());

	}

	public void checkBusData() {

		UrlCrawler crawler = new UrlCrawler();

		UrlStatus status = null;

		String statuss = "";

		String Url="http://172.16.7.55:10808/lastHole";

		try {

			status = crawler.check(Url, "", 30000);

		} catch (Exception e) {
			System.out.println("There is no urlStatus got!");
		}

		int a = Integer.parseInt(status.getStatusCode() == null ? "0" : status
				.getStatusCode().substring(0, 1));
		switch (a) {
		case 0:
			statuss = "请求超时/服务器拒绝";
			break;
		case 1:
			statuss = "临时响应";
			break;
		case 2:
			statuss = "成功";
			break;
		case 3:
			statuss = "重定向";
			break;
		case 4:
			statuss = "请求错误";
			break;
		case 5:
			statuss = "服务器错误 ";
			break;
		default:
			statuss = "";
		}
		if (statuss.equals("成功")) {

			try {
				// JSONArray jArray = new
				// JSONArray(status.getResult().toString());
				JSONObject jsonObject = new JSONObject(status.getResult()
						.toString());
				String result = jsonObject.getString("flag");
				String time = jsonObject.getString("lastTime");
				/*
				 * Timestamp currentTime = new Timestamp(System
				 * .currentTimeMillis()); Timestamp uTime =
				 * Timestamp.valueOf(time); Timestamp updateTime = new
				 * Timestamp(uTime.getTime() + 90000000);
				 * System.out.println("==2" + updateTime);
				 */
				String relativelyPath=System.getProperty("user.dir"); 
				String filename =relativelyPath+"/ganshijiannum.txt";
				int i = this.readFileByChars(filename);
				if (!"1".equals(result)) {

					if (i == 48) {
						// 如果超时时间小于25小时则继续发短信
						SendMessageUtil sendMessage = new SendMessageUtil();

						String str = "赶时间公交数据超过24小时未更新，最后一次更新时间是" + time
								+ "。【接口监测】";
						//String content = sendMessage.urlEncodeUTF8(str);

						sendMessage.httpRequest(UrlConstants.phone, str);
					} else {
						i = i - 1;
						this.write((char) i, filename);
					}

				}

			} catch (JSONException e) {
				e.printStackTrace();
			}

			System.out.println("检查公交数据是否更新信息成功！");
		}

	}

	public char readFileByChars(String fileName) {
		File file = new File(fileName);
		if (!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		Reader reader = null;
		int tempchar = 0;
		char re = 0;
		try {
			System.out.println("以字符为单位读取文件内容，一次读一个字节：");
			// 一次读一个字符
			reader = new InputStreamReader(new FileInputStream(file));
			while ((tempchar = reader.read()) != -1) {
				// 对于windows下，\r\n这两个字符在一起时，表示一个换行。
				// 但如果这两个字符分开显示时，会换两次行。
				// 因此，屏蔽掉\r，或者屏蔽\n。否则，将会多出很多空行。
				if (((char) tempchar) != '\r') {
					System.out.print("" + (char) tempchar + "\n");
					re = (char) tempchar;
				}
			}
			reader.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e1) {
				}
			}
		}
		return re;
	}

	public void write(char number, String filename) {
		try {
			System.out.println("开始写");
			File file = new File(filename);

			if (!file.exists()) {
				file.createNewFile();
			}

			FileWriter fw = new FileWriter(file.getAbsoluteFile());
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(number);
			bw.close();

			System.out.println("Done");

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {

		//Expand expand = new Expand();
		String relativelyPath=System.getProperty("user.dir"); 
		String filename =relativelyPath+"/src/ganshijiannum.txt";
		System.out.println(filename);
		/*
		 * int i = expand
		 * .readFileByChars("C:/Users/Administrator/Desktop/test.txt");
		 * System.out.println("i:"+i); if (i==48) { expand.write('6',
		 * "C:/Users/Administrator/Desktop/test.txt"); }else{ i=i-1;
		 * expand.write((char)i, "C:/Users/Administrator/Desktop/test.txt"); }
		 */
		// expand.checkBusData();

	}
}
