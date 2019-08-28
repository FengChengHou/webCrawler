package com.iflyun.webCrawler.common.util;

import java.sql.Timestamp;

public class DateUtil {
	public  static int TimestampDiff(Timestamp t1,Timestamp t2){
		return  (int)((t1.getTime() - t2.getTime()) % 1000);
	}

}
