var postFom = {
    "id": "string",
    "name": "string",
    "terminalInstanceId": "string",
    "terminalInstanceName": "string",
    "layoutId": "string",
    "templateId": "string",
    "headerTemplate": { //头部模板
      "id": "string",
      "name": "string",
      "router": "string",
      "templateCode": "string",
      "cover": "string",
      "layoutId": "string",
      "type": 0,
      "defaultHeaderTemplateId": "string",
      "defaultFooterTemplateId": "string"
    },
    "footerTemplate": { //底部模板
      "id": "string",
      "name": "string",
      "router": "string",
      "templateCode": "string",
      "cover": "string",
      "layoutId": "string",
      "type": 0,
      "defaultHeaderTemplateId": "string",
      "defaultFooterTemplateId": "string"
    },
    "themeColor": "string",//颜色模板
    "cover": "string",
    "status": 0,
    "visitorLimitType": 0,
    "visitUrl": "string",
    "isSystemScene": true,
    "sceneScreens": [ //场景分屏
      {
        "id": "string",
        "createdTime": "2021-11-10T09:38:19.089Z",
        "updatedTime": "2021-11-10T09:38:19.089Z",
        "sceneId": "string",
        "screenName": "string",
        "orderIndex": 0,
        "deleteFlag": true,
        // "height":'',//场景高度
        "sceneApps": [//屏幕中的应用模板元素
          {
            "id": "string",//生成id
            "sceneId": "string",
            "appId": "string",//应用id
            "appWidget": { //模板信息
              "id": "string",
              "appId": "string",
              "name": "string",
              "widgetCode": "string",
              "target": "string",
              "availableConfig": "string",
              "cover": "string",
              "width": 0,
              "height": 0,
              "createTime": "2021-11-10T09:38:19.089Z",
              "updateTime": "2021-11-10T09:38:19.089Z",
            //   "setList":[ //模板对应的设置内容参数列表
            //     {
            //         "appPlateIds":"appplate-2717-4562-b3fc-2c963f66afa7",
            //         "sortType":"CreatedTime-DESC",
            //         "topCount":"3",
            //     },
            //   ],
              "topCountList": [
                {
                  "key": "string",
                  "value": "string"
                }
              ],
              "sortList": [
                {
                  "key": "string",
                  "value": "string"
                }
              ]
            },
            "appPlateItems": [//模板对应的设置信息
              {
                "id": "string",
                "name": "string",
                "createTime": "2021-11-10T09:38:19.089Z",
                "topCount": 0,
                "sortType": 0
              }
            ],
            "sceneScreenId": "string",
            "xIndex": 0,
            "yIndex": 0,
            "width": 0,
            "height": 0
          }
        ]
      }
    ],
    "sceneUsers": [ //用户信息
      {
        "id": "string",
        "sceneId": "string",
        "userSetId": "string",
        "userSetType": 0
      }
    ]
  }