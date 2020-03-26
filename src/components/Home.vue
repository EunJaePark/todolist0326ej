<template>
    <div class="homeCont">
        <h1>To Do List</h1>
        <p ref="date"></p>
        <p>총: {{ todoList.length }} | 완료: {{ countDone }} | 남은 할 일: {{ todoList.length - countDone }} </p>
        <div class="listbox">
            <ListAdd
                @listAdd1 = "listAdd11"
                @listEdit3 = "listEdit4"
            />
        </div>
        <div class="listbox">
            <List
                :todoList = "todoList"
                @statusControl = "statusControl1"
                @listDelete = "listDelete1"
            />
        </div>

    </div>
</template>

<script>
import List from './List.vue'
import ListAdd from './ListAdd.vue'

export default{
    components: {
        List,
        ListAdd
    },
    data() {
        return {
            todoList: []
        }
    },
    computed: {
        countDone() {
            let count = 0
            this.todoList.forEach( list => {
                if( list.status === 'done' ) count++
            } )
            return count
        },
        
    },
    methods: {
        listAdd11(memo) {
            console.log('받았어!');

            // let nowTime = `(${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()} : ${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()})`

            let ampm = new Date().getHours() < 12 ? '오전' : '오후'
            let hh = (new Date().getHours().toString() % 12) ? new Date().getHours().toString() % 12 : 12
            let mm = new Date().getMinutes().toString()
            let ss = new Date().getSeconds().toString()

            let nowTime = ` ${ampm} ${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${ss < 10 ? `0${ss}` : ss} `
            
            this.todoList.push({memo:memo, status:'created', mode:'add', time: nowTime })
        },
        statusControl1(index, status) {
            this.todoList[index].status = status
        },
        listDelete1(index) {
            this.todoList.splice(index, 1)
        },
        listEdit4(index, memo, mode, time) {
            this.todoList[index].memo = memo
            this.todoList[index].mode = mode


            // let nowTime = `(${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()} : ${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()})`

            let ampm = new Date().getHours() < 12 ? '오전' : '오후'
            let hh = (new Date().getHours().toString() % 12) ? new Date().getHours().toString() % 12 : 12
            let mm = new Date().getMinutes().toString()
            let ss = new Date().getSeconds().toString()

            let nowTime = ` ${ampm} ${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${ss < 10 ? `0${ss}` : ss} `

            this.todoList[index].time = nowTime
        },
        today() {
            // this.todoList.push(new Date().getFullYear())

            this.$refs.date.innerHTML = `new Date().getFullYear()`
        }
    }
}

</script>

<style scoped>
.homeCont{ border:4px solid #353434; width:500px; height:700px; padding:20px; background-color:rgb(250, 238, 217); position:absolute; top:100px; left:50%; transform:translateX(-50%); }
h1{ border-bottom:4px solid #353434; margin-bottom:20px; text-align:center; font-size:50px; }
.dateTime{ outline:1px solid red; width:100%; display:inline-block; }
#text{ outline:1px solid blue; }
p{ text-align:center; }
.listbox{  width:90%; margin:20px auto 40px; }
</style>