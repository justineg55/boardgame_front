<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link> <span class="sr-only">(current)</span>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/players">Players</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/games">Games</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Admin
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item"   to="/createplay">Create a play</router-link>
              <router-link class="dropdown-item" to="/creategame">Create a game</router-link>
              <router-link class="dropdown-item" to="/createplayer">Create a player</router-link>
            </div>
          </li>
        </ul>
      </div>
    </nav>


<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/players">Players</router-link> |-->
<!--      <router-link to="/games">Games</router-link> |-->
<!--      <router-link to="/createplay">Create a play</router-link> |-->
<!--      <router-link to="/creategame">Create a game</router-link> |-->
<!--      <router-link to="/createplayer">Create a player</router-link>-->
<!--    </div>-->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
