<template>
    <div class="listBox">
        <div 
            class="todoListBox"
            v-for="(list, index) in todoList"
            :key="index"
            :class="{'none':list.display === 'none'}"
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
                v-if="list.status === 'created' && list.mode === 'add'"
                @click="$emit('statusControl', index, 'done')"
                :disabled="list.display === 'none'"
            ></button><!--완료-->
            <button
                class="doneRe"
                v-else-if="list.mode === 'add'"
                @click="$emit('statusControl', index , 'created')"
                :disabled="list.display === 'none'"
            ><span>✔</span></button><!--부활-->
            <button
                class="editBtn"
                
                v-if="list.status === 'created' && list.mode === 'add'"
                @click="listEdit1(list.memo, index, 'edit', 'none')"
                :disabled="list.display === 'none'"
            >✎</button><!--수정-->
            <button
                class="removeBtn"
                v-if="list.mode === 'add'"
                @click="$emit('listDelete', index)"
                :disabled="list.display === 'none'"
            >✘</button><!--제거-->


            <button
                class="importBtn"
                v-if="list.importStar === 'off' && list.status === 'created' && list.mode === 'add'"
                @click="listImport(index, 'onImport')"
                :disabled="list.display === 'none'"
            >☆</button>
            <button
                class="importBtn importOn"
                v-else-if="list.status === 'created' && list.mode === 'add'"
                @click="listImport(index, 'offImport')"
                :disabled="list.display === 'none'"
            >★</button>
        </div>
    </div>  
</template>

<script>
import { eventBusEdit } from '../main'

export default {
    props: [ 'todoList' ],
    methods: {
        listEdit1(memo, index, mode, display) {
            eventBusEdit.listEdit(memo, index, mode, display)
            this.todoList[index].mode = mode

            for(let i = 0; i < this.todoList.length; i++) {
                if(this.todoList[i].mode === 'add') { //현재 수정하는 list는 mode가 'edit'이기 때문에, 'edit'이 아닌 리스트들을 모두 찾아서 display='none'을 주는 것.
                    this.todoList[i].display = display
                }
            }
        },
        listImport(index, onoffImport) {
            if( onoffImport=== 'onImport' ) {
                this.todoList[index].importStar = 'on'
                this.todoList.unshift(this.todoList[index])
                this.todoList.splice((index + 1), 1)
                console.log(`우선순위 킨 리스트의 star상태: ${this.todoList[index].importStar}`);
                console.log(`우선순위 킨 현재리스트의 index: ${this.todoList[index].index}`);
                
            } else {
                console.log('starOff 클릭했다!!!!!!!!!!!!');
                
                this.todoList[index].importStar = 'off'
                let beforeList = this.todoList[index]
                let beforeIndex = this.todoList[index].index
                console.log(`beforeIndex: ${beforeIndex}`);
                

                let importStarsOn = 0
                for(let i = 0; i < this.todoList.length; i++) {
                    if( this.todoList[i].importStar === 'on' ) importStarsOn++
                }

                console.log(`star off 누른 리스트의 원래 인덱스: ${this.todoList[index].index}`);
                
                console.log(`star가 on인 것의 갯수: ${importStarsOn}`);
                

                // if(importStarsOn < 2) {
                //    this.todoList.splice((importStarsOn + beforeIndex + 1), 0, beforeList) 
                // }
                // else {
                //     this.todoList.splice((importStarsOn + beforeIndex - 1), 0, beforeList)
                // }

                console.log(importStarsOn + beforeIndex);
                if(importStarsOn < 1) {
                    this.todoList.splice((importStarsOn + beforeIndex + 1), 0, beforeList)
                } else if(importStarsOn <= 2) {  //2개일 때에는 더 작은 숫자의 starsOn이 자리를 하나 전으로 가게 됨.
                    this.todoList.splice((importStarsOn + beforeIndex ), 0, beforeList)
                }

                 
                this.todoList.splice(index, 1)

                 console.log(`우선순위 끈 리스트의 star상태: ${this.todoList[index].star}`);

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

button{ outline:2px solid #353434; width:18px; line-height:14px; padding:2px 0; font-size:13px; position:absolute; }
button:hover{ background-color:#353434; color:#fff; }
button.doneRe{ width:15px; height:15px;  bottom:19px; left:20px; } /* 완료 버튼 */
button.doneRe:hover{ background-color:transparent; color:#353434; }
button.doneRe > span{ font-size:28px; transform:translateY(-3px); display:inline-block;  }
button.editBtn{ right:28px; bottom:19px; }
button.removeBtn{ right:2px; bottom:19px; }
button.importBtn{ outline:none; font-size:15px; left:0; bottom:19px; }
button.importBtn.importOn{ color:#fcaf3b; }
button.importBtn:hover{ background-color:transparent; color:#fcaf3b; }


.done{ color:rgba(53, 52, 52, .5); position:relative; }
.done:after{ content:''; display:block; width:100%; height:7px; background-color:rgba(255, 0, 0, .8); position:absolute; top:50%; left:0; transform:translateY(-50%);  }

.none{ opacity:.3; }
</style>