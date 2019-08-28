package com.iflyun.webCrawler.common.util;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

public class JsonUtil {
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
}
