package com.iflyun.webCrawler.common.util;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import com.iflyun.webCrawler.constant.UrlConstants;

public class SendMessageUtil {
	
	public Object httpRequest(String phone, String content) {
		StringBuffer buffer = new StringBuffer();
		
		//老短信接口
		/*String requestUrl = UrlConstants.sendMessageUrl + "telephone=" + phone
				+ "&content=" + content
				+ "&user=yihuwang&password=b9445e0ec22c179c";*/
		
		String params=null;
		try {
			params = URLEncoder.encode("{phone:'"+phone+"',content:'"+content+"'}","utf-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		String requestUrl = UrlConstants.sendMessageUrl +params;
		try {
			URL url = new URL(requestUrl);
			HttpURLConnection httpUrlConn = (HttpURLConnection) url
					.openConnection();

			httpUrlConn.setDoOutput(false);
			httpUrlConn.setDoInput(true);
			httpUrlConn.setUseCaches(false);

			httpUrlConn.setRequestMethod("GET");
			httpUrlConn.connect();

			// 将返回的输入流转换成字符串
			InputStream inputStream = httpUrlConn.getInputStream();
			InputStreamReader inputStreamReader = new InputStreamReader(
					inputStream, "utf-8");
			BufferedReader bufferedReader = new BufferedReader(
					inputStreamReader);

			String str = null;
			while ((str = bufferedReader.readLine()) != null) {
				buffer.append(str);
			}
			bufferedReader.close();
			inputStreamReader.close();
			// 释放资源
			inputStream.close();
			inputStream = null;
			httpUrlConn.disconnect();

		} catch (Exception e) {
		}

		return buffer.toString();
	}

	/**
	 * utf编码
	 * 
	 * @param source
	 * @return
	 */
	public String urlEncodeUTF8(String source) {
		String result = source;
		try {
			result = java.net.URLEncoder.encode(source, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		return result;
	}
	
	public static void main(String[] args) {
		SendMessageUtil su = new SendMessageUtil();
		ReadPropertiesUtil readProperties = new ReadPropertiesUtil();
		String p = readProperties.readValue("src/conf.properties", "phone");
		su.httpRequest(p, "你好123");
	}

}
