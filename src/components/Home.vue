<template>
    <div class="homeCont">
        <h1>To Do List</h1>
        <p  
            class="dateTime date"
            v-bind="resetTime()"
        >{{ todayDate }}</p>
        <p  
            class="dateTime time"
            v-bind="resetTime()"
        >{{ todayTime }}</p>
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
            todoList: [],
            todayDate: '',
            todayTime: '',

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

            let indexNum = 0;
            for(let i = 0; i < this.todoList.length; i++) {
                this.todoList[i].index = indexNum
                if( this.todoList.length > 0 ) indexNum++
            }

            this.todoList.push({memo:memo, status:'created', mode:'add', time: this.listTime()/*nowTime*/, importStar:'off', index: indexNum })
        },
        statusControl1(index, status) {
            this.todoList[index].status = status
        },
        listDelete1(index) {
            this.todoList.splice(index, 1)
        },
        listEdit4(index, memo, mode, /*time,*/ display) {
            this.todoList[index].memo = memo
            this.todoList[index].mode = mode
            this.todoList[index].time = this.listTime()

            for(let i = 0; i < this.todoList.length; i++) {
                this.todoList[i].display = display
            }
        },
        resetTime() {
            setInterval(() => {
                //date
                let year = new Date().getFullYear();
                let month = new Date().getMonth();
                let date = new Date().getDate();
                let day = new Date().getDay();
                let week = ['일', '월', '화', '수', '목', '금', '토', ];
                // let week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', ];

                let writeDate = `${year}년  ${month + 1}월  ${date}일  ${week[day]}요일 ` 


                //time
                let ampm = new Date().getHours() < 12 ? '오전' : '오후'
                let hh = (new Date().getHours().toString() % 12) ? new Date().getHours().toString() % 12 : 12
                let mm = new Date().getMinutes().toString()
                let ss = new Date().getSeconds().toString()

                let nowTime = ` ${ampm} ${hh < 10 ? `0${hh}` : hh}시 ${mm < 10 ? `0${mm}` : mm}분 ${ss < 10 ? `0${ss}` : ss}초 `


                this.todayDate = writeDate
                this.todayTime = nowTime
            }, 1000)
        },
        listTime() {
            let ampm = new Date().getHours() < 12 ? '오전' : '오후'
            let hh = (new Date().getHours().toString() % 12) ? new Date().getHours().toString() % 12 : 12
            let mm = new Date().getMinutes().toString()
            let ss = new Date().getSeconds().toString()

            return this.nowTime = ` ${ampm} ${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${ss < 10 ? `0${ss}` : ss} `
        }
    }
}

</script>

<style scoped>
.homeCont{ border:4px solid #353434; width:500px; height:700px; padding:20px; background-color:rgb(250, 238, 217); position:absolute; top:100px; left:50%; transform:translateX(-50%); }
h1{ border-bottom:4px solid #353434; margin-bottom:20px; text-align:center; font-size:50px; }
.dateTime{ font-size:13px; font-weight:600; display:inline-block; position:absolute; bottom:20px; }
.dateTime.date{ left:40px; }
.dateTime.time{ right:40px; }
#text{ outline:1px solid blue; }
p{ text-align:center; }
.listbox{  width:90%; margin:20px auto 40px; }
</style>