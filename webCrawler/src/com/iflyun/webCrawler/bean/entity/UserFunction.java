package com.iflyun.webCrawler.bean.entity;

import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "crawler_user_function")
public class UserFunction {
	
	@Column(name = "id", length = 36, nullable = false)
	@Id
	private String id;
	
	@ManyToOne(targetEntity = User.class,cascade = CascadeType.REMOVE)
	@JoinColumn(name = "userid")
	private User user ;
	
	@ManyToOne(targetEntity = Function.class,cascade = CascadeType.REMOVE)
	@JoinColumn(name = "functionid")
	private Function function;
	
	private String status;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Function getFunction() {
		return function;
	}

	public void setFunction(Function function) {
		this.function = function;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public UserFunction(User user, Function function, String status) {
		super();
		this.id = UUID.randomUUID().toString();
		this.user = user;
		this.function = function;
		this.status = status;
	}

	public UserFunction() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	

}
