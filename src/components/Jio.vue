<template>
    <div class="foot">
        <el-row type="flex" justify="space-around">
            <el-col span="6" >
                <img src="../assets/foot-icon.png" width="180px">
            </el-col>
            <el-col span="12" style="display: flex;justify-content: center;
            align-items: center;">
                <div style="width: 100%;font-size: 24px">
                    <p style="margin-bottom: 32px">更多产品</p>
                    <div class="box">
                        <el-link v-for="product in products" :key="product.id">
                            {{product.name}}
                        </el-link>
                    </div>
                </div>

            </el-col>
            <el-col span="6">
                <img src="../assets/qr.png" alt="">
            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "Jio",
        data(){
            return {
                products:[
                    {id:1,name:'TRIZ理论',url:''},
                    {id:2,name:'结构化思维',url:''},
                    {id:3,name:'感性工学',url:''},
                    {id:4,name:'思维导图',url:''},
                    {id:5,name:'QFD教学应用',url:''},
                    {id:6,name:'层次分析设计评价',url:''},
                ]
            }
        },

    }
</script>

<style scoped>
    .box{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .foot{
        background-color: white;
        background-image: url("../assets/foot.svg");
        background-repeat: no-repeat;
        padding-top: 80px;
    }
</style>