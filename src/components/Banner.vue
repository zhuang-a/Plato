<template>
    <div class="cover" style="width: 100%;height: 50vh;
    transform: scale(0.8) translateY(6vh) translateX(-32vw) rotate(-30deg)">
        <div class="row" style="position: relative">
            <div class="book" ref="book" v-for="book in row1" :key="book.key" style="position: absolute"
                 :style="{transform:'translateY('+book.translateY+') translateX('+book.translateX+') rotate('+book.rotate+') ',
                 transformOrigin:book.origin,
                 height:'32vw',
                 width:'20vw',
                 backgroundSize:'cover',
                 backgroundImage:'url('+book.url+')'}">
            </div>
        </div>
        <div ref="book" class="row" style="position: relative">
            <div class="book" v-for="book in row2" :key="book.key" style="position: absolute"
                 :style="{transform:'translateY('+book.translateY+') translateX('+book.translateX+') rotate('+book.rotate+')',
                 transformOrigin:book.origin,
                 height:'32vw',
                 width:'20vw',
                 backgroundSize:'cover',
                 backgroundRepeat:'no-repeat',
                 backgroundImage:'url('+book.url+')'}">
            </div>
        </div>
    </div>
</template>

<script>
    import anime from "animejs";
    export default {
        name: "Banner",
        data(){
            return{
                row1:[
                    {key:1,url:require('../assets/book/加利福尼亚-12.png'),translateX:'0%',translateY:'0%',rotate:'0deg',origin:'center'},
                    {key:2,url:require('../assets/book/艾森克-12.png'),translateX:'2vw',translateY:'0',rotate:'90deg',origin:'right bottom'},
                    {key:3,url:require('../assets/book/霍兰德-12.png'),translateX:'56vw',translateY:'20vw',rotate:'0deg',origin:'center'},
                    {key:4,url:require('../assets/book/尤金-12.png'),translateX:'78vw',translateY:'6vw',rotate:'60deg',origin:'left bottom'},
                    {key:5,url:require('../assets/book/思维-12.png'),translateX:'116vw',translateY:'48vw',rotate:'0deg',origin:'center'}
                ],
                row2:[
                    {key:1,url:require('../assets/book/全脑-12.png'),translateX:'0',translateY:'-100%',rotate:'90deg',origin:'bottom left'},
                    {key:2,url:require('../assets/book/嚯根-12.png'),translateX:'34vw',translateY:'0%',rotate:'0deg',origin:'center'},
                    {key:3,url:require('../assets/book/opq-12.png'),translateX:'56vw',translateY:'-12vw',rotate:'90deg',origin:'bottom left'},
                    {key:4,url:require('../assets/book/哈里森-12.png'),translateX:'90vw',translateY:'20vw',rotate:'0deg',origin:'center'}
                ]
            }
        },
        created() {

            let a=anime({
                targets:'.book',
                opacity:0,
                autoplay:false
            });
            a.play()
        }
    }
</script>

<style scoped>
    .row{
        width: 100%;
        height: 34vw;
    }
</style>