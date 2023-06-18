<template>
    <v-layout>
        <v-app-bar color="blue">

            <template v-slot:prepend>
                <v-avatar color="info">
                    <v-icon icon="mdi-account-circle"></v-icon>
                </v-avatar>
            </template>
            <template v-slot:append>
                <v-btn variant="tonal" @click="dialog = true">
                    Create
                </v-btn>
            </template>
        </v-app-bar>
        <v-dialog v-model="dialog" width="80%">
            <v-card>
                <v-card-title>
                    创建新团体
                    <v-btn style="float:right" variant="tonal" @click="dialog = true" color="blue">
                        Comfirm
                    </v-btn>
                </v-card-title>

                <v-card-text>

                    <v-list>

                        <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="blue">

                            <template v-slot:append>
                                <div v-if="item.ifJoin">
                                    <v-icon icon="mdi-check-outline" color="blue"></v-icon>
                                </div>
                                <v-icon icon="mdi-arrow-up-bold-outline" color="green"></v-icon>

                                <v-icon icon="mdi-arrow-down-bold-outline" color="green"></v-icon>
                            </template>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card-text>

            </v-card>
        </v-dialog>
        <v-main>

            <v-container fluid class="content-container">
                <v-card width="90%" title="三头野猪" subtitle="没啥用的子标题">
                    <template v-slot:append>
                        <v-btn icon="mdi-message-badge-outline" color="red"></v-btn>
                    </template>
                    <v-list density="compact">
                        <v-list-subheader>成员列表</v-list-subheader>

                        <v-list-item v-for="(item, i) in items1" :key="i" :value="item" color="blue">
                            <template v-slot:prepend>
                                <v-icon :icon="item.icon" color="red"></v-icon>
                            </template>

                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
                <v-card width="90%" title="三头野猪" subtitle="没啥用的子标题">
                    <template v-slot:append>
                        <v-btn icon="mdi-send" color="blue"></v-btn>
                    </template>
                    <v-list density="compact">
                        <v-list-subheader>成员列表</v-list-subheader>

                        <v-list-item v-for="(item, i) in items2" :key="i" :value="item" color="blue">
                            <template v-slot:prepend>
                                <v-icon :icon="item.icon" color="red"></v-icon>
                            </template>

                            <v-list-item-title v-text="item.text"></v-list-item-title>

                        </v-list-item>
                    </v-list>
                </v-card>

            </v-container>
        </v-main>
    </v-layout>
</template>
<style scoped>
.content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}


.v-chip {
    margin-left: 10%;
    width: 80%;
}

.v-card {
    margin-bottom: 20px;
}
</style>
<script setup>
import { ref, onMounted } from 'vue'
var dialog = ref(false);
var items1 = [
    { text: '段佳宁', icon: 'mdi-arrow-right-box' },
    { text: '侯易杭', icon: '' },
    { text: '唐国耀', icon: '' },
]
var items2 = [

    { text: '段佳宁', icon: 'mdi-arrow-right-box' },
    { text: '侯易杭', icon: '' },
    { text: '唐国耀', icon: '' },
]
var items = ref([
    { text: '段佳宁', icon: 'mdi-clock', ifJoin: true },
    { text: '唐国耀', icon: 'mdi-arrow-up-bold-outline', ifJoin: false },
    { text: '侯易杭', icon: 'mdi-arrow-down-bold-outline', ifJoin: false },
])
</script>