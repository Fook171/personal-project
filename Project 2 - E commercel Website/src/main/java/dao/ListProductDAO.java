package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import context.DBContext;

import model.Product;

public class ListProductDAO {
	
	public List<Product> search(String characters, String type) throws Exception {
		DBContext db = new DBContext();
		Connection cnn = db.getConnection();
		String sql;
		PreparedStatement stmt;
		if ("any".equals(type)) {
            sql = "SELECT * FROM products WHERE product_name LIKE ?";
            stmt = cnn.prepareStatement(sql);
            stmt.setString(1, "%" + characters + "%");
        } else {
            sql = "SELECT * FROM products WHERE product_type = ? AND product_name LIKE ?";
            stmt = cnn.prepareStatement(sql);
            stmt.setString(1, type);
            stmt.setString(2, "%" + characters + "%");
        }

		ResultSet resultSet = stmt.executeQuery();
		List<Product> ls = new ArrayList<Product>();
		while (resultSet.next()) {
			Product p = new Product(resultSet.getInt("product_id"), resultSet.getString("product_name"), resultSet.getString("product_des"), resultSet.getDouble("product_price"), resultSet.getString("product_img_source"), resultSet.getString("product_type"), resultSet.getString("product_brand"));
			ls.add(p);
		}
		stmt.close();
		return ls;
	}
	
	public List<String> getTypeList() throws Exception {
		DBContext db = new DBContext();
		Connection cnn = db.getConnection();
		
		String sql = "select distinct product_type from products";
		PreparedStatement stmt = cnn.prepareStatement(sql);
		ResultSet resultSet = stmt.executeQuery();
		List<String> ls = new ArrayList<String>();
		while (resultSet.next()) {
			String type = resultSet.getString("product_type");
			ls.add(type);
		}
		stmt.close();
		return ls;
	} 

	public Product getProduct(String characters) throws Exception {
		DBContext db = new DBContext();
		Connection cnn = db.getConnection();
		String sql = "select * from products where product_id=?";
		PreparedStatement stmt = cnn.prepareStatement(sql);
        stmt.setString(1, characters);
        ResultSet resultSet = stmt.executeQuery();
        Product p;
        resultSet.next();
        p = new Product(resultSet.getInt("product_id"), resultSet.getString("product_name"), resultSet.getString("product_des"), resultSet.getDouble("product_price"), resultSet.getString("product_img_source"), resultSet.getString("product_type"), resultSet.getString("product_brand"));
        stmt.close();
		return p;
	}
}
