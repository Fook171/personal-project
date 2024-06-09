package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import context.DBContext;
import model.Account;

public class AccountDAO {
	public Account search(String username) throws Exception {
		DBContext db = new DBContext();
		Connection cnn = db.getConnection();
		String sql = "SELECT * FROM account WHERE user_mail = ?";;
		PreparedStatement stmt = cnn.prepareStatement(sql);
        stmt.setString(1, username);
        

		ResultSet resultSet = stmt.executeQuery();
		Account a = null;
		if (resultSet.next())
			a = new Account(resultSet.getString("user_mail"), resultSet.getString("password"), resultSet.getInt("account_role"), resultSet.getString("user_name"), resultSet.getString("user_address"), resultSet.getString("user_phone"));
		stmt.close();
		return a;
	}
	
	
	public void insert(Account a) throws Exception {
		DBContext db = new DBContext();
		Connection cnn = db.getConnection();
		String sql = "insert into account (user_mail, password, account_role, user_name, user_address, user_phone) values (?, ?, ?, ?, ?, ?)";
		PreparedStatement stmt = cnn.prepareStatement(sql);
		stmt.setString(1, a.getUsr());
		stmt.setString(2, a.getPwd());
		stmt.setString(3, Integer.toString(a.getRole()));
		stmt.setString(4, a.getName());
		stmt.setString(5, a.getAddress());
		stmt.setString(6, a.getPhone());
		
		stmt.executeUpdate();
		
		stmt.close();
		
	}
 }
