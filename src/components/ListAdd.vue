<template>
    <div>
        <input
            type="text"
            v-model="memo"
            placeholder="할 일을 입력하세요"
            @keypress.enter="enterKey"
        />
        <button          
            v-if="mode === 'add'"
            @click="listAdd"
        >+</button>
        <button           
            v-else
            @click="listEdit2"
        >
            ✐
        </button>
    </div>
</template>

<script>
import { eventBusEdit } from '../main'

export default{
    data() {
        return {
            memo: null,
            index: null,
            mode: 'add',
            none: 'none',
            time: null,
            display: 'block'
        }
    },
    created() {
        eventBusEdit.$on('listEdit0', (memo, index, display) => {
            console.log(memo, index);
            this.memo = memo
            this.index = index
            this.mode = 'edit'
            this.display = display
        })
    },
    methods: {
        listAdd(){
            console.log('할일 추가');
            if(this.memo === null || this.memo.trim() === '' /*&& typeof(this.memo) === 'string'*/) { //글자가 없거나 스페이스바만 쳤을 때 알림창 뜨도록 함.
                alert('추가할 할일을 입력해 주세요.')
            } else {
                console.log(this.memo);
                
                this.$emit('listAdd1', this.memo,  this.time)
                this.memo = null

            }
        },
        listEdit2() {
            if(this.memo === null || this.memo.trim() === '') {
                alert('할일을 입력해 주세요!')
            } else{              
                this.mode = 'add'
                this.display = 'block'
                this.$emit('listEdit3', this.index, this.memo, this.mode, this.display,  /*this.time*/) 
                this.memo = null              
            }
        },
        enterKey() {
            if(this.mode === 'add') {
                console.log('click enter!!!!!!!!');
                this.listAdd()
            } else {
                this.listEdit2()
            }
        }
    }
}
</script>

<style scoped>
input{ outline:2px solid #353434; width:calc(100% + -22px); padding:17px 20px; }
button{ outline:2px solid #353434; width:20px; margin-left:2px; padding:17px 0;   }
button:hover{ background-color:#353434; color:#fff; }
</style>
