<template>
    <div class="createplay">
        <h1>Ajouter une partie</h1>
        <form @submit="checkForm">
            <p class="red" v-if="errors.length">
                <b>Erreur(s) dans le formulaire :</b>
            <ul>
                <li v-bind:key="error" v-for="error in errors">{{ error }}</li>
            </ul>
            </p>
            <div class="form-group">
                <label for="game">Jeu</label><br/>
                <select id="game" v-model="game" name="game" required>
                    <option disabled value="">Choisissez un jeu</option>
                    <option v-bind:key="oneGame.id" v-for="oneGame in games" :value="oneGame.id">{{oneGame.name}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="winner">Vainqueur</label><br/>
                <select id="winner" v-model="winner" name="winner" required>
                    <option disabled value="">Choisissez un joueur</option>
                    <option v-bind:key="onePlayer.id" v-for="onePlayer in players" :value="onePlayer.id">
                        {{onePlayer.firstName}} ({{onePlayer.pseudo}})
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="score">Score maximal</label>
                <input type="number" class="form-control" id="score" v-model="score" name="score" required>
            </div>
            <div class="form-group">
                <label for="date">Date de la partie </label>
                <input type="date" class="form-control" id="date" v-model="date" name="date" required>
            </div>
            <button type="submit" class="btn btn-primary">Créer</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-default.css';

    Vue.use(VueToast);

    export default {
        name: "CreatePlay",
        data() {
            return {
                errors: [],
                games: [],
                players: [],
                score: 0,
                date: '',
                game: '',
                winner: ''

            }
        },
        created() {
            //on doit récupérer la liste de joueurs et de jeux pour afficher dans le menu déroulant
            axios.get('http://localhost:1991/games')
                .then(res => {
                    this.games = res.data;
                })
                .catch(err => console.log(err));
            axios.get('http://localhost:1991/players')
                .then(res => {
                    this.players = res.data;
                })
                .catch(err => console.log(err));
        },
        methods: {
            checkForm: function (e) {
                if (this.game && this.winner && this.score && this.date) {
                    this.addPlayer();
                }
                this.errors = [];
                if (!this.game) {
                    this.errors.push('Le jeu est requis.');
                }
                if (!this.winner) {
                    this.errors.push('Le joueur est requis.');
                }
                if (!this.score) {
                    this.errors.push('Le score est requis.');
                }
                if (!this.date) {
                    this.errors.push('La date est requise.');
                }
                e.preventDefault();
            },
            addPlayer() {
                //on définit l'affichage de notre JSON
                const play = {
                    "game": {
                        "id": this.game
                    },
                    "gameDate": this.date,
                    "player": {
                        "id": this.winner
                    },
                    "score": this.score
                };
                axios.post('http://localhost:1991/plays', play, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(() => {
                        this.game = "";
                        this.date = "";
                        this.winner = "";
                        this.score = "";
                        Vue.$toast.open({
                            message: 'Partie créée',
                            type: 'success'
                        });
                    })
                    .catch(() => {
                        Vue.$toast.open({
                            message: 'Erreur lors de la création',
                            type: 'error'
                        });
                    });
            }
        }
    }
</script>

<style scoped>
    .createplay {
        max-width: 40%;
        margin-top: 2%;
        margin-left: auto;
        margin-right: auto;
        text-align: left;
    }
</style>