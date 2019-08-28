package com.iflyun.webCrawler.bean.view;

/**
 * 
* @ClassName: DimView 
* @Description: flyUI下拉框加载纬度工具类 
* @author byxs
* @date 2016年2月24日 上午10:43:47 
*
 */
public class DimView {
	
	/**
	 * 页面显示文本
	 */
	private String mc;
	
	/**
	 * 文本值
	 */
	private String dm;
	public String getMc() {
		return mc;
	}
	public void setMc(String mc) {
		this.mc = mc;
	}
	public String getDm() {
		return dm;
	}
	public void setDm(String dm) {
		this.dm = dm;
	}
	public DimView() {
		super();
		// TODO Auto-generated constructor stub
	}
	public DimView(String mc, String dm) {
		super();
		this.mc = mc;
		this.dm = dm;
	}
	
	

}
