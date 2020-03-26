<template>
    <div class="listBox">
        <div 
            class="todoListBox"
            v-for="(list, index) in todoList"
            :key="index"
        >
            <p class="num">{{ `${index + 1 }.` }}</p>
            <p>
                <span
                    :class="{'done':list.status === 'done'}"
                >{{ list.memo }}</span>
            </p>
            <!-- <p>{{ list.status }}</p> -->

            <p class="time"> {{ list.time }}</p>
            <button
                class="doneRe"
                v-if="list.status === 'created'"
                @click="$emit('statusControl', index, 'done')"
            ></button><!--완료-->
            <button
                class="doneRe"
                v-else
                @click="$emit('statusControl', index , 'created')"
            ><span>✔</span></button><!--부활-->
            <button
                class="editBtn"
                :class="{'none': list.none === 'none'}"
                v-if="list.status === 'created' && list.mode === 'add' || list.none === null"
                @click="listEdit1(list.memo, index, 'edit')"
            >✎</button><!--수정-->
            <button
                class="removeBtn"
                @click="$emit('listDelete', index)"
            >✘</button><!--제거-->
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
.listBox{  width:100%; height:380px; display:inline-block; overflow:scroll; }
.todoListBox{ border-bottom:2px solid #353434; margin:40px 0;  position:relative; }
.todoListBox:first-child{ margin-top:0; }
/* .todoListBox + .todoListBox{ margin-top:30px; } */
.todoListBox > p{ width:calc(100% + -140px); padding:0 5px; font-size:18px; display:inline-block; overflow:scroll; }
.todoListBox > p.num{ width:40px; margin:0 0 0 35px; padding:10px; font-weight:bold;  }
.todoListBox > p > span{ padding:10px 5px 10px; display:inline-block; }

.todoListBox > .time{ padding:0; text-align:right; font-size:10px; position:absolute; right:0; bottom:2px; }

button{ outline:2px solid #353434; width:18px; line-height:14px; margin-left:10px; padding:2px 0; font-size:13px; position:absolute; }
button:hover{ background-color:#353434; color:#fff; }
button.doneRe{ width:15px; height:15px;  bottom:19px; left:2px; } /* 완료 버튼 */
button.doneRe:hover{ background-color:transparent; color:#353434; }
button.doneRe > span{ font-size:28px; transform:translateY(-3px); display:inline-block;  }
button.editBtn{ right:28px; bottom:19px; }
button.removeBtn{ right:2px; bottom:19px; }


.done{ color:rgba(53, 52, 52, .5); position:relative; }
.done:after{ content:''; display:block; width:100%; height:7px; background-color:rgba(255, 0, 0, .8); position:absolute; top:50%; left:0; transform:translateY(-50%);  }
.none{ display:none; }
</style>