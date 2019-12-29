<template>
    <div class="number-grow-warp">
        <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
        <span>人访问了本网站</span>
    </div>
</template>

<script>
    const AV=require('leancloud-storage');
    export default {
        data() {
            return{
                time: 2,
                value: 0,
            }
        },
        methods: {
            numberGrow (ele) {
                let _this = this

                let step = (_this.value * 10) / (_this.time * 1000)
                let current = 0
                let start = 0
                let t = setInterval(function () {
                    start += step
                    if (start > _this.value) {
                        clearInterval(t)
                        start = _this.value
                        t = null
                    }
                    if (current === start) {
                        return
                    }
                    current = start
                    ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                }, 10)
            }
        },
        created() {
            let vm=this;
            const init=new AV.Query('Plato')
            init.get('5e00604b5620710093de0fa5').then(function (plato) {
                // eslint-disable-next-line no-console
                console.log(plato)
                vm.value=plato.get('personNum')
                vm.time=vm.value/100
                // eslint-disable-next-line no-console
                console.log(vm.value)
                this.numberGrow(vm.$refs.numberGrow)
            });
        }
    }
</script>

<style>
    .number-grow-warp{
        transform: translateZ(0);
    }
    .number-grow {
        font-size: 64px;
        color: #ffaf00;
        margin:110px 0 20px;
        line-height:64px;
    }
</style>