package com.iflyun.webCrawler.test;

import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;

public class JsonArrayTest {

	@SuppressWarnings("unused")
	public static void main(String[] args) {
		 String jsons="[{\"addTime\":\"2011-09-19 14:23:02\",\"iccid\":\"1111\",\"id\":0,\"imei\":\"2222\",\"imsi\":\"3333\",\"phoneType\":\"4444\",\"remark\":\"aaaa\",\"tel\":\"5555\"}," +
         "{\"addTime\":\"2011-11-11 14:23:02\",\"iccid\":\"2222\",\"id\":0,\"imei\":\"2222\",\"imsi\":\"3333\",\"phoneType\":\"4444\",\"remark\":\"aaaa\",\"tel\":\"5555\"}]";
		
		JSONArray jsonArray=(JSONArray)JSONSerializer.toJSON(jsons);
		return;
	}
}
