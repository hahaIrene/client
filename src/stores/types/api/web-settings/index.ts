// {
//   "id": "2b1c3a0b-91f5-4e5c-a83e-f83c545a72a4",
//   "websiteTitle": "三峽新生活",
//   "mainTitle": "三峽新生活",
//   "aboutBtnText": "關於",
//   "layerBtnText": "景點清單",
//   "sourceBtnText": "故事地圖來源",
//   "reportBtnText": "問題回報",
//   "aboutTab": "平台介紹",
//   "aboutTextHtml": "<p style=\"font-size:20px;margin-left:20px;margin-top:20px;\">「三峽生活文化地圖，國立臺北大學海山學研究中心社區GIS地圖平臺」<br><br>本平臺取名「三峽生活文化地圖」，除了代表平臺中每一張主題地圖都是由海山學空間人文的實踐-社區GIS工作坊的學員透過實地田野踏查、搜尋文獻網路資源及其他資訊管道，在彼此討論和協力下彙整而成；也代表三峽地區的地理、歷史、人文、生活特色，是首次以「社區GIS線上協作地圖」的方式呈現於大家面前。希望透過「三峽生活文化地圖，國立臺北大學海山學研究中心社區GIS地圖平臺」，帶領大家認識更多三峽在地的故事力、社群力和地圖力！<br><br></p><p style=\"font-size:20px;margin-left:20px;margin-top:20px;margin-right:20px;\"></p><ul><li style=\"font-size:20px;\">本平臺地圖內容為國立臺北大學海山學研究中心於110年3月～110年8月間舉辦之「海山學空間人文的實踐-社區GIS工作坊」課程成果。</li><br><li style=\"font-size:20px;\">「海山學空間人文的實踐-社區GIS工作坊」授課老師為張智傑，參與學員依據課程講授內容，訂定分組主題，由組員透過實地田野踏查、搜尋文獻網路資源及其他資訊管道，整理為符合主題內容的圖文資料，並於TGOS地圖協作平台上創建其主題地圖。</li><br><li style=\"font-size:20px;\">本平臺將TGOS地圖協作平台各三峽主題地圖內容串接後，建置此平臺為入口網，方便一般使用者查找及應用。</li></ul><p></p>",
//   "copyRightTab": "版權宣告",
//   "copyRightTextHtml": "<p style=\"font-size:20px;margin-left:20px;margin-top:20px;\"></p><ul><li style=\"font-size:20px;\">本平臺由【智紳數位文化事業有限公司】開發，並提供國立臺北大學海山學研究中心及社會大眾使用。</li><br><li style=\"font-size:20px;\">「海山學空間人文的實踐-社區GIS地圖工作坊」各組學員保有主題地圖內容著作財產權，並授權予國立臺北大學海山學研究中心各項非商業行為使用。</li><br><li style=\"font-size:20px;\">若有其他利用或授權需求請洽【智紳數位文化事業】Facebook粉絲專頁（<a href=\"https://bit.ly/3pqRLym\" target=\"_blank\">https://bit.ly/3pqRLym</a>）。</li><br></ul><img src=\"assets/images/JS_logo300.png\" width=\"300\" height=\"66\"><img src=\"assets/images/JS_FB_QRcode.png\" width=\"66\" height=\"66\"><p></p>",
//   "howToTab": "如何建立「JSDC社區GIS地圖平台」",
//   "howToTextHtml": "<p style=\"font-size:20px;margin-left:20px;margin-top:20px;\"></p><ul><li style=\"font-size:20px;\">本平臺由【智紳數位文化事業有限公司】開發，並提供國立臺北大學海山學研究中心及社會大眾使用。</li><br><li style=\"font-size:20px;\">「海山學空間人文的實踐-社區GIS地圖工作坊」各組學員保有主題地圖內容著作財產權，並授權予國立臺北大學海山學研究中心各項非商業行為使用。</li><br><li style=\"font-size:20px;\">若有其他利用或授權需求請洽【智紳數位文化事業】Facebook粉絲專頁（<a href=\"https://bit.ly/3pqRLym\" target=\"_blank\">https://bit.ly/3pqRLym</a>）。</li><br></ul><img src=\"assets/images/JS_logo300.png\" width=\"300\" height=\"66\"><img src=\"assets/images/JS_FB_QRcode.png\" width=\"66\" height=\"66\"><p></p>"
// }

export interface IWebSetting {
  id: string
  websiteTitle: string
  mainTitle: string
  aboutBtnText: string
  layerBtnText: string
  sourceBtnText: string
  reportBtnText: string
  aboutTab: string
  aboutTextHtml: string
  copyRightTab: string
  copyRightTextHtml: string
  howToTab: string
  howToTextHtml: string
}

export type WebSettingsFindOneQuery = {
  ResponseType: IWebSetting
  ParamType: {
    orgCode: string
  }
}

export type WebSettingsUpdateMutation = {
  ResponseType: { message: string }
  ParamType: {
    orgCode: string
    access_token: string
    websiteTitle: string
    mainTitle: string
    aboutBtnText: string
    layerBtnText: string
    sourceBtnText: string
    reportBtnText: string
    aboutTab: string
    aboutTextHtml: string
    copyRightTab: string
    copyRightTextHtml: string
    howToTab: string
    howToTextHtml: string
  }
}
