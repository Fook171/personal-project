package dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import context.DBContext;
import model.Cart;
import model.Orders;
import model.Product;
import model.ProductOrders;

public class OrdersDAO {
	public void insertOrder(Orders o, Cart c) throws Exception {
		DBContext db = new DBContext();
		Connection cnn = db.getConnection();
		PreparedStatement stmt1 = null;
		PreparedStatement stmt2 = null;
		
		String sql1 = "insert into orders (user_mail, order_id, order_status, order_date, order_discount_code, order_address) values (?, ?, ?, ?, ?, ?)";
		stmt1 = cnn.prepareStatement(sql1);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String sqlMax = "select max(order_id) as max_id from orders";
		PreparedStatement stmt = cnn.prepareStatement(sqlMax);
		ResultSet resultSet = stmt.executeQuery();
		if (resultSet.next())
			o.setOrderId(resultSet.getInt("max_id") + 1);
		else
			o.setOrderId(1);
		
		stmt1.setString(1, o.getUserMail());
		stmt1.setString(2, Integer.toString(o.getOrderId()));
		stmt1.setString(3, Integer.toString(o.getStatus()));
		stmt1.setString(4, sdf.format(o.getOrderDate()));
		stmt1.setString(5, o.getDiscount());
		stmt1.setString(6, o.getAddress());

		stmt1.executeUpdate();
		
		for (Product p: c.getItems()) {
			
			String sql2 = "insert into orders_detail (order_id, product_id, amount_product, price_product) values (?, ?, ?, ?)";
			
			stmt2 = cnn.prepareStatement(sql2);
			
			stmt2.setString(1, Integer.toString(o.getOrderId()));
			stmt2.setString(2, Integer.toString(p.getId()));
			stmt2.setString(3, Integer.toString(p.getNumber()));
			stmt2.setString(4, Double.toString(p.getPrice()));
			
			stmt2.executeUpdate();
		}
	
		stmt1.close();
		stmt2.close();
	}
	
	public List<ProductOrders> getOrdersDetail() throws Exception{
		DBContext db = new DBContext();
		Connection cnn = db.getConnection();
		
		String sql = "select order_id,orders_detail.product_id,amount_product,product_name from orders_detail join products on orders_detail.product_id = products.product_id;";
		PreparedStatement stmt = cnn.prepareStatement(sql);
		ResultSet resultSet = stmt.executeQuery();
		List<ProductOrders> lp = new ArrayList<ProductOrders>();
		while (resultSet.next()) {
			ProductOrders p = new ProductOrders(resultSet.getInt("order_id"), resultSet.getInt("product_id"), resultSet.getInt("amount_product"),  resultSet.getString("product_name"));
			lp.add(p);
		}
		stmt.close();
		return lp;
	}
	
	public List<Orders> getOrders(String mail) throws Exception{
		DBContext db = new DBContext();
		Connection cnn = db.getConnection();
		
		String sql = "select orders.order_id, sum(price_product) as amount, order_status,order_date, order_address, user_phone, orders.user_mail, order_discount_code from (orders join orders_detail on orders.order_id = orders_detail.order_id) join account on orders.user_mail = account.user_mail where orders.user_mail = ? group by orders.order_id;";
		PreparedStatement stmt = cnn.prepareStatement(sql);
		stmt.setString(1, mail);
		ResultSet resultSet = stmt.executeQuery();
		
		List<Orders> lo = new ArrayList<Orders>();
		List<ProductOrders> lp = getOrdersDetail();
		while (resultSet.next()) {
			int id = resultSet.getInt("order_id");
			List<ProductOrders> l = lp.stream().filter(order -> order.getOrderId() == id).collect(Collectors.toList());
			
			Orders O = new Orders(id, resultSet.getInt("amount"), resultSet.getInt("order_status"), resultSet.getDate("order_date"), resultSet.getString("order_address"), resultSet.getString("user_phone"), l, resultSet.getString("user_mail"), new Date(System.currentTimeMillis()), resultSet.getString("order_discount_code"));
			lo.add(O);
		}
		
		stmt.close();
		return lo;
	}
}
//select orders.order_id, sum(price_product) as amount, order_status,order_date, order_address, user_phone, orders.user_mail, order_discount_code from (orders join orders_detail on orders.order_id = orders_detail.order_id) join account on orders.user_mail = account.user_mail where orders.user_mail = 'phuc@gmail.com.vn' group by orders.order_id;