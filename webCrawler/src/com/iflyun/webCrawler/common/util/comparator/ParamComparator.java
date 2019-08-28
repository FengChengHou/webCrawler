package com.iflyun.webCrawler.common.util.comparator;

import java.util.Comparator;

import com.iflyun.webCrawler.bean.entity.Param;

public class ParamComparator implements Comparator<Param> {

	public int compare(Param o1, Param o2) {
		return o1.getOrder()-o2.getOrder();
	}
	
}
