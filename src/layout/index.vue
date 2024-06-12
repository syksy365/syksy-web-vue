<script setup lang="ts">
// todo
</script>

<template>
    <div class="layout_container">
        <div class="layout-slider">
            <div class="logo">
                logo
            </div>
            <div class="slider_content">
                侧边栏
            </div>
        </div>
        <div class="layout_content">
            <header class="layout_header">
                用户信息
            </header>
            <main class="layout_main">
                <div class="main_nav">
                    开启的页面 的操作拦
                </div>
                <section class="main_content">
                    <router-view />
                </section>
            </main>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout_container {
    height: 100vh;
    display: flex;
    overflow: hidden;

    .layout-slider {
        width: 200px;
        background-color: #f0f0f0;
        display: flex;
        flex-direction: column;

        .logo {
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
        }

        .slider_content {
            flex: 1;
            overflow: auto;
        }

    }

    .layout_content {
        flex: 1;
        display: flex;
        flex-direction: column;

        .layout_header {
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;
        }

        .layout_main {
            flex: 1;
            background-color: #f0f0f0;
            display: flex;
            flex-direction: column;
            overflow: hidden;

            .main_nav {
                height: 40px;
                background-color: #fff;
            }

            .main_content {
                flex: 1;
                overflow: auto;
            }

        }
    }

}
</style>
