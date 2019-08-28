package com.iflyun.webCrawler.bean.domain;

import java.io.Serializable;
import java.util.List;

public class EasyuiDatagridJson<T> implements Serializable{

	/**
	 * 后台向前台数据，用于返回easyui的datagrid
	 * 
	 */
	private static final long serialVersionUID = 1043280276486115589L;
	
	private Long total;//设置总记录数
	
	private List<T> rows;//设置行记录

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public List<T> getRows() {
		return rows;
	}

	public void setRows(List<T> rows) {
		this.rows = rows;
	}

}
