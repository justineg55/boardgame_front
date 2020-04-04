<template>
    <div class="players">
        <h1>This is players page</h1>
        <div class="requestplayers">
            <div v-for="player in players" :key="player.id">
                <CardPlayer v-bind:player="player"/>
            </div>
            <!--      <ul id="listeplayers">-->
            <!--        <li v-for="player in players" :key="player.id">-->
            <!--          {{ player.pseudo }}-->
            <!--          <br>{{player.firstName}}-->
            <!--          <br>-->
            <!--        </li>-->
            <!--      </ul>-->
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    //importer les composants qui sont appelées dans cette vue

    import axios from 'axios';
    import CardPlayer from "../components/CardPlayer";

    export default {
        name: 'Players',
        //citer les composants ici
        components: {
            CardPlayer
        },

        //pour créer des variables qu'on appelle ailleurs avec {{nomdelavariable}}
        data() {
            return {
                players: []
            }

        },

        //created() premet de faire une requête au back : l'url a appelé est le endpoints qu'on a besoin pour la requete concernée : à récupérer dans postman
        //.then() attend la réponse de la requête, on récupere la réponse en faisant res.data et on assimile ce résultat à une variable qu'on a créé dans data
        created() {
            axios.get('http://localhost:1991/players')
                .then(res => {
                    this.players = res.data;
                })
                .catch(err => console.log(err));

        }

    }

</script>