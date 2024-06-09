<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<c:import url="header.jsp">
	<c:param name="title" value="NEXTECH"></c:param>
</c:import>

<c:set var="maxProNumPerPage" value="6"></c:set>
<c:set var="numProducts" value="${products.size()}"></c:set>

<c:set var="maxPage" value="${numProducts / maxProNumPerPage}"></c:set>
<c:set var="maxPage" value="${maxPage+(1-(maxPage%1))%1}"></c:set>
<c:set var="first" value="${maxProNumPerPage * (curPage - 1) }"></c:set>
<c:set var="last" value="${curPage == maxPage ? (numProducts - 1) : (first + maxProNumPerPage - 1)}"></c:set>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
<div id="body">
	<c:choose>
	<c:when test="${numProducts > 0}">
	<div class="container-fluid">
       <div class="row m-2">
       	<c:forEach var="i" begin="${first}" end="${last}" step="1">
            <a class="col-md-3 col-sm-4 m-3 p-3 h-100 border border-dark text-decoration-none" href="InformationProductController?id=${products[i].id}">
                <img src="${products[i].src}" alt="${products[i].brand}" class="img-fluid w-75 h-75">
                <span class="text-secondary d-block"><c:out value="${fn:toUpperCase(products[i].type)}"></c:out></span>
                <span class="mb-0 text-muted d-block"><c:out value="${products[i].name}"></c:out></span>
                <span class="text-danger"><fmt:formatNumber value="${products[i].price}" type="currency" currencySymbol="$"></fmt:formatNumber></span>
            </a>
         </c:forEach>  
     	</div>
    </div>
    </c:when>
    
    <c:when test="${numProducts == 0}">
    	<div class="container">
    	<h5 class="text-danger mt-5 mb-5 pl-5">No suitable products found</h5>
    	</div>
    </c:when>
    </c:choose>
    
    <c:if test="${maxPage > 1}">
    <div class="container">
        <ul class="pagination">
          
          <li class="page-item mx-2"><a class="page-link rounded-circle" href="Pagination?page=${curPage-1}&search=${search}&curType=${curType}" ${curPage > 1 ? '' : 'style="visibility: hidden;"'}>«</a></li>

          <c:forEach var="i" begin="1" end="${maxPage}" step="1">
          	<li class="page-item mx-2"><a class="page-link rounded-circle ${i == curPage ? 'bg-warning text-white' : ''}" href="Pagination?page=${i}&search=${search}&curType=${curType}">${i}</a></li>
          </c:forEach>

        <li class="page-item mx-2"><a class="page-link rounded-circle" href="Pagination?page=${curPage+1}&search=${search}&curType=${curType}" ${curPage < maxPage ? '' : 'style="visibility: hidden;"'}>»</a></li>
          
        </ul>
    </div>
    </c:if>
    </div>
</body>
</html>

<c:import url="footer.jsp"></c:import>