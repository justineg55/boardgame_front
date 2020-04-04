<template>
    <div class="cardPlayer">
        <img :src="picture">
        <p> {{player.firstName}} ou {{player.pseudo}} a écrasé ses adversaires {{totalWinsPerPlayer}} fois déjà</p>
    </div>
</template>
=
<script>
    import axios from "axios";

    export default {
        name: "CardPlayer",
        props: ["player"],
        data() {
            return{
                totalWinsPerPlayer:0,
                picture:`http://localhost:1991/images/players/${this.player.id}.jpg`
            }

        },
        created() {
            axios.get(`http://localhost:1991/plays/total/players/${this.player.id}`)
                .then(res=> {
                    this.totalWinsPerPlayer = res.data;
                })
            .catch(err=>console.log(err))
        }

    }
</script>

<style scoped>

</style>