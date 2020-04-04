<template>
    <div class="home">
      <div class="TopGame">
        <img :src="pictureTopGame">
        Top jeu : {{topGame}}
      </div>

      <div class="topPlayer">
        <img :src="pictureTopPlayer">
        Top joueur : {{topPlayer}}

      </div>
      <div class="TotalPlays">
        Total de parties jouées : {{totalPlays}}
      </div>
      <div class="LastPlayedGames">
        Derniers jeux joués :
        <div class="lastplayedGames" v-for="game in threeLastGames" :key="game.id">

        </div>
        <img :src="pictureLastGame1">
        <img :src="pictureLastGame2">
        <img :src="pictureLastGame3">
      </div>
    </div>
</template>

<script>
    // @ is an alias to /src

    import axios from 'axios';

    export default {
      //pour créer des variables qu'on appelle ailleurs avec {{nomdelavariable}}
        data (){
          return{
            totalPlays: 0,
            topPlayer:'',
            topGame:'',
            threeLastGames:[],
            pictureTopGame:'',
            pictureTopPlayer:'',
            pictureLastGame1:'',
            pictureLastGame2:'',
            pictureLastGame3:''
          }

        },
      //created() premet de faire une requête au back : l'url a appelé est le endpoints qu'on a besoin pour la requete concernée : à récupérer dans postman
      //.then() attend la réponse de la requête, on récupere la réponse en faisant res.data et on assimile ce résultat à une variable qu'on a créé dans data
        created() {
          //récupérer le nombre total de parties jouées
            axios.get('http://localhost:1991/plays/total')
                .then(res=>{
                  this.totalPlays=res.data;
                })
                    .catch(err => console.log(err));

          //récupérer le joueur ayant le plus gagné
            axios.get('http://localhost:1991/players/topPlayer').then(res=> {
              this.topPlayer=res.data.pseudo;
              this.pictureTopPlayer= `http://localhost:1991/images/players/${res.data.id}.jpg`
            }).catch(err => console.log(err));

          //récupérer le jeu le plus joué
          axios.get('http://localhost:1991/games/topGame').then(res=> {
            this.topGame=res.data.name;
            this.pictureTopGame= `http://localhost:1991/images/games/${res.data.id}.jpg`
          }).catch(err => console.log(err));

          //récupérer les 3 derniers jeux joués
          axios.get('http://localhost:1991/games/lastThree').then(res=> {
            this.threeLastGames=res.data;
            this.pictureLastGame1  = `http://localhost:1991/images/games/${res.data[0].id}.jpg`;
            this.pictureLastGame2 = `http://localhost:1991/images/games/${res.data[1].id}.jpg`;
            this.pictureLastGame3  = `http://localhost:1991/images/games/${res.data[2].id}.jpg`;
          }).catch(err => console.log(err));
        }
    }
</script>
