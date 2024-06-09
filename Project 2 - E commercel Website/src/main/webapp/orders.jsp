<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
    
<c:import url="header.jsp">
	<c:param name="title" value="NEXTECH"></c:param>
</c:import>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
<div id="body">
	<div class="container">
	<c:choose>
	<c:when test="${user != null }">
		<table class="table table-bordered border border-black mt-4">
				<tr>
					<th>Order id</th>
					<th>Order date</th>
					<th>Product list (quantity)</th>
					<th>Total</th>
					<th>Address</th>
				</tr>
				<c:if test="${orders != null }">
				
					<c:forEach var="order" items="${orders }">
						<tr>
							<td>${order.orderId}</td>
							<td>${order.orderDate}</td>
							<td> 
								<c:set var="i" value="0"></c:set>
								<c:forEach var="product" items="${order.lp }">
									${product.nameProduct} (${product.amountProduct})<c:if test="${i < order.lp.size()-1 }">, </c:if>
									<c:set var="i" value="${i+1 }"></c:set>
								</c:forEach>
							</td>
							<td>${order.price}</td>
							<td>${order.address}</td>
						</tr>
					</c:forEach>
				</c:if>
		</table>
	</c:when>
	<c:when test="${user == null }">
		<h5 class="text-danger mt-5 mb-5 pl-5">Please log in to see your orders</h5>
	</c:when>
	</c:choose>
	
	</div>
</div>
</body>
</html>

<c:import url="footer.jsp"></c:import>