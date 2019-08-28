package com.iflyun.webCrawler.common.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.methods.StringRequestEntity;

public class UcInterface {
	private static class SimpleRequestEnity implements RequestEntity {

		private String str;
		private String contentType;

		public SimpleRequestEnity(String str) {
			super();
			this.str = str;
		}

		public SimpleRequestEnity(String str, String contentType) {
			super();
			this.str = str;
			this.contentType = contentType;
		}

		@Override
		public boolean isRepeatable() {
			return false;
		}

		@Override
		public void writeRequest(OutputStream paramOutputStream)
				throws IOException {
			paramOutputStream.write(str.getBytes());
		}

		@Override
		public long getContentLength() {
			return str.length();
		}

		@Override
		public String getContentType() {
			if (contentType != null) {
				return contentType;
			}
			return "application/xml; charset=UTF-8";
		}

	}
	
	public String getResult(String params, String url){
		String xmlString = "";

		PostMethod postMethod = new PostMethod(
				url);
		postMethod.setRequestHeader("Accept", "application/xml");
		HttpClient client = new HttpClient();
		try {
			RequestEntity entity = new StringRequestEntity(params, "application/xml;charset=utf-8", "utf-8");
			postMethod.setRequestEntity(entity);
			client.executeMethod(postMethod);

			InputStream in = postMethod.getResponseBodyAsStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(in,
					"UTF-8"));
			xmlString = br.readLine();

		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return xmlString;
	}

}
