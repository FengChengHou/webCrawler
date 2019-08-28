package com.iflyun.webCrawler.test;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
  
public class JsonUtil{
    
    /**
     * json对象转换为java对象
     * 
     * @throws JSONException
     */
    @SuppressWarnings("static-access")
	public void jsonToJava(){
        String json="[{\"addTime\":\"2011-09-19 14:23:02\",\"iccid\":\"1111\",\"id\":0,\"imei\":\"2222\",\"imsi\":\"3333\",\"phoneType\":\"4444\",\"remark\":\"aaaa\",\"tel\":\"5555\"}]";
        //接收{}对象，此处接收数组对象会有异常
        if(json.indexOf("[")!=-1){
            json=json.replace("[", "");
        }
        if(json.indexOf("]")!=-1){
            json=json.replace("]", "");
        }
        JSONObject obj=new JSONObject().fromObject(json);
        SimInfo simInfo=(SimInfo)JSONObject.toBean(obj, SimInfo.class);
        System.out.println("obj: "+simInfo);
        System.out.println(simInfo.getAddTime());
        System.out.println(simInfo.getIccid());
        System.out.println(simInfo.getImei());
        System.out.println(simInfo.getImsi());
        System.out.println(simInfo.getPhoneType());
        System.out.println(simInfo.getRemark());
        System.out.println(simInfo.getTel());
        System.out.println(simInfo.getId());
        
    }

    /**
     * 将json转换为java集合对象
     */
    public void jsonToJavas(){
        String jsons="[{\"addTime\":\"2011-09-19 14:23:02\",\"iccid\":\"1111\",\"id\":0,\"imei\":\"2222\",\"imsi\":\"3333\",\"phoneType\":\"4444\",\"remark\":\"aaaa\",\"tel\":\"5555\"}," +
                     "{\"addTime\":\"2011-11-11 14:23:02\",\"iccid\":\"2222\",\"id\":0,\"imei\":\"2222\",\"imsi\":\"3333\",\"phoneType\":\"4444\",\"remark\":\"aaaa\",\"tel\":\"5555\"}]";
        List<SimInfo> simInfos = getJavaCollection(new SimInfo(),jsons);
        System.out.println(simInfos.size());
        for(SimInfo simInfo:simInfos){
            System.out.println("addTime: "+simInfo.getAddTime());
            System.out.println("=========");
        }
        
    }

    /**
     * 封装将json对象转换为java集合对象
     * 
     * @param <T>
     * @param clazz
     * @param jsons 
     * @return
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	private <T> List<T> getJavaCollection(T clazz, String jsons) {
        List<T> objs=null;
        JSONArray jsonArray=(JSONArray)JSONSerializer.toJSON(jsons);
        if(jsonArray!=null){
            objs=new ArrayList<T>();
            List list=(List)JSONSerializer.toJava(jsonArray);
            for(Object o:list){
                JSONObject jsonObject=JSONObject.fromObject(o);
                T obj=(T)JSONObject.toBean(jsonObject, clazz.getClass());
                objs.add(obj);
            }
        }
        return objs;
    }
    
    /**
     * java对象转换为json对象
     * 
     * @throws JSONException
     */
    @SuppressWarnings("static-access")
	public void javaToJson(){
        SimInfo simInfo=new SimInfo();
        simInfo.setAddTime("11");
        simInfo.setIccid("1111");
        simInfo.setImei("2222");
        simInfo.setImsi("3333");
        simInfo.setPhoneType("4");
        simInfo.setRemark("aaaa");
        simInfo.setTel("5555");
        //java对象转换为json对象
        String json=new JSONArray().fromObject(simInfo).toString();
        //json: [{"addTime":"2011-09-19 14:23:02","iccid":"1111","id":0,"imei":"2222","imsi":"3333","phoneType":"4444","remark":"aaaa","tel":"5555"}]
        System.out.println("json: "+json);
    }
    
    
}