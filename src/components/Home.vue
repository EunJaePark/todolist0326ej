<template>
    <v-layout row>
        <v-flex xs6>
            <List/>
        </v-flex>
        <v-flex xs6>
            <ListAdd/>
        </v-flex>
    </v-layout>
</template>

<script>
import List from './List.vue'
import ListAdd from './ListAdd.vue'

export default{
    components: {
        List,
        ListAdd
    }
}

</script>