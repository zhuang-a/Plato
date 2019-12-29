<template>
    <div class="total" ref="total" style="margin: 32px">
        <div id="done" v-bind:style="{width:Percentage,height:'8px'}"></div>
    </div>
</template>

<script>
    export default {
        name: "PlatoProgress",
        props:['percent'],
        computed:{
            /**
             * @return {number}
             */
            Percentage(){
                let total=this.$refs.total.style.width;
                return this.props.percent*total
            }
        }
    }
</script>

<style scoped>

</style>