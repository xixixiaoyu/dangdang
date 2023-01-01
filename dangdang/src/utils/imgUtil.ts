import storage from "good-storage";
export class LmgLoader {
  static imglist: Record<string, any> = {};

  // 存储所有图片到本地缓存
  static storageAllImg() {
    this.imglist = storage.get("imglist") || {};
    if (!LmgLoader.imglist || !LmgLoader.isNotEmptyImgList()) {
      LmgLoader.imglist = LmgLoader.loadAllImg();
      storage.set("imglist", LmgLoader.imglist);
    }
  }

  static isNotEmptyImgList() {
    return Object.getOwnPropertyNames(LmgLoader.imglist).length;
  }

  // 根据图片名获取图片。
  static getImg(imgName: string): string {
    LmgLoader.imglist = LmgLoader.isNotEmptyImgList()
      ? LmgLoader.imglist
      : storage.get("imglist");
    return LmgLoader.imglist[imgName];
  }

  // 加载所有图片到内存。
  static loadAllImg(): any {
    let imgList: any = {};
    const viewImgModules = import.meta.globEager(`../assets/img/**/**/*.png`);

    for (let path in viewImgModules) {
      let imgFullPath = viewImgModules[path].default;
      if (imgFullPath) {
        let imgName = path.substring(path.lastIndexOf("/") + 1);
        imgList[imgName] = imgFullPath;
      }
    }
    return imgList;
  }
}

export default LmgLoader.getImg;
