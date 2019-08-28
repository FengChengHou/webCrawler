package com.iflyun.webCrawler.test;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

import com.iflyun.webCrawler.bean.view.ParamView;
import com.iflyun.webCrawler.bean.view.UrlView;

public class JsonTest {
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static <T> List<T> jsonToList(T clazz,JSONArray jsonArray){
		List objs=new ArrayList<T>();
        List list=(List)JSONSerializer.toJava(jsonArray);
        
        for(Object o:list){
            JSONObject jsonObject=JSONObject.fromObject(o);
            T obj=(T) JSONObject.toBean(jsonObject, clazz.getClass());
            objs.add(obj);
        }
        return  objs;
	}


	public static void main(String[] args) {
		String jsonStr = new StringBuilder("{host:'172.16.7.42',port:'8080',path:'get_fund_baseinfo',name:'公积金基本信息查询',paramViews:[{key:'key',value:'value',order:0}]}").toString();
		JSONObject o =JSONObject.fromObject(jsonStr);
		
		UrlView urlView  = (UrlView)JSONObject.toBean(o, UrlView.class);
		
		System.out.println(JSONArray.fromObject(urlView.getParamViews()).toString());
		JSONArray jsonArray = (JSONArray) JSONSerializer.toJava(JSONObject.fromObject(urlView.getParamViews()));
		List <ParamView> urlViews = JsonTest.jsonToList(new ParamView(), jsonArray);
		System.out.println(urlViews.get(0).getKey());
		
		/*JSONArray jsonArray =  (JSONArray)JSONSerializer.toJSON(jsonStr);
		List <ParamView> urlViews = JsonTest.jsonToList(new ParamView(), jsonArray);
		System.out.println(urlViews.get(0).getKey());
		for (ParamView p : urlViews){
			System.out.println(p.getKey());
		}*/
		
		
		
	}
}
