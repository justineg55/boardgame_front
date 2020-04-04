<template>
    <div class="cardGame">
        <div>
            <!-- on récupère l'image avec un :src -->
            <img :src="picture">
            <p> {{game.name}}</p>
            <p> {{game.minNbPlayers}} - {{game.maxNbPlayers}} joueurs </p>
            <p> Environ {{game.averageTimePlayed}} minutes </p>
            <p> Sorti {{nbPlaysForAGame}} fois de la ludothèque</p>
            <p> Top score : {{topScoreForAGame}}</p>
            <p> Celui qui déchire tout à ce jeu : {{topPlayerForAGame.pseudo}}<br> Il a gagné {{topPlayerForAGame.nbWins}} fois</p>
        </div>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "CardGame",
        //props : une donnée reçue d'un autre composant
        props: ["game"],
        data() {
            return {
                //on récupère l'image enregistrée via l'id du jeu
                picture: `http://localhost:1991/images/games/${this.game.id}.jpg`,
                nbPlaysForAGame:0,
                topScoreForAGame:0,
                topPlayerForAGame:{pseudo:"",nbWins:0}

            }
        },
        created() {
            //récupérer le nombre de parties pour un jeu
            axios.get(`http://localhost:1991/plays/total/${this.game.id}`)
                .then(res => {
                    this.nbPlaysForAGame = res.data;
                })
                .catch(err => console.log(err));

            //récupérer le meilleur score pour un jeu
            axios.get(`http://localhost:1991/plays/topScore/${this.game.id}`)
                .then(res => {
                    this.topScoreForAGame = res.data;
                })
                .catch(err => console.log(err));

            //récupérer le joueur qui a le plus gagné pour un jeu et son nombre de victoire pour le jeu : requête qui sort 2 résultats
            //pas de gestion des égalités
            axios.get(`http://localhost:1991/plays/topPlayer/${this.game.id}`)
                .then(res => {
                    //on récupère le nombre de victoires
                    this.topPlayerForAGame.nbWins = res.data.nbVictory;
                    //on fait une deuxième requete en récupérant l'id du joueur qui gagne le plus dans le résultat de la requete précédente et on fait un find by id dans la liste de joueurs pour récupérer son pseudo
                    axios.get(`http://localhost:1991/players/${res.data.winnerId}`)
                        .then(res => {
                            this.topPlayerForAGame.pseudo = res.data.pseudo;
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));

        }
    }
</script>

<style scoped>

</style>