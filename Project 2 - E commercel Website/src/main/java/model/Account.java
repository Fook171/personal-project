package model;

public class Account {
	private String usr, pwd;
	private int role;
	private String name, address, phone;
	public Account() {
		usr = "";
		pwd = "";
		role = 0;
		name = "";
		address = "";
		phone = "";
	} 
	public Account(String usr, String pwd,int role, String name, String address, String phone) {
		this.usr = usr;
		this.pwd = pwd;
		this.role = role;
		this.name = name;
		this.address = address;
		this.phone = phone;
	} 
	public String getUsr() {
		return usr;
	}
	public void setUsr(String usr) {
		this.usr = usr;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
}
