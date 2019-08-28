package com.iflyun.webCrawler.bean.entity;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "crawler_function")
public class Function {
	
	@Column(name = "id", length = 36, nullable = false)
	@Id
	private String id;
	
	private String function_code;
	private String function_name;
	private String status;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFunction_code() {
		return function_code;
	}
	public void setFunction_code(String function_code) {
		this.function_code = function_code;
	}
	public String getFunction_name() {
		return function_name;
	}
	public void setFunction_name(String function_name) {
		this.function_name = function_name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	public Function() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Function( String function_code, String function_name, String status) {
		this.id = UUID.randomUUID().toString();
		this.function_code = function_code;
		this.function_name = function_name;
		this.status = status;
	}
	
	
}
