package context;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBContext {
	public Connection getConnection()throws Exception {
		String url = "jdbc:mysql://"+serverName+":"+portNumber + "/" + dbName + "?instanceName=" + instance;
		if(instance == null || instance.trim().isEmpty())
			url = "jdbc:mysql://"+serverName+":"+portNumber + "/" + dbName;
		Class.forName("com.mysql.jdbc.Driver");
		return DriverManager. getConnection(url, userID, password);
		}
		
		private final String serverName = "localhost"; //127.0.0.1
		private final String dbName = "ShoppingDB";
		private final String portNumber = "3306";
		private final String instance="";
		private final String userID = "root";
		private final String password = "phucnguyen123";
}
