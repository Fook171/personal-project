package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.OrdersDAO;
import model.Cart;
import model.Orders;

/**
 * Servlet implementation class PayController
 */
@WebServlet("/PayController")
public class PayController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PayController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		processRequest(request, response);
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
			try {
				HttpSession session = request.getSession(true);
				if (session.getAttribute("cart") == null) {
				}
				OrdersDAO dao = new OrdersDAO();
				Cart c = (Cart) session.getAttribute("cart");
				String username = request.getParameter("name");
				String discount = request. getParameter ("discount");
				String address = request.getParameter("address");
				Orders d = new Orders(username, 2, discount, address, "", null);
				dao.insertOrder(d, c);
				request.setAttribute("curMenu", "cart");
				response.sendRedirect("list");
			}
			catch (Exception ex) {
				response.getWriter().println(ex);
				ex.printStackTrace();
			}
	}

}
