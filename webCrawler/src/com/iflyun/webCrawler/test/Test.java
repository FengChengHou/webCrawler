package com.iflyun.webCrawler.test;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Timestamp;
import java.util.Properties;








import com.iflyun.webCrawler.common.util.DateUtil;

public class Test implements Runnable{
	
	 public static String readValue(String filePath,String key) {
		  Properties props = new Properties();
		        try {
		         InputStream in = new BufferedInputStream (new FileInputStream(filePath));
		         props.load(in);
		         String value = props.getProperty (key);
		            System.out.println(key+value);
		            return value;
		        } catch (Exception e) {
		         e.printStackTrace();
		         return null;
		        }
		 }
	
public static void main(String[] args) {
	
	
	

	
	
	/*test.run();
	
	
	System.out.println("select p.name as name, decode(p.gender, '1', '男', '2', '女', '未知') as gender" +
			", p.person_no as personNo, p.idcard as idcard," +
			//remove workingDate COLUMN
			//" to_char(p.working_date,'yyyy-mm-dd') as workingDate," +
			" decode(p.insurance_status,'1','正常参保','2','暂停参保', '3', '终止参保', '未知') as insuranceStatus, substr(?,0,10) as depositDate, (select sum(d.currently_paytable) from psn_social_insurance_detiail d where d.deposit_flag='1' and d.deposit_date = to_date(?,'yyyy-mm-dd HH24:mi:ss') and d.person_no=p.person_no ) as totalMoney, (select count(distinct d3.deposit_date) from psn_social_insurance_detiail d3 where d3.deposit_flag='1' and d3.person_no=p.person_no ) as forMonths, (select u.unitname from psn_social_insurance_unit u where u.unit_no= p.unit_no) as unitName" +
			//remove payment_base COLUMN
			//", (select b.base_medical from psn_si_payment_base b where b.person_no=p.person_no and rownum=1 and b.handle_date=(select max(b2.handle_date) from psn_si_payment_base b2 where b2.person_no=p.person_no))  as paymentBase" +
			" from psn_social_insurance_person p  where p.idcard=? and p.person_no=?");*/

}

@Override
public void run() {
	Timestamp finishedTime = new Timestamp(System.currentTimeMillis());
	
	
	
	System.out.println((DateUtil.TimestampDiff(new Timestamp(System.currentTimeMillis()),finishedTime )));
	
}
}
