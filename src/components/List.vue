<template>
    <div class="listBox">
        <div 
            class="todoListBox"
            v-for="(list, index) in todoList"
            :key="index"
        >
            <p class="num">{{ `${index + 1 }.` }}</p>
            <p 
                :class="{'done':list.status === 'done'}"
            >{{ list.memo }}</p>
            <!-- <p>{{ list.status }}</p> -->

            <div class="btns">
                <button
                    v-if="list.status === 'created'"
                    @click="$emit('statusControl', index, 'done')"
                >완료</button>
                <button
                    v-else
                    @click="$emit('statusControl', index , 'created')"
                >부활</button>
                <button
                    @click="$emit('listDelete', index)"
                >제거</button>
                <button
                    :class="{'none': list.none === 'none'}"
                    v-if="list.status === 'created' && list.mode === 'add' || list.none === null"
                    @click="listEdit1(list.memo, index, 'edit')"
                >수정</button>
            </div>
        </div>
    </div>  
</template>

<script>
import { eventBusEdit } from '../main'

export default {
    props: [ 'todoList' ],
    methods: {
        listEdit1(memo, index, mode, none) {
            eventBusEdit.listEdit(memo, index, mode)
            this.todoList[index].mode = mode

            for(let i = 0; i < this.todoList.length; i++) {
                this.todoList[i].none = 'none'
            }
        }
    }
}
</script>

<style scoped>
.listBox{  width:100%; height:250px; display:inline-block; overflow:scroll; }
.todoListBox{ border-bottom:2px solid #353434; padding:10px 10px; position:relative; }
.todoListBox + .todoListBox{ margin-top:30px; }
.todoListBox > p{ width:auto; padding:0 5px; font-size:18px; display:inline-block; }
.todoListBox > p.num{ margin-right:20px; font-weight:bold; }
.btns{  display:inline-block; position:absolute; top:calc(100% + 10px); right:5px; }
.btns > button{ outline:2px solid #353434; width:30px; margin-left:10px; padding:2px 0; font-size:12px; }
.btns > button:hover{ background-color:#353434; color:#fff; }

.done{ color:rgba(53, 52, 52, .8); position:relative; }
.done:after{ content:''; display:block; width:100%; height:7px; background-color:rgba(255, 0, 0, .7); position:absolute; top:40%; left:0; transform:translateY(-40%);  }
.none{ display:none; }
</style>