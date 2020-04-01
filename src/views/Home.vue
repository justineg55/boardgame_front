<template>
    <div class="home">
      <div class="homerequest">
        Top jeu : {{topGame}}
<!--        <img-->
<!--                src=""-->
<!--                alt="[top jeu]"-->
<!--                height="300px"-->
<!--                width="300px"-->
<!--        />-->
      </div>
      <div class="homerequest">
        Top joueur : {{topPlayer}}
<!--        <img-->
<!--                src=""-->
<!--                alt="[top joueur]"-->
<!--                height="300px"-->
<!--                width="300px"-->
<!--        />-->
      </div>
      <div class="homerequest">
        Total de parties jouées : {{totalPlays}}
      </div>
      <div class="homerequest">
        Derniers jeux joués :
        <div class="lastplayedGames" v-for="game in threeLastGames" :key="game.id">
          {{game.name}}
        </div>
<!--        <img-->
<!--                src=""-->
<!--                alt="[dernier jeu joué]"-->
<!--                height="300px"-->
<!--                width="300px"-->
<!--        />-->
<!--        <img-->
<!--                src=""-->
<!--                alt="[dernier jeu joué]"-->
<!--                height="300px"-->
<!--                width="300px"-->
<!--        />-->
<!--        <img-->
<!--                src=""-->
<!--                alt="[dernier jeu joué]"-->
<!--                height="300px"-->
<!--                width="300px"-->
<!--        />-->
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
            threeLastGames:[]
          }

        },
      //created() premet de faire une requête au back : l'url a appelé est le endpoints qu'on a besoin pour la requete concernée : à récupérer dans postman
      //.then() attend la réponse de la requête, on récupere la réponse en faisant res.data et on assimile ce résultat à une variable qu'on a créé dans data
        created() {
            axios.get('http://localhost:1991/plays/total')
                .then(res=>{
                  this.totalPlays=res.data;
                })
                    .catch(err => console.log(err));

            axios.get('http://localhost:1991/players/topPlayer').then(res=> {
              this.topPlayer=res.data.firstName;
            }).catch(err => console.log(err));

          axios.get('http://localhost:1991/games/topGame').then(res=> {
            this.topGame=res.data.name;
          }).catch(err => console.log(err));

          axios.get('http://localhost:1991/games/lastThree').then(res=> {
            this.threeLastGames=res.data;
          }).catch(err => console.log(err));
        }
    }
</script>
