<template>
    <div class="homeCont">
        <h1>To Do List</h1>
        <p>전체 할일:{{ todoList.length }} / 완료된 할일:{{ countDone }} / 남은 할일:{{ todoList.length - countDone }} </p>
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
        }
    },
    methods: {
        listAdd11(memo) {
            console.log('받았어!');
            
            this.todoList.push({memo:memo, status:'created', mode:'add'})
        },
        statusControl1(index, status) {
            this.todoList[index].status = status
        },
        listDelete1(index) {
            this.todoList.splice(index, 1)
        },
        listEdit4(index, memo, mode) {
            this.todoList[index].memo = memo
            this.todoList[index].mode = mode
        }
    }
}

</script>

<style scoped>
.homeCont{ border:4px solid #353434; width:500px; padding:20px; background-color:rgb(250, 238, 217); }
h1{ text-align:center; }
p{ text-align:center; }
.listbox{  width:90%; margin:40px auto; }
</style>