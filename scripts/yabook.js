const axios = require("axios");
const fs = require("fs");
let result = "【雅书】：";

class YABOOK {
  constructor() {
    this.host = "https://yabook.blog/";
    this.headers = {
      cookie:
        "rysnzmlusername=qx%40linshiyou.com; rysnzmluserid=145507; rysnzmlgroupid=1; rysnzmlrnd=GZwSmIptIW28jxzesmEo; rysnzmlauth=1c3f85b224d5b63b8dd7aeaf69a507b3; rysnzcheckspacefbkey=1717691805%2C7cee88cdac33a7f03a5ed4aa710e3d90%2CEmpireCMS",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    };
  }

  /**
   *  获取验证码图片进行识别
   * @param {string} type_id
   * @returns string
   */
  async imageToBase64(type_id) {
    if ((type_id = "ShowKey")) {
      const image_url = this.host + "e/ShowKey/";
      const img_pas = {
        v: "spacefb",
        t: Math.random(),
      };
    } else {
      const image_url = this.host + "e/ShowKey/";
      const img_pas = {
        v: "login",
        t: Math.random(),
      };
    }
    try {
      const response = await axios.get(image_url, {
        params: img_pas,
        headers: {
          cookie:
            "rysnzcheckspacefbkey=1717693169%2Cee99aaed6200f554d60518e0913694c6%2CEmpireCMS",
        },
        responseType: "arraybuffer",
      });
      const imageBuffer = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      yzm = await this.orc(imageBuffer);
      return yzm;
    } catch (error) {
      console.log(`验证码获取失败，原因是：${error.response}`);
    }
  }

  /**
   * orc识别图片
   * @param {string} base64Image
   * @returns string
   */
  async orc(base64Image) {
    try {
      //   const url = "https://yzm.xlh001.xyz/ocr/b64/json";
      const url =
        "https://www.tutengai.com/api/ocr/ty01?key=R9k62896JwIkcscQjMLw6z3IWW";
      const response = await axios.post(url, {
        headers: { "Content-Type": "application/json" },
        // data: base64Image,
        image: base64Image,
      });
      return response.data.data;
    } catch (error) {
      console.log(`识别失败，原因是：${error.response.data.msg}`);
    }
  }

  /**
   * 登录
   */
  async login() {
    const key = await this.imageToBase64(1);
    const url = this.host + "e/member/doaction.php";
    const frm = new URLSearchParams({
      ecmsfrom: "",
      enews: "login",
      tobind: "0",
      username: "qx@linshiyou.com",
      password: "cKshgi@v@Mm7SU",
      lifetime: "86400",
      key: key,
      Submit: "立即登录",
    });
    try {
      const res = await axios.post(url, frm, {
        headers: this.headers,
      });
      console.log(res);
    } catch (error) {
      console.log(`登录失败，原因是：${error.response.data}`);
    }
  }

  async info() {
    const url = this.host + "e/member/cp/";
    try {
      const res = await axios.get(url, { headers: this.headers });
      console.log(res);
    } catch (error) {
      console.log(`签到失败，原因是：${error.response.data}`);
    }
  }

  /**
   * 签到
   */
  async sign() {
    const key = await this.imageToBase64(image_url, img_pas);
    const url = this.host + "e/member/cp/qiandao.php";
    try {
      const res = await axios.post(
        url,
        new URLSearchParams({
          key: key,
        }),
        {
          params: {
            action: "qiandao",
          },
          headers: this.headers,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(`签到失败，原因是：${error.response.data.info}`);
    }
  }

  async run() {
    await this.login();
  }
}

async function yabook() {
  const yabook = new YABOOK();
  await yabook.run();
}

module.exports = yabook;
