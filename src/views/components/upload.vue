<template>
  <div>
    <el-card class="max-w-[780px]">
      <template #header>
        <span>绑定值为数组</span>
      </template>
      <upload v-model="form.imgList1" @change="onChange" />
    </el-card>

    <el-card class="mt-4 max-w-[780px]">
      <template #header>
        <span>绑定值为字符串, 逗号(,)分割</span>
      </template>
      <upload v-model="form.imgList2" format="string" @change="onChange" />
    </el-card>

    <el-card class="mt-4 max-w-[780px]">
      <template #header>
        <span>绑定值为字符串数组</span>
      </template>
      <upload v-model="form.imgList3" format="jsonArray" @change="onChange" />
    </el-card>

    <el-card class="mt-4 max-w-[780px]">
      <template #header>
        <span>图片裁剪(默认与图片比例一样, 自定义裁剪区域大小)</span>
      </template>
      <upload v-model="form.imgList4" @change="onChange" enable-cropper />
    </el-card>

    <el-card class="mt-4 max-w-[780px]">
      <template #header>
        <span>圆形图片裁剪(指定裁剪出的图片为 200 * 200)</span>
      </template>
      <upload
        v-model="form.imgList5"
        @change="onChange"
        enable-cropper
        :cropperParams="{
          options: {
            aspectRatio: 1
          },
          circle: true,
          canvasWidth: 200,
          canvasHeight: 200
        }"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import upload from '@/components/upload/index.vue'

const form = reactive({
  imgList1: [
    'https://tfsmy.chengdu.gov.cn/xcimage-static/group1/M00/0A/90/rCtnGGYCjvCAPgvXAAnTMO5EEro169.png',
    'https://tfsmy.chengdu.gov.cn/xcimage-static/group1/M00/0A/90/rCtnGGYCkXmAWyHQAAKfUV2AO1M484.png'
  ],
  imgList2:
    'https://tfsmy.chengdu.gov.cn/xcimage-static/group1/M00/0A/90/rCtnGGYCkamAEoJDAAULtNInT-Q076.png,https://tfsmy.chengdu.gov.cn/xcimage-static/group1/M00/0D/9D/rCtnG2YCkcCABVMjAAXzBnvuujc946.png',
  imgList3: JSON.stringify([
    'https://tfsmy.chengdu.gov.cn/xcimage-static/group1/M00/11/D7/rCtnGWYCkfaAXAfzAABGvc75hus208.png',
    'https://tfsmy.chengdu.gov.cn/xcimage-static/group1/M00/11/D7/rCtnGWYCkfyAf37TAAD8jP-A8a8391.png'
  ]),
  imgList4: [
    'https://tfsmy.chengdu.gov.cn/xcimage-static/group1/M00/0A/90/rCtnGGYClgOAX-8hAAY04aWV9Rc191.jpg'
  ],
  imgList5: [
    'https://tfsmy.chengdu.gov.cn/xcimage-static/group1/M00/11/D7/rCtnGWYCkpeAL3TmAAAmWJwBlUk295.png'
  ]
})

const onChange = (data: string[]) => {
  console.log('data', data)
}
</script>

<style lang="scss" scoped></style>
