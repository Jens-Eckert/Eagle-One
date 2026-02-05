<script setup lang="ts">
import { useLoop, useTresContext, type TresInstance } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import { CSS2DRenderer, CSS2DObject } from 'three/addons'
import { onMounted, shallowRef, ref } from 'vue';
import TheNut from './TheNut.vue';
import { store } from '@/utils/store';

const { scene, renderer, camera } = useTresContext()

const donutRef = shallowRef<TresInstance | null>(null);
const orbitRef = ref(OrbitControls);
const { onBeforeRender } = useLoop()

const textRenderer = new CSS2DRenderer()
textRenderer.setSize(window.innerWidth, window.innerHeight)
textRenderer.domElement.style.position = "absolute"
textRenderer.domElement.style.top = '0px'

const testDiv = document.createElement('div')
const testLabel = new CSS2DObject(testDiv)

onBeforeRender(({ delta }) => {
  if (!donutRef.value) return;

  donutRef.value.rotation.x += delta * 2.8
  donutRef.value.rotation.y += delta * 0.3

  if (store['a']) {
    donutRef.value.position.x += delta * 2;
  } else if (store['d']) {
    donutRef.value.position.x -= delta * 2;
  }

  if (store['w']) {
    donutRef.value.position.z += delta * 2;
  } else if (store['s']) {
    donutRef.value.position.z -= delta * 2;
  }

  if (store[' ']) {
    donutRef.value.position.y += delta * 2;
  } else if (store['Control']) {
    donutRef.value.position.y -= delta * 2;
  }

  console.log(orbitRef.value.)
})

function onClick() {
  console.log("click! from parent")
}

onMounted(() => {
  testDiv.textContent = "This is a test"
  testDiv.style.backgroundColor = "transparent"
  testDiv.style.color = "#FFF"

  testLabel.center.set(0, 0)
  const pos = donutRef.value!.position
  testLabel.position.set(pos.x, pos.y, pos.z)

  donutRef.value!.add(testLabel)

  document.body.appendChild(textRenderer.domElement)

  textRenderer.domElement.tabIndex = 0
  textRenderer.domElement.style.pointerEvents = "none"
  renderer.instance.domElement.addEventListener('keydown', keydownListener)
  renderer.instance.domElement.addEventListener('keyup', keyupListener)

  renderer.onRender(() => {
    textRenderer.render(scene.value, camera.activeCamera.value)
  })
})

function keydownListener(e: KeyboardEvent) {
  store[e.key] = true
  console.log(e.key, store[e.key])
}

function keyupListener(e: KeyboardEvent) {
  store[e.key] = false
  console.log(e.key, store[e.key])
}

</script>

<template>
  <TresPerspectiveCamera :position="[7, 7, 7]" :look-at="[0, 0, 0]" />
  <OrbitControls ref="orbitRef" />

  <TheNut v-model="donutRef" :torus-args="[3, 1, 20, 25]" :position="[0, 0, 0]" @click="onClick" />

  <TresAxesHelper />
  <TresGridHelper />
</template>