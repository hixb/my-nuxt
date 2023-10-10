<script lang="ts" setup>
import type { AxiosResponse } from 'axios'
import axios from 'axios'

interface IProps {
  filePath?: string
  cover?: string
  original?: string
}

type State = 'success' | 'error' | 'wait' | 'init'

const props = withDefaults(defineProps<IProps>(), {
  filePath: 'https://4.bp.blogspot.com/-vFEJV8v5Bms/X1WnI01Q71I/AAAAAAAAP5w/do4OYrEPQBAcceIkM2sq9fcQbnhca9nOQCNcBGAsYHQ/s0/travel-boating-experience.jpg',
  cover: 'https://3.bp.blogspot.com/-J0e6w8GFsbc/YgFZCWbqZVI/AAAAAAAACRs/v2epBVKMzq89syX3OVsjaqwg2UlX1H_mgCK4BGAYYCw/s360-rw-e30/FineshopDesign_Logo.png',
  original: '未知',
})

const TOTAL_SCHEDULE = 100

const gettingInformation = ref<State>('init')
const downloading = ref(false)
const downloadCompleted = ref(false)
const progress = ref(TOTAL_SCHEDULE)
const percentage = computed(() =>
  TOTAL_SCHEDULE - progress.value > TOTAL_SCHEDULE ? TOTAL_SCHEDULE : TOTAL_SCHEDULE - progress.value,
)

const isImage = ref(false)
const fileInfo = reactive({
  name: '',
  size: '',
  format: '',
})
const imageResolution = reactive({
  width: 0,
  height: 0,
})

onMounted(() => fetchFileInfo())

async function fetchFileInfo() {
  gettingInformation.value = 'wait'

  try {
    const response = await fetch(props.filePath)
    const blob = await response.blob()
    const fileExtension = props.filePath.slice((props.filePath.lastIndexOf('.') - 1 >>> 0) + 2).split('?')[0]
    const filename = getFilename(props.filePath).split('.')[0].split('?')[0]
    const fileSize = blob.size < 1024 * 1024
      ? `${(blob.size / 1024).toFixed(2)}KB`
      : `${(blob.size / (1024 * 1024)).toFixed(2)}MB`

    fileInfo.format = fileExtension
    fileInfo.name = filename
    fileInfo.size = fileSize
    isImage.value = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension.toLowerCase())

    if (isImage.value) {
      const image = new Image()

      image.src = props.filePath
      image.onload = () => {
        imageResolution.width = image.width
        imageResolution.height = image.height

        gettingInformation.value = 'success'
      }
      return
    }

    gettingInformation.value = 'success'
  }
  catch (_) {
    gettingInformation.value = 'error'

    console.error(_)
  }
}

function getFilename(fileURL: string) {
  const parts = fileURL.split('/')

  return parts[parts.length - 1]
}

async function startDownload() {
  if (downloading.value || (['error', 'wait', 'init'] as State[]).includes(gettingInformation.value))
    return

  const url = props.filePath
  const downloadLink = document.createElement('a')

  downloadLink.style.display = 'none'
  document.body.appendChild(downloadLink)

  let blobUrl = ''

  try {
    downloading.value = true

    const response: AxiosResponse = await axios({
      url,
      method: 'GET',
      responseType: 'blob', // Response type is set to blob
      onDownloadProgress: (event) => {
        const total = event.total ?? 0
        const loaded = event.loaded

        progress.value = Math.max(0, 100 - Math.floor((loaded / total) * 100))

        if (progress.value === 0)
          downloadCompleted.value = false
      },
    })

    // Create a blob URL from the response data
    const blob = new Blob([response.data], { type: response.headers['content-type'] })
    blobUrl = URL.createObjectURL(blob)

    // Set the download link attributes
    downloadLink.href = blobUrl
    downloadLink.download = `${fileInfo.name}.${fileInfo.format}`

    // Simulate a click to trigger the download
    downloadLink.click()
  }
  catch (_) {
    console.error('Download error', _)
  }
  finally {
    // Clean up the blob URL and download link
    if (blobUrl)
      URL.revokeObjectURL(blobUrl)

    document.body.removeChild(downloadLink)
    progress.value = TOTAL_SCHEDULE

    downloading.value = false
    downloadCompleted.value = true
  }
}
</script>

<template>
  <div
    :style="{ margin: downloading ? '32px 0 72px' : '32px 0' }"
    class="relative flex items-center justify-center max-w-lg rounded-xl"
  >
    <div
      class="p-3.5 relative bg-[var(--my-box-bg)] w-full flex flex-col text-sm rounded-xl shadow-[0_0_35px_rgba(0,0,0,.09)] z-20"
    >
      <div class="flex flex-row items-center">
        <div
          :class="downloading ? '!rounded-full' : ''"
          :style="{ backgroundImage: `url(${gettingInformation === 'error' ? '' : props.cover})` }"
          class="w-[100px] h-[100px] bg-cover bg-center bg-no-repeat shadow-[0_0_10px_rgba(0,0,0,.1)] bg-[rgba(0,0,0,.08)] rounded-md mr-4 relative"
        >
          <FeedbackLoading
            :is-cover="true"
            :show="gettingInformation === 'wait' || gettingInformation === 'init'"
          />
          <template v-if="!props.cover && gettingInformation === 'success'">
            <span class="flex justify-center items-center w-full h-full text-lg">
              .{{ fileInfo.format }}
            </span>
          </template>
          <template v-else-if="gettingInformation === 'error'">
            <span
              class="z-[101] text-[var(--my-special-danger)] w-full h-full flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              Fail
            </span>
          </template>
          <svg
            :class="downloading ? '!opacity-100 !visible' : ''"
            class="w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible transition-[var(--my-theme-trans15)] -rotate-90"
            style="stroke-width: 1.5;"
            viewBox="0 0 34 34"
          >
            <circle class="fill-none stroke-[#e6e6e6] opacity-90" cx="17" cy="17" r="15.92" />
            <circle
              :style="[{ strokeDashoffset: progress <= 0 ? 0 : progress }, 'stroke-dasharray: 100, 100']"
              class="fill-none stroke-[var(--my-special-color)] transition-[var(--my-theme-trans15)]"
              cx="17"
              cy="17"
              r="15.92"
            />
          </svg>
        </div>
        <div class="flex-grow w-[calc(100%-115px)] relative">
          <FeedbackLoading
            :is-cover="true"
            :show="gettingInformation === 'wait' || gettingInformation === 'init'"
          />
          <template v-if="gettingInformation === 'success'">
            <span class="info" data-text="名称：">{{ fileInfo.name }}</span>
            <span class="info" data-text="来源：">{{ original }}</span>
            <span class="info" data-text="大小：">{{ fileInfo.size }}</span>
            <span v-if="isImage" class="info" data-text="分辨率：">
              {{ imageResolution.width }} x {{ imageResolution.height }}
            </span>
            <span class="info" data-text="格式：">.{{ fileInfo.format }}</span>
          </template>
          <template v-else-if="gettingInformation === 'error'">
            <span class="z-[101] text-[var(--my-special-danger)] w-full h-full flex items-center justify-center">
              Fail
            </span>
          </template>
        </div>
      </div>
      <button
        :class="[
          downloading ? 'opacity-0 invisible' : 'opacity-100 visible',
          gettingInformation !== 'success' ? 'opacity-60 cursor-no-drop' : '',
        ]"
        class="download-btn absolute -bottom-5 right-5 shadow-[0_0_15px_rgba(0,0,0,.09)] bg-[var(--my-special-color)] w-10 h-10 flex items-center justify-center rounded-full transition-[--my-theme-trans2] hover:scale-[1.03]"
        @click="startDownload"
      >
        <svg
          v-if="!downloadCompleted" fill="none" height="20" viewBox="0 0 24 24" width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.4405 8.89844C20.0405 9.20844 21.5105 11.0584 21.5105 15.1084V15.2384C21.5105 19.7084 19.7205 21.4984 15.2505 21.4984H8.74047C4.27047 21.4984 2.48047 19.7084 2.48047 15.2384V15.1084C2.48047 11.0884 3.93047 9.23844 7.47047 8.90844"
            stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          />
          <g>
            <path
              d="M12 2V14.88" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="1.5"
            />
            <path
              d="M15.3484 12.6484L11.9984 15.9984L8.64844 12.6484" stroke="#292D32"
              stroke-linecap="round"
              stroke-linejoin="round" stroke-width="1.5"
            />
          </g>
        </svg>
        <svg v-else fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.55 21.67C18.84 20.54 22 16.64 22 12C22 6.48 17.56 2 12 2C5.33 2 2 7.56 2 7.56M2 7.56V3M2 7.56H4.01H6.44"
            stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          />
          <path
            d="M2 12C2 17.52 6.48 22 12 22" stroke="#292D32" stroke-dasharray="3 3"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          />
        </svg>
      </button>
    </div>
    <div
      :class="downloading ? '!opacity-100 !visible z-10' : ''"
      :style="{ bottom: downloading ? '-40px' : '0' }"
      class="opacity-0 invisible absolute h-[40px] w-full rounded-xl transition-[--my-theme-trans15] flex items-center justify-center bg-[var(--my-box-bg)] shadow-[0_0_35px_rgba(0,0,0,.09)]"
    >
      <span class="text-sm">正在下载（{{ percentage }}%）</span>
    </div>
  </div>
  <Transition>
    <div v-if="downloading" class="download-bar" />
  </Transition>
</template>

<style lang="scss" scoped>
.download-btn {
  svg {
    * {
      stroke: #d5d3d3;
    }
  }
}

.info {
  &:before {
    @apply content-[attr(data-text)] opacity-80
  }

  @apply leading-5 text-2xs block truncate
}

.download-bar {
  &:after, &:before {
    background: linear-gradient(-45deg, #4086F4, #31A952, #FBBE01, #EB4132, #4086F4, #31A952, #FBBE01, #EB4132);
    background-size: 200%;
    z-index: 9999;

    @apply
    content-['']
    fixed
    w-full
    bottom-0
    left-0
    right-0
    h-[3px]
    transition-[var(--my-theme-trans15)]
  }

  &:after {
    filter: blur(10px);
    animation: flash 3s infinite linear;

    @apply h-2.5
  }
}

@keyframes flash {
  0%, 50%, 100% {
    opacity: 1;
  }

  25%, 75% {
    opacity: .4;
  }
}
</style>
