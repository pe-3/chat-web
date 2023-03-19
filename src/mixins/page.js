/**
 * @file  异步页面 mixin 方法
 * @author chengong03(chengong03@baidu.com)
 * @date 2019-5-15
 */

export default {
    data() {
        return {
            // 页面正在加载中
            pageLoading: false,
            // 页面加载成功
            pageSuccess: false,
            // 页面加载失败
            pageFail: false,
            // 页面是否初始化（完成了首次加载）
            pageInited: false
        };
    },
    methods: {
        beforeSetCache() {
            // loading 状态不缓存
            // 不然 loading 时跳走再返回可导致不请求新数据
            this.pageLoading = false;
        },
        // 开始加载
        setPageLoading() {
            this.pageLoading = true;
            this.pageFail = false;
            this.pageSuccess = false;
        },
        // 加载成功
        setPageSuccess() {
            this.pageLoading = false;
            this.pageFail = false;
            this.pageSuccess = true;
            this.pageInited = true;
        },
        // 加载失败
        setPageFail() {
            this.pageLoading = false;
            this.pageFail = true;
            this.pageSuccess = false;
            this.pageInited = true;
        },
        resetPage() {
            this.pageLoading = false;
            this.pageSuccess = false;
            this.pageFail = false;
            this.pageInited = false;
        }
    }
};
