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
		<table class="table table-bordered border border-black mt-4">
			<tr>
				<th>Product in cart: ${cart != null ? cart.items.size() : ''}</th>
				<th>Price</th>
				<th>Quantity</th>
				<th>Amount</th>
				<th>Action</th>
			</tr>
			<c:if test="${cart != null }">
			<c:forEach var="product" items="${cart.items }">
				<tr>
					<td>${product.name } <br>ID : ${product.id }</td>
					<td><fmt:formatNumber value="${product.price}" type="currency" currencySymbol="$"></fmt:formatNumber></td>
					<td>
					<div class="container">
						<a href="AddToCartController?id=${product.id }&action=subtract"><button class="px-2 bg-warning">-</button></a>
						<span class="px-2">${product.number }</span>
						<a href="AddToCartController?id=${product.id }&action=add"><button class="px-2 bg-warning">+</button></a>
					</div>
					</td>
					<td><fmt:formatNumber value="${product.price * product.number}" type="currency" currencySymbol="$"></fmt:formatNumber></td>
					<td class="border-0 no-border" style="border: none;">
						<form action="addToCart">
							<input type="hidden" name="action" value="delete">
							<input type="hidden" name="id" value="${product.id }">
							<button class="btn btn-danger">delete</button>
						</form>
					</td>
				</tr>
			</c:forEach>
			</c:if>
			<tr>
				<td colspan="5" class="text-end">Total ${amount }</td>
			</tr>
		</table>
		
		<form action="${empty user ? 'login.jsp' : 'pay'}">
		<div class="row">
			<div class="col-md-5">
				<label class="d-block mb-2">Customer name:</label>
				<label class="d-block mb-2">Customer address:</label>
				<label class="d-block mb-2">Discount code (if any):</label>
			</div>
			<div class="col-md-5">
				<input class="d-block mb-2 w-100" placeholder="Enter name" name="name" ${empty user ? '' : 'value="'.concat(user.usr).concat('" readonly') }>
				<input class="d-block mb-2 w-100" placeholder="Ender address" name="address" ${empty user ? '' : 'required'}>
				<input class="d-block mb-2 w-100" placeholder="Enter discount code" name="discount" ${empty user ? '' : 'required'}>
			</div>
		</div>
		<button class="btn btn-warning text-white mb-4">Submit</button>
		</form>
	</div>
</div>
</body>
</html>

<c:import url="footer.jsp"></c:import>