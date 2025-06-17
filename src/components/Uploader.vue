<template>
  <div class="main-wrapper">
    <div class="card-glass q-pa-xl q-mx-auto">
      <h2 class="text-h5 text-weight-bold text-primary q-mb-md">Background Remover</h2>

      <q-file
        v-model="file"
        label="Upload your image"
        accept="image/*"
        filled
        class="q-mb-md"
        color="accent"
        dense
        flat
        outlined
        input-class="file-text"
      />

      <q-btn
        label="Remove Background"
        color="primary"
        glossy
        class="full-width q-mb-md"
        :loading="loading"
        @click="processImage"
      />

      <q-banner v-if="error" class="bg-red-5 text-white q-mb-md" dense>
        ⚠️ {{ error }}
      </q-banner>

      <transition name="fade">
        <div v-if="preview" class="q-mt-md">
          <img :src="preview" class="preview-img q-mb-md" />
          <q-btn
            color="secondary"
            icon="cloud_download"
            label="Download"
            :href="preview"
            download="processed-image.png"
            class="glow-button full-width"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { removeBackground } from 'src/composables/background-remover.js'

const file = ref(null)
const preview = ref(null)
const loading = ref(false)
const error = ref('')

async function blurImage() {
  if (!file.value) return
  loading.value = true
  error.value = ''
  preview.value = null

  try {
    preview.value = await blurBackground(file.value)
  } catch (err) {
    error.value = err.message
  }

  loading.value = false
}


async function processImage() {
  if (!file.value) return
  loading.value = true
  error.value = ''
  preview.value = null

  try {
    preview.value = await removeBackground(file.value)
  } catch (err) {
    error.value = err.message
  }

  loading.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

.main-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', 'SF Pro Display', sans-serif;
  padding: 2rem;
}

.card-glass {
  width: 320px;
  padding: 30px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px #e9d900;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  text-align: center;
  transition: all 0.3s ease-in-out;
}

.file-text {
  color: white;
  font-size: 14px;
}

.preview-img {
  max-width: 100%;
  border-radius: 0.75rem;
  box-shadow: 0 8px 16px rgba(0, 255, 255, 0.2);
}

.glow-button {
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
  font-weight: 500;
}

.glow-button:hover {
  transform: scale(1.03);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.button:hover {
  background-color: #0056b3;
}
.slider {
  width: 80%;
  margin: 20px 0;
}
.preview {
  width: 400px;
  height: 400px;
  margin-top: 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
</style>
