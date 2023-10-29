declare global {
  interface Navigator {
    // msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string
  }

  interface Document {
    webkitFullscreenElement: any
    mozFullScreenElement: any
    msFullscreenElement: any
    cancelFullScreen: any
    webkitCancelFullScreen: any
    mozCancelFullScreen: any
    msCancelFullScreen: any
  }
}

// https://blog.csdn.net/HermitSun/article/details/104104762?ydreferer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS5oay8%3D
export {}
