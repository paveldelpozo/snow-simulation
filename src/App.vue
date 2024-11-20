<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import GitHub from '@/components/GitHub.vue'
import {Snowflake} from "@/classes/Snowflake";
import {Utils} from "@/classes/Utils";

const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D|null>()
const options = ref({
    maxFlakes: 4000,
})

const flakes: Snowflake[] = [];

const drawSnowflake = (flake: Snowflake) => {
    if (ctx.value) {
        ctx.value.save()
        ctx.value.globalAlpha = flake.opacity
        ctx.value.shadowColor = "#cfd1d2"
        ctx.value.shadowBlur = flake.blur;
        ctx.value.beginPath();
        ctx.value.arc(flake.coordinates.x, flake.coordinates.y, flake.radius, 0, Math.PI * 2);
        ctx.value.fillStyle = "#cfd1d2";
        ctx.value.fill();
        ctx.value.closePath();
        ctx.value.shadowBlur = 0;
        ctx.value.restore()
    }
}

const animate = () => {
    if (ctx.value && canvas.value) {
        ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
        ctx.value.beginPath();
        ctx.value.rect(0, 0, canvas.value.width, canvas.value.height);
        ctx.value.fillStyle = "black"
        ctx.value.fill()
        ctx.value.closePath()
    }

    for (const flake of flakes) {
        flake.update()
        drawSnowflake(flake)
    }

    requestAnimationFrame(animate);
}

onMounted(() => {
    if (canvas.value) {
        ctx.value = canvas.value.getContext('2d')
        canvas.value.width = window.innerWidth;
        canvas.value.height = window.innerHeight;

        for (let i = 0; i < options.value.maxFlakes; i++) {
            const x = Utils.random(0, canvas.value.width)
            const y = Utils.random(0, canvas.value.height)
            const radius = Utils.random(0, 3)
            const speed = Utils.random(0.5, 4.5)
            flakes.push(new Snowflake(canvas.value, x, y, radius, speed));
        }

        animate()
    }

    window.addEventListener("resize", () => {
        if (canvas.value) {
            canvas.value.width = window.innerWidth;
            canvas.value.height = window.innerHeight;
        }
    })
})

onBeforeUnmount(() => {

})
</script>

<template>
    <canvas ref="canvas"></canvas>

    <git-hub color="#1D1D1D" url="https://github.com/paveldelpozo/particles" />
</template>

<style>
body {
    margin: 0;
    overflow: hidden;
    background: url('/img/pexels-pixabay-163756.jpg');
    background-size: cover;
    background-position: bottom center;
}

canvas {
    mix-blend-mode: lighten;
}
</style>
