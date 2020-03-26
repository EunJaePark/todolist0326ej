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
                    v-if="list.status === 'created'"
                    @click="listEdit1(list.memo, index)"
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
        listEdit1(memo, index) {
            eventBusEdit.listEdit(memo, index)
        }
    }
}
</script>

<style scoped>
.listBox{  width:100%; margin-top:30px; display:inline-block; }
.todoListBox{ border-bottom:2px solid #353434; padding:10px 20px; }
.todoListBox + .todoListBox{ margin-top:20px; }
.btns{ outline:1px solid red; }
.btns > button{ outline:1px solid lime; }

.done{ color:rgba(53, 52, 52, .3); text-decoration:line-through; }
</style>