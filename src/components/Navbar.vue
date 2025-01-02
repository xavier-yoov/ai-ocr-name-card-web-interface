<script setup lang="ts">
import {onMounted} from "vue";

import YoovLogo from "@/assets/yoov_logo.png";

onMounted(()=>{
  console.log("Navbar mounted")
})

</script>

<template>
  <nav class="navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img :src="YoovLogo" alt="YOOV Logo" class="d-inline-block align-text-top">
      </a>
<!--      <button class="navbar-toggler border-0 p-0 m-0 rounded-circle"-->
<!--              style="width: 50px; height: 50px;"-->
<!--              type="button"-->
<!--              data-bs-toggle="offcanvas"-->
<!--              data-bs-target="#navbarSupportedContent"-->
<!--              aria-controls="offcanvasNavbar"-->
<!--              aria-expanded="false"-->
<!--              aria-label="Toggle navigation">-->
<!--        <span class="navbar-toggler-icon"></span>-->
<!--      </button>-->
<!--      <div class="offcanvas offcanvas-end" id="offcanvasNavbar">-->
<!--        <ul class="navbar-nav me-auto mb-2 mb-lg-0">-->
<!--          <li class="nav-item">-->
<!--            <a class="nav-link active" aria-current="page" href="#">Home</a>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <a class="nav-link" href="#">Link</a>-->
<!--          </li>-->
<!--          <li class="nav-item dropdown">-->
<!--            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">-->
<!--              Dropdown-->
<!--            </a>-->
<!--            <ul class="dropdown-menu">-->
<!--              <li><a class="dropdown-item" href="#">Action</a></li>-->
<!--              <li><a class="dropdown-item" href="#">Another action</a></li>-->
<!--              <li><hr class="dropdown-divider"></li>-->
<!--              <li><a class="dropdown-item" href="#">Something else here</a></li>-->
<!--            </ul>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <a class="nav-link disabled" aria-disabled="true">Disabled</a>-->
<!--          </li>-->
<!--        </ul>-->
<!--        <form class="d-flex" role="search">-->
<!--          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">-->
<!--          <button class="btn btn-outline-success" type="submit">Search</button>-->
<!--        </form>-->
<!--      </div>-->
    </div>
  </nav>
</template>

<style scoped>
.navbar .navbar-brand img{
  width: 8rem;
  max-width: 200px;
}
</style>
