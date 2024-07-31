<template>
  <div>
    <el-card class="max-w-[780px]">
      <template #header>
        <span>上传文件(docx, xlsx, pdf支持预览)</span>
      </template>
      <Upload v-model="form.fileList" @change="onChange" listType="text" />
      <div class="mt-1">
        <div>绑定的数据：</div>
        <div class="mt-1">{{ form.fileList }}</div>
      </div>
    </el-card>

    <el-card class="mt-4 max-w-[780px]">
      <template #header>
        <span>绑定值为数组, 最多只能上传两个文件</span>
      </template>
      <Upload v-model="form.imgList1" @change="onChange" :limit="2" />
      <div class="mt-1">
        <div>绑定的数据：</div>
        <div class="mt-1">{{ form.imgList1 }}</div>
      </div>
    </el-card>

    <el-card class="mt-4 max-w-[780px]">
      <template #header>
        <span>绑定值为字符串, 逗号(,)分割</span>
      </template>
      <Upload v-model="form.imgList2" format="string" @change="onChange" />
      <div class="mt-1">
        <div>绑定的数据：</div>
        <div class="mt-1 break-words">{{ form.imgList2 }}</div>
      </div>
    </el-card>

    <el-card class="mt-4 max-w-[780px]">
      <template #header>
        <span>绑定值为字符串数组</span>
      </template>
      <Upload v-model="form.imgList3" format="jsonArray" @change="onChange" />
      <div class="mt-1">
        <div>绑定的数据：</div>
        <div class="mt-1">{{ form.imgList3 }}</div>
      </div>
    </el-card>

    <el-card class="mt-4 max-w-[780px]">
      <template #header>
        <span>图片裁剪(默认与图片比例一样, 自定义裁剪区域大小)</span>
      </template>
      <Upload v-model="form.imgList4" @change="onChange" enable-cropper />
      <div class="mt-1">
        <div>绑定的数据：</div>
        <div class="mt-1">{{ form.imgList4 }}</div>
      </div>
    </el-card>

    <el-card class="mt-4 max-w-[780px]">
      <template #header>
        <span>圆形图片裁剪(指定裁剪出的图片为 200 * 200)</span>
      </template>
      <Upload
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
      <div class="mt-1">
        <div>绑定的数据：</div>
        <div class="mt-1">{{ form.imgList5 }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Upload from '@/components/Base/Upload/index.vue'

const form = reactive({
  fileList: [
    'http://static.shanhuxueyuan.com/test6.docx',
    'http://static.shanhuxueyuan.com/demo/excel.xlsx',
    'http://static.shanhuxueyuan.com/test.pdf'
  ],
  imgList1: [
    'https://img0.baidu.com/it/u=330524821,4207987&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500',
    'https://img0.baidu.com/it/u=2795038425,3941086437&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
  ],
  imgList2:
    'https://i2.chinanews.com.cn/simg/cmszt/2024/03/26/39c42d4afcb246e0b26d01af86a9a243.jpg,https://i2.chinanews.com.cn/simg/hd/2024/03/25/smimg_336e7c3c56fc4130a2cc7ccae8509b4a.jpg',
  imgList3: JSON.stringify([
    'https://img2.baidu.com/it/u=2778611073,2074698038&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
    'https://img2.baidu.com/it/u=3599450674,621577378&fm=253&fmt=auto&app=120&f=JPEG?w=1202&h=676'
  ]),
  imgList4: [
    'https://img2.baidu.com/it/u=2374940886,2056353464&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
  ],
  imgList5: [
    'https://img2.baidu.com/it/u=2182508616,3868332223&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800'
  ]
})

const onChange = (data: string[]) => {
  console.log('data', data)
}
</script>

<style lang="scss" scoped></style>
