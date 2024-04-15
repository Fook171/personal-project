<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
	<footer id="footer" class="bg-warning pt-1 pt-auto">
            <div class="bg-secondary pt-5">
                <div class="bg-dark py-5">
                    <p class="text-warning text-center mb-0">Copyright © 2023 JavaWeb 1849 NEXTECH</p>
                    <p class="text-warning text-center mb-0">Contact Us: <a href="#" class="link-warning text-decoration-none">DUY PHÚC</a> | <a href="#" class="link-warning text-decoration-none">VIỆT HOÀNG</a> | <a href="#" class="link-warning text-decoration-none">TƯỜNG VY</a> | <a href="#" class="link-warning text-decoration-none">HUYỀN NHUNG</a></p>
                </div>
            </div>
    </footer>
</body>
<script>
	document.getElementById("body").style.minHeight = window.innerHeight - document.getElementById("header").offsetHeight - document.getElementById("footer").offsetHeight + "px";
</script>
</html>