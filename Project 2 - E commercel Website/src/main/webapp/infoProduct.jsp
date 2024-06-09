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
	<div class="container border-bottom border-3 mt-3 mb-5"><h3 class="text-secondary">${product.name }</h3></div>
	<div class="container mb-5">
		<div class="row">
			<img class="col-md-4 mb-4" src="${product.src}">
			<div class="col-md-8">
				<div class="text-danger display-6 mb-3"><fmt:formatNumber value="${product.price * 24230}" type="currency" currencySymbol="VNĐ" pattern="#,##0 ¤"></fmt:formatNumber></div>
				<pre class="text-secondary">Product Description: ${product.description}</pre>
				<form action="addToCart">
					<input type="hidden" name="action" value="add">
					<input type="hidden" name="id" value="${product.id }">
					<button class="btn btn-warning text-white">Add to cart</button>
				</form>
			</div>
		</div>
	</div>
</div>
</body>
</html>

<c:import url="footer.jsp"></c:import>