package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.AccountDAO;
import model.Account;

/**
 * Servlet implementation class RegisterController
 */
@WebServlet("/RegisterController")
public class RegisterController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegisterController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		processRequest(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	
	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException { 
			response.setContentType("text/html;charset=UTF-8");
			request.setCharacterEncoding("utf-8");
			
			String regexMail = "^[A-Z0-9_a-z]+@[A-Z0-9\\.a-z]+\\.[A-Za-z]{2,6}$"; 
			String regex = "[a-zA-Z0-9_!@#$%^&*]+";
			
			String email = request.getParameter("email");
			String password = request.getParameter("password");
			int role = Integer.parseInt(request.getParameter("role"));
			String name = request.getParameter("name");
			String address = request.getParameter("address");
			String phone = request.getParameter("phone");
			
			if (!email.matches(regexMail) || !password.matches(regex)) {
				request.setAttribute("error", "Invalid syntax");
				RequestDispatcher rd = request.getRequestDispatcher("register.jsp");
				rd.forward(request, response);
			} else {
				try {
					Account a = new AccountDAO().search(email);
					if (a != null) {
						request.setAttribute("error", "Email already exists");
						RequestDispatcher rd = request.getRequestDispatcher("register.jsp");
						rd.forward(request, response);
					} else {
						a = new Account(email, password, role, name, address, phone);
						new AccountDAO().insert(a);
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			request.setAttribute("curMenu", "home");
			response.sendRedirect("list");
	}
}
