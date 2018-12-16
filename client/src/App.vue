<template>
  <div id="app">
    <b-container class="fluid" fluid>
    <router-view/>
    </b-container>
  </div>
</template>

<style>
.fluid {
  padding-left: 30px !important;
  padding-right: 30px !important;
  padding-top:30px;
}
#app {
  font-family: 'Helvetica', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
