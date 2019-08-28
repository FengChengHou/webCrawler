package com.iflyun.webCrawler.bean.util;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import com.iflyun.webCrawler.bean.domain.EasyuiTreeNode;
import com.iflyun.webCrawler.bean.view.ParamView;
import com.iflyun.webCrawler.bean.view.UrlView;
import com.iflyun.webCrawler.common.util.comparator.ParamViewComparator;

public class UrlView2TreeGrid {
	
	public static  List<EasyuiTreeNode> urlViews2TreeGrid(List<UrlView> urlViews){
	
		List<EasyuiTreeNode>  urlTree = new LinkedList<EasyuiTreeNode>();
		
		ParamViewComparator paramComparator = new ParamViewComparator();
		
		for (UrlView u : urlViews){
			EasyuiTreeNode  urlNode = new EasyuiTreeNode(); 
			urlNode.setName(u.getName());
			urlNode.setHost(u.getHost());
			urlNode.setPort(u.getPort());
			urlNode.setPath(u.getPath());
			
			List<ParamView> pViews = u.getParamViews();
			Collections.sort(pViews, paramComparator);
			
			List<EasyuiTreeNode> nodeChildren = new LinkedList<EasyuiTreeNode>();
			
			for(ParamView p: pViews){
				EasyuiTreeNode  paramNode = new EasyuiTreeNode(); 
				paramNode.setKey(p.getKey());
				paramNode.setValue(p.getValue());
				
				nodeChildren.add(paramNode);
			}
			urlNode.setChildren(nodeChildren);
			
			urlTree.add(urlNode);
		}
		
		return urlTree;
	}

}
