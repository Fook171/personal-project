package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.ListProductDAO;
import model.Cart;
import model.Product;

/**
 * Servlet implementation class AddToCartController
 */
@WebServlet("/AddToCartController")
public class AddToCartController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddToCartController() {
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
	
	protected void processRequest (HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			response.setContentType("text/html;charset=UTF-8");
			try {
			HttpSession session = request.getSession(true) ;
			String idd = request.getParameter("id") ;
			String action = request.getParameter("action");

			double total = 0;
			if (session.getAttribute("cart") != null) total = ((Cart)session.getAttribute("cart")).getAmount();
			if (action != null && action. equalsIgnoreCase ("add")) {
				if (session.getAttribute("cart") == null) {
				session.setAttribute("cart", new Cart());
				}
				int id = Integer.parseInt(idd);
				Cart c = (Cart)session.getAttribute("cart");
				
				boolean isExist = false;
				for (Product P : c.getItems()) 
					if (P.getId() == id) {
						isExist = true;
						P.setNumber(P.getNumber()+1);
					}
				
				if (!isExist) {
				Product p = new ListProductDAO().getProduct(""+ id);
				c.add(new Product(p.getId(), p.getName (), p.getDescription(), p.getPrice(), p.getSrc(), p.getType(), p.getBrand() , 1));
				}
				total = c.getAmount();
			} else if(action != null && action.equalsIgnoreCase("subtract")) {
				int id = Integer.parseInt(idd);
				Cart c = (Cart)session.getAttribute("cart");
				
				for (Product P : c.getItems()) 
					if (P.getId() == id && P.getNumber() > 1) 
						P.setNumber(P.getNumber()-1);
				total = c.getAmount();
			} else if (action != null && action.equalsIgnoreCase("delete")) {
				int id = Integer.parseInt (idd) ;
				Cart c = (Cart)session.getAttribute("cart");
				c.remove(id);
				total = c.getAmount();
			}

				request.setAttribute("curMenu", "cart");
				request.setAttribute("amount", total);
				RequestDispatcher rd = request.getRequestDispatcher("cart.jsp");
				rd.forward(request, response);
			} catch (Exception ex)
			{
			response.getWriter().println(ex);
			}
			}
}
