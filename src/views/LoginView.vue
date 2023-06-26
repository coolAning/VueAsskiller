<template>
    <div class="main-container">

        <div class="title-container">
            <img src="@/assets/svg/mouse.svg" class="mouse-icon" />
            <div class="title">
                鼠鼠人の饮食Plan
            </div>
        </div>
        <div class="form-container">
            <v-sheet max-width="300" class="mx-auto">
                <v-form validate-on="submit lazy" @submit.prevent="handleLogin">
                    <v-text-field v-model="form.account" :rules="rules" label="账号"></v-text-field>
                    <v-text-field v-model="form.password" :rules="rules" label="密码"></v-text-field>

                    <v-btn :loading="loadding" type="submit" block text="登录"></v-btn>
                </v-form>
            </v-sheet>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import users_ from '@/stores/users'
import router from '@/router'
import userapi from '../api/users'
import { useToast } from 'vue-toastification';
const toast = useToast();
const form = reactive({
    account: '',
    password: ''
})
const loadding = ref(false) 
const users = users_()


const rules = ref([
    (value: string) => {
        return true
    }
])



const handleLogin = async () => {
    loadding.value = true
    await userapi.login({
        account: form.account,
        password: form.password
    })
        .then(async function (response) {
            loadding.value = false
            toast.success('登录成功')
            users.setSelf(response.data);
            
        })
        .catch(function (error) {
            console.log(error);
            loadding.value = false
        })
}

</script>
<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;

}

.title-container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.title {
    display: inline;
    margin-left: auto;
    margin-right: auto;
    font-size: 50px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-top: 20px;
    margin-bottom: 30px;
}

.mouse-icon {
    width: 60%;
    margin-left: 20%;
}

.form-container {
    margin-bottom: 50px;
}
</style>
