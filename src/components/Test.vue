<template>
    <div>
        <h1>亲爱的朋友, 你为何到此?</h1>
        <el-row type="flex" justify="space-around">
            <el-col v-for="tag in tags" :key="tag.title" span=6>

                <el-image fit="contain" style="width: 100%"/>
                <p>{{tag.title}}</p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Test",
        data(){
            return{
                tags:[
                    {title:'了解自我',pic:''},
                    {title:'能力挖掘',pic:''},
                    {title: '职业规划',pic:''}
                ]
            }
        }
    }
</script>

<style scoped>

</style>