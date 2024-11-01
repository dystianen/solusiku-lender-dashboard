<template>
  <span class="loader"></span>
</template>

<style>
.loader {
  width: 80px;
  height: 80px;
  border: 9px solid #fff7f4;
  border-bottom-color: #de4f3f;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
