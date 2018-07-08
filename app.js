// 引入工具类库 
import util from './utils/index';

let handler = {
    onLaunch () {
        this.getDevideInfo();

        // 增加初始化缓存数据功能
        util.getStorageData('visited', (data)=> {
            this.globalData.visitedArticles = data; 
            console.log("get visited from storage")
            console.log(data)
        });
    },
    alert (title = '提示', content = '好像哪里出了小问题~请再试一次~') {
        wx.showModal({
            title: title,
            content: content
        })
    },
    getDevideInfo () {
        let self = this;
        wx.getSystemInfo({
            success: function (res) {
                self.globalData.deviceInfo = res;
            }
        })
    },
    globalData: {
        user: {
            openId: null
        },
        visitedArticles: '',
        deviceInfo: {}
    }
};

App(handler);