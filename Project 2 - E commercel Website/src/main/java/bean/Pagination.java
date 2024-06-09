package bean;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.ListProductDAO;
import model.Product;

/**
 * Servlet implementation class Pagination
 */
@WebServlet("/Pagination")
public class Pagination extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Pagination() {
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
			String pageStr = request.getParameter("page");
			int curPage = Integer.parseInt(pageStr);
			String search = request.getParameter("search");
			String curType = request.getParameter("curType");
			List<Product> ls;
			List<String> typeLs;
			try {
				ls = new ListProductDAO().search ("", "any");
				typeLs = new ListProductDAO().getTypeList();
				request.setAttribute("products", ls);
				request.setAttribute("typeList", typeLs);
				request.setAttribute("curPage", curPage);
				request.setAttribute("search", search);
				request.setAttribute("curType", curType);
				request.setAttribute("curMenu", "home");
				RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
		        rd.forward(request, response);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
	}
			

}
