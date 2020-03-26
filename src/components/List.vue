<template>
    <div class="listBox">
        <div 
            class="todoListBox"
            v-for="(list, index) in todoList"
            :key="index"
        >
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
.listBox{  width:100%; display:inline-block; }
.todoListBox{ border-bottom:2px solid #353434; padding:10px 20px; position:relative; }
.todoListBox + .todoListBox{ margin-top:30px; }
.btns{  display:inline-block; position:absolute; top:calc(100% + 10px); right:0; }
.btns > button{ outline:2px solid #353434; width:30px; margin-left:10px; padding:2px 0; font-size:12px; }
.btns > button:hover{ background-color:#353434; color:#fff; }

.done{ color:rgba(53, 52, 52, .3); text-decoration:line-through; }
.none{ display:none; }
</style>