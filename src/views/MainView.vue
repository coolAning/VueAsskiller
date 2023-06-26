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
                        <TransitionGroup name="list">

                            <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="blue">

                                <template v-slot:append>

                                    <v-btn v-if="item.ifJoin" class="sort-button" @click="handleSelect(i)" icon="mdi-checkbox-intermediate"
                                        color="green" ></v-btn>
                                    <v-btn v-else class="sort-button" @click="handleSelect(i)" icon="mdi-checkbox-blank-outline"
                                        color="grey"></v-btn>
                                    <v-btn class="sort-button" @click="handleUp(i)" icon="mdi-arrow-up-bold"
                                        color="blue"></v-btn>
                                    <v-btn class="sort-button" @click="handleDown(i)" icon="mdi-arrow-down-bold"
                                        color="blue"></v-btn>

                                </template>
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item>
                        </TransitionGroup>
                    </v-list>
                </v-card-text>

            </v-card>
        </v-dialog>
        <v-main>

            <v-container fluid class="content-container">
                <v-card v-for="(item, i) in groups_data" width="90%" title="三头野猪" subtitle="没啥用的子标题">
                    <template v-slot:append>
                        <v-btn icon="mdi-message-badge-outline" color="red"></v-btn>
                    </template>
                    <v-list density="compact">
                        <v-list-subheader>成员列表</v-list-subheader>

                        <v-list-item v-for="(item_, i) in item.group_data" color="blue">
                            <template v-slot:prepend>
                                <v-icon :icon="item_.icon" color="red"></v-icon>
                            </template>

                            <v-list-item-title v-text="item_.text"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-container>
        </v-main>
    </v-layout>
</template>
<script lang="ts" setup>
import api from '@/api/users';
import { ref, onMounted } from 'vue'
import users_ from '../stores/users'
import groups_, { GroupInfo } from '../stores/groups'
const users = users_()
const groups = groups_()

var dialog = ref(false);

interface GroupData {
    text: string;
    icon: string;
}
interface Group {
    group_data: GroupData[];
    group_uuid: string;
}
const groups_data = ref<Group[]>([]);

var items = ref([
    { text: '段佳宁', ifJoin: true },
    { text: '唐国耀', ifJoin: false },
    { text: '侯易杭', ifJoin: false },
])

const handleSelect = (i: number) => {
    items.value[i].ifJoin = !items.value[i].ifJoin
}
const handleUp = (i: number) => {
    if (i == 0) return
    let p = items.value
    let temp = p[i]
    p[i] = p[i - 1]
    p[i - 1] = temp
    items.value = p
}
const handleDown = (i: number) => {
    if (i == items.value.length - 1) return
    let temp = items.value[i]
    items.value[i] = items.value[i + 1]
    items.value[i + 1] = temp
}
const id = users.getUUID;
const init = async () => {
    await api.getUsers({}, id)
        .then(function (response) {
            users.setOthers(response.data)
        })
        .catch(function (error) {
            // 处理错误情况
            console.log(error);
        })

    await api.getInfo({}, id)
        .then(function (response) {
            response.data.forEach(element => {
                element.data.sort((a, b) => a.num - b.num)
            });
            groups_data.value = response.data.map((item) => {
                return {
                    group_data: item.data.map((item_) => {
                        return {
                            text: users.searchAccount(item_.useruuid)!,
                            icon: item_.num == 1 ? 'mdi-arrow-right-box' : ''
                        }
                    }),
                    group_uuid: item.guuid
                }
            })
            let groups_: GroupInfo[] = []
            for (let i = 0; i < response.data.length; i++) {
                let uuid = response.data[i].guuid
                let users_uuid = []
                for (let j = 0; j < response.data[i].data.length; j++) {
                    users_uuid.push(response.data[i].data[j].useruuid)
                }
                groups_.push({
                    uuid: uuid,
                    n_tx: response.data[i].txuuid,
                    users_uuid: users_uuid
                })
            }
            groups.setGroups(groups_)

        })
        .catch(function (error) {

            console.log(error);
        })

    await api.getConfirm({}, id)
        .then(function (response) {
            console.log(response.data);


        })
        .catch(function (error) {
            console.log(error);
        })
}
init()
</script>
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

.sort-button {
    margin-left: 10px;
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
</style>
