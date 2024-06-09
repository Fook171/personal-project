<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
	<form action ="login">
	<div class="container-fluid">
        <div class="row">
            <div class="col-md-6 d-flex justify-content-center flex-column align-items-center gap-3" style="height:100vh;">
                <h1 class="text-center"><strong>Log in</strong></h1>
                
                <input type="text" placeholder="Enter username or email" class="form-control bg-light rounded w-50" name="username" required>
                <input type="password" placeholder="Enter password" class="form-control bg-light rounded w-50" name="password" required>
                <c:if test="${error != null}">
                	<h6 class="text-danger">${error }</h6>
                </c:if>
                <a href="#" class="text-muted text-decoration-none">Forget your password?</a>
                <div class="form-check">
	            
	            <input type="checkbox" class="form-check-input" id="rememberMe" name="isRemember">
	            <label class="form-check-label" for="rememberMe">Remember me</label>
        		</div>
                <button class="btn btn-danger">LOGIN</button>
                
            </div>
            <div class="col-md-6 d-flex justify-content-center flex-column align-items-center gap-3 bg-dark" style="height:100vh;">
                <h1 class="text-center text-light"><strong>Welcome Back!</strong></h1>
                <p class="text-white">To keep connected with us please login with your personal info</p>
            </div>
        </div>
    </div>
   	</form>
</body>
</html>