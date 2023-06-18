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
                <v-form validate-on="submit lazy">
                    <v-text-field label="账号"></v-text-field>
                    <v-text-field label="密码"></v-text-field>

                    <v-btn type="submit" block class="mt-2" text="登录"></v-btn>
                </v-form>
            </v-sheet>
        </div>

    </div>
</template>
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
<script lang="ts" setup>

</script>