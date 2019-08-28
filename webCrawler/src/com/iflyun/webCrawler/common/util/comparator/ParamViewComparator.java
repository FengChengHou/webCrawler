package com.iflyun.webCrawler.common.util.comparator;

import java.util.Comparator;

import com.iflyun.webCrawler.bean.view.ParamView;

public class ParamViewComparator implements Comparator<ParamView> {

		public int compare(ParamView o1, ParamView o2) {
			return o1.getOrder()-o2.getOrder();
		}
}
