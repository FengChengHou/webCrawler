package com.iflyun.webCrawler.bean.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.iflyun.webCrawler.bean.view.ParamView;


@Entity
@Table(name="crawler_param")
public class Param implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Column(name="id",length = 36, nullable = false)
	@Id
	@GeneratedValue(generator = "uuid")   //指定生成器名称
	@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")  //生成器名称，uuid生成类
	private String id;
	
	@ManyToOne(fetch = FetchType.LAZY,cascade=CascadeType.REMOVE)
	@JoinColumn(name="url_id", referencedColumnName = "ID", nullable = false)
	private Url url;
	
	@Column(name="p_key")
	private String key;
	
	@Column(name="p_value")
	private String value;
	
	@Column(name="order_num")
	private int order;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public Url getUrl() {
		return url;
	}

	public void setUrl(Url url) {
		this.url = url;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}
	
	public Param(){
		
	}
	
	public Param(ParamView p){
		this.setKey(p.getKey());
		this.setValue(p.getValue());
		this.setOrder(p.getOrder());
		
	}
}
