declare global {
  // interface Navigator {
  // 	msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
  // 	browserLanguage: string;
  // }

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

export {}
