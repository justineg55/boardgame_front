<template>
    <div class="games">
        <h1>This is games page</h1>
        <div class="requestgames">
            <ul id="listegames">
                <!-- on doit parcourir la liste games qui contient la liste d'objets game en format json, on appelle une colonne de la bdd en faisant game.nomcolonne !-->
                <li v-for="game in games" :key="game.id">
                    {{ game.name }}
                    <br> Durée moyenne : {{game.averageTimePlayed}} minutes
                    <br> Nombre de joueurs : {{game.minNbPlayers}} - {{game.maxNbPlayers}} joueurs
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                games: []
            }

        },
        //created() premet de faire une requête au back : l'url a appelé est le endpoints qu'on a besoin pour la requete concernée : à récupérer dans postman
        //.then() attend la réponse de la requête, on récupere la réponse en faisant res.data et on assimile ce résultat à une variable qu'on a créé dans data
        created() {
            axios.get('http://localhost:1991/games')
                .then(res => {
                    this.games = res.data;
                })
                .catch(err => console.log(err));
        }
    }
</script>

<style scoped>

</style>