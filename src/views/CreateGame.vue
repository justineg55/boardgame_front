<template>
    <div class="creategame">
        <h1>This is creategame</h1>
        <form @submit="checkForm">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
            </p>
            <div class="form-group">
                <label for="image">Image du jeu</label>
                <input type="file" class="form-control-file" id="image" name="image" ref="image" required>
            </div>
            <div class="form-group">
                <label for="name">Nom</label>
                <input type="text" class="form-control" id="name" v-model="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="minNbPlayers">Nombre de joueurs minimum</label>
                <input type="number" class="form-control" id="minNbPlayers" v-model="minNbPlayers" name="minNbPlayers"
                       min="1" required>
            </div>
            <div class="form-group">
                <label for="maxNbPlayers">Nombre de joueurs maximum</label>
                <input type="number" class="form-control" id="maxNbPlayers" v-model="maxNbPlayers" name="maxNbPlayers"
                       min="1" required>
            </div>
            <div class="form-group">
                <label for="averageTimePlayed">Durée moyenne d'une partie (minutes)</label>
                <input type="number" class="form-control" id="averageTimePlayed" v-model="averageTimePlayed"
                       name="averageTimePlayed" required>
            </div>
            <button type="submit" class="btn btn-primary">Créer</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    //les toasters permettent d'émettre un message à l'utilisateur
    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-default.css';
    Vue.use(VueToast);
    export default {
        name: "CreateGame",
        data() {
            return {
                errors: [],
                image: "",
                name: "",
                minNbPlayers: 0,
                maxNbPlayers: 0,
                averageTimePlayed: 0
            }

        },
        methods: {
            checkForm: function (e) {
                if (this.$refs.image.files[0] && this.name && this.minNbPlayers && this.maxNbPlayers && this.averageTimePlayed) {
                    this.addPlayer();
                }
                this.errors = [];
                if (!this.$refs.image.files[0]) {
                    this.errors.push('Avatar requis.');
                }
                if (!this.name) {
                    this.errors.push('Nom requis.');
                }
                if (!this.minNbPlayers) {
                    this.errors.push('Nombre minimum de joueurs requis.');
                }
                if (!this.maxNbPlayers) {
                    this.errors.push('Nombre maximum de joueurs requis.');
                }
                if (!this.averageTimePlayed) {
                    this.errors.push('Durée moyenne d\'une partie requise.');
                }
                e.preventDefault();
            },
            addPlayer() {
                const game = {
                    "averageTimePlayed": this.averageTimePlayed,
                    "maxNbPlayers": this.maxNbPlayers,
                    "minNbPlayers": this.minNbPlayers,
                    "name": this.name
                };
                let formData = new FormData();
                formData.append('file', this.$refs.image.files[0]);
                formData.append('game', JSON.stringify(game));
                axios.post('http://localhost:1991/games', formData)
                    .then(() => {
                        this.image = "";
                        this.averageTimePlayed = "";
                        this.maxNbPlayers = "";
                        this.minNbPlayers = "";
                        this.name = "";
                        Vue.$toast.open({
                            message: 'Jeu créé',
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
    .creategame {
        max-width: 40%;
        margin-top: 2%;
        margin-left: auto;
        margin-right: auto;
        text-align: left;
    }
</style>