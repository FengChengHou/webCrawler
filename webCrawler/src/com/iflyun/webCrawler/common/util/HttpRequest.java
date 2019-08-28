package com.iflyun.webCrawler.common.util;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

public class HttpRequest {
	
	public String httpRequest(String requestUrl) {
		StringBuffer buffer = new StringBuffer();
		try {
			URL url = new URL(requestUrl);
			HttpURLConnection httpUrlConn = (HttpURLConnection) url
					.openConnection();

			httpUrlConn.setDoOutput(false);
			httpUrlConn.setDoInput(true);
			httpUrlConn.setUseCaches(false);

			httpUrlConn.setRequestMethod("GET");
			httpUrlConn.connect();
			
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
			inputStream.close();
			inputStream = null;
			httpUrlConn.disconnect();

		} catch (Exception e) {
		}

		System.out.println(buffer.toString());

		return buffer.toString();
	}
	
	public String httpRequestPost(String requestUrl,List<NameValuePair> params) {
		
		HttpPost htttRequest = new HttpPost(requestUrl);
		htttRequest.addHeader("Content-Type", "application/x-www-form-urlencoded");
		String strResult = "";
		try {
	           
			/* 添加请求参数到请求对象 */
			htttRequest.setEntity((HttpEntity) new UrlEncodedFormEntity(params, HTTP.UTF_8));
			//method.setEntity(new UrlEncodedFormEntity(params, HTTP.UTF_8));
			/* 发送请求并等待响应 */
			HttpResponse httpResponse = new DefaultHttpClient().execute(htttRequest);
			/* 若状态码为200 ok */
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				/* 读返回数据 */
				strResult = EntityUtils.toString(httpResponse.getEntity());
			} else {
				strResult = httpResponse.getStatusLine().toString();

			}

		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		return strResult;
	}
	
	public static void main(String[] args) {
		
		List<NameValuePair> params = new ArrayList<NameValuePair>();

		/**
		 * NameValuePair实现请求参数的封装
		 */
		
		params.add(new BasicNameValuePair("info.car_card","皖BBZ207"));
		params.add(new BasicNameValuePair("info.car_type", "02"));
		params.add(new BasicNameValuePair("info.car_card_after_six", "150440"));
		String requestUrl = "http://jtwf.ah122.cn/query/query.action";
		HttpRequest hr = new HttpRequest();
		String result = hr.httpRequestPost(requestUrl, params);
		
		System.out.println("result:"+result);
		
		
	}
	
}
