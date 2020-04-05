<template>
    <div class="createplayer">
        <h1>Ajouter un joueur </h1>
        <!-- appel de la méthode checkform qui check s'il n'y a pas d'erreur dans les différents champs quand on clique sur le bouton -->
        <form @submit="checkForm">
            <!-- on met en place un v-if pour checker les champs non remplis -->
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
            </p>

            <label for="file">Sélectionner un avatar:</label>
            <!-- le ref est important-->
            <input type="file" id="file" ref="file" name="file" >

            <div>
                <label for="pseudo">Pseudo:</label>
                <!-- on récupère ce qu'il y a d'inscrit dans les champs avec la varibale v-model qu'on déclare dans data et qu'on va utiliser pour créer notre objet player-->
                <input type="text" id="pseudo" name="pseudo" v-model="pseudo">
            </div>
            <div>
                <label for="firstname">Prénom:</label>
                <input type="text" id="firstname" name="firstname" v-model="firstname">
            </div>
            <div class="button">
                <button type="submit">Ajouter un joueur</button>
            </div>

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
        name: "CreatePlayer",
        data() {
            return {
                errors: [],
                pseudo: '',
                firstname: '',
                file: ''
            }
        },
        methods: {
            checkForm: function (e) {
                if (this.$refs.file.files[0] && this.pseudo && this.firstname) {
                    this.addPlayer();
                }

                this.errors = [];

                if (!this.$refs.file.files[0]) {
                    this.errors.push('Avatar requis.');
                }
                if (!this.pseudo) {
                    this.errors.push('Pseudo requis.');
                }
                if (!this.firstname) {
                    this.errors.push('Prénom requis.');
                }
                e.preventDefault();
            },
                addPlayer() {
                    /*init player*/ //attention ce sont les varaibles qu'on récupère des champs avec v-model, les appeler avec le même nom
                    const player = {"firstName": this.firstname, "pseudo": this.pseudo};
                    console.log(player);
                    /* Initialize the form data */
                    let formData = new FormData();
                    /* Add the form data we need to submit */
                    //crée un objet formdata, on construit la structure de l'objet en JSON avec les valeurs que ça contient
                    formData.append('file', this.$refs.file.files[0]);
                    //le .append prend que des string donc il faut convertir l'objet JSON en String
                    formData.append('player', JSON.stringify(player));

                    axios.post('http://localhost:1991/players', formData)
                        .then(() => {
                            this.file = "";
                            this.pseudo = "";
                            this.firstName = "";
                            //on crée un message pour avertir l'utilisateur de la création du joueur ou non
                            Vue.$toast.open({
                                message: 'Joueur créé',
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

</style>