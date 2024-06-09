<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<title>Sign up</title>
	<meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
	<div class="container-fluid">
        <div class="row">
            <form action="register" class="col-md-6 d-flex justify-content-center flex-column align-items-center gap-3" style="height:100vh;">
                <h1 class="text-center"><strong>Register</strong></h1>
                <input type="text" placeholder="Enter email" class="form-control bg-light rounded w-50" name="email" required>
                <input type="password" placeholder="Enter password" class="form-control bg-light rounded w-50" name="password" required>
                <select class="form-select bg-body rounded w-50" name = "role">
                	<option disabled selected value="">Select role</option>
                	<option value="1">admin</option>
                	<option value="0">user</option>
                </select>
                <input type="text" placeholder="Enter username" class="form-control bg-light rounded w-50" name="name" required>
                <input type="text" placeholder="Enter address" class="form-control bg-light rounded w-50" name="address" required>
                <input type="text" placeholder="Enter phone" class="form-control bg-light rounded w-50" name="phone" required>
                <c:if test="${error != null}">
                	<h6 class="text-danger">${error }</h6>
                </c:if>
                <button class="btn btn-danger">REGISTER</button>
            </form>
            <div class="col-md-6 d-flex justify-content-center flex-column align-items-center gap-3 bg-dark" style="height:100vh;">
                <h1 class="text-center text-light"><strong>Welcome Back!</strong></h1>
                <p class="text-white">To keep connected with us please login with your personal info</p>
            </div>
        </div>
    </div>
</body>
</html>