<script setup>
const { status } = defineProps(['status'])
</script>

<template>
    <div v-show="status" style="z-index: 999;"
        class="z-50 absolute  bg-cover  bg-center backdrop-blur-3xl backdrop-filter backdrop-grayscale backdrop-saturate-150 backdrop-opacity-50 h-screen w-screen flex items-center justify-center">
        <div class="flex flex-col items-center space-y-3">
            <div class="loader"></div>
            <div class="loader2"></div>
            <!-- <span class="mt-6 text-3xl text-black font-bold">Loading...</span> -->
        </div>
    </div>
</template>



<style scoped>
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  color: #6b0303;
  background: radial-gradient(farthest-side, currentColor calc(100% - 6px),#0000 calc(100% - 5px) 0);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 13px),#000 calc(100% - 12px));
  border-radius: 50%;
  animation: l19 2s infinite linear;
}
.loader::before,
.loader::after {    
  content: "";
  grid-area: 1/1;
  background:
    linear-gradient(currentColor 0 0) center,
    linear-gradient(currentColor 0 0) center;
  background-size: 100% 10px,10px 100%;
  background-repeat: no-repeat;
}
.loader::after {
   transform: rotate(45deg);
}

@keyframes l19 { 
  100%{transform: rotate(1turn)}
}



/* HTML: <div class="loader"></div> */
.loader2 {
  font-weight: bold;
  font-family: sans-serif;
  font-size: 30px;
  animation: l1 1s linear infinite alternate;
}
.loader2:before {
  content:"Loading..."
}
@keyframes l1 {to{opacity: 0}}


</style>