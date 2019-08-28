package com.iflyun.webCrawler.bean.view;

import java.sql.Timestamp;

public class ResultView {
	private int i;
	private Timestamp maxupdate;
	private String mid;
	private String content;
	private Timestamp checktime;
	private String checkname;
	
	

	public String getCheckname() {
		return checkname;
	}

	public void setCheckname(String checkname) {
		this.checkname = checkname;
	}

	public int getI() {
		return i;
	}

	public void setI(int i) {
		this.i = i;
	}

	public Timestamp getMaxupdate() {
		return maxupdate;
	}

	public void setMaxupdate(Timestamp maxupdate) {
		this.maxupdate = maxupdate;
	}
	
	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getChecktime() {
		return checktime;
	}

	public void setChecktime(Timestamp checktime) {
		this.checktime = checktime;
	}

}
