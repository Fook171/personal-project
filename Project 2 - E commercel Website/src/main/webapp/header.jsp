<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
	<title>${param.title}</title>
	<meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
	<div id="header">
	<header class="container-fluid bg-dark">
            <div class="row px-5">
                <div class="col-md-2 col-sm-12 py-5 text-center">
                    <h2 class="d-flex justify-content-center mb-0 text-light">NEXTECH</h2>
                    <p class="mb-0 text-info">Welcome ${user == null ? 'to Nextech' : user.name}</p>
                </div>
                <div class="col-md-10 col-sm-12 d-flex align-items-center justify-content-center pb-4">
                    <form action="search" class="d-flex align-items-stretch d w-75">
                        <select class="form-select rounded-0 w-25" name="curType">
                        	<option value="any" ${curType eq 'any' ? 'selected' : ''}>Categories</option>
                           	<c:forEach var="t" items="${typeList}">
                           		<option value="${t}"  ${curType eq t ? 'selected' : ''}>${t}</option>
                           	</c:forEach>
                        </select>
                        
                        <input type="text" class="w-75 rounded-0" placeholder="What are you looking for?" value="${search}" name="search">
                        <button type="submit" class="btn btn-warning rounded-0">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>                    
                </div>
            </div>
     </header>
     <nav class="container-fluid navbar navbar-expand-lg navbar-dark bg-secondary">
            <!-- <div class="container-fluid"> -->
            	<button class="navbar-toggler mx-auto" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            		<span class="navbar-toggler-icon"></span>
        		</button>
              <div class="collapse navbar-collapse justify-content-between px-3" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link link-white ${curMenu == 'home' ? 'bg-warning link-light' : ''} px-3" href="list">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link link-white ${curMenu == 'cart' ? 'bg-warning link-light' : ''} px-3" href="addToCart">Cart</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link link-white ${curMenu == 'orders' ? 'bg-warning link-light' : ''} px-3" href="ordersDetail">Orders</a>
                  </li>
                </ul>
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a id="log" class="nav-link link-white px-3" href="${user == null ? 'login.jsp' : 'logout'}">${user == null ? 'Login' : 'Logout'}</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link link-white px-3" href="register.jsp">Register</a>
                  </li>
                </ul>
              </div>
              <c:if test="${user != null && cart.items.size() > 0}">
              <script>
              document.getElementById("log").addEventListener("click", function(event) {
            	  	event.preventDefault();
            	    alert("Please submit or clear your orders before logging out.");
            	});
              </script>
              </c:if>
     </nav>
     
	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
	</div>
</body>
</html>