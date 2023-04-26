<template>
  <div class="info-edit">
    <div class="info-edit-header">
      <te-back color="black" /> 
      <span>
        修改个人信息
      </span>
    </div>
    <div class="info-edit-main">
      <!-- 个人信息 -->
      <div class="info-edit-item">
        <span>昵称</span>
        <el-input 
          v-model="nickname"
          size="mini"
          :style="{width:'172px'}"
        />
      </div>
      <div class="info-edit-item">
        <span>性别</span>
        <el-select 
          v-model="gender" 
          size="mini"
        >
          <el-option
            label="男"
            value="male"
          />
          <el-option
            label="女"
            value="female"
          />
        </el-select>
      </div>
      <div class="info-edit-item">
        <span>年龄</span>
        <el-input 
          v-model="age" 
          type="number"
          :min="10"
          :max="200"
          size="mini"
          :style="{width:'4rem'}"
        />
      </div>
      <div class="info-edit-item">
        <span>生日</span>
        <el-input 
          v-model="birthday[0]" 
          type="number"
          :min="1"
          :max="12"
          size="mini"
          :style="{width:'4rem'}"
        /> <i>月</i>
        <el-input 
          v-model="birthday[1]" 
          type="number"
          :min="1"
          :max="31"
          size="mini"
          :style="{width:'4rem'}"
        /> <i>日</i>
      </div>
      <te-gap
        orient="height"
        class="divide-line"
      />
      <!-- 账号信息 -->
      <div class="info-edit-item">
        <span>邮箱</span>
        <el-input
          v-model="mail"
          type="email"
          size="mini"
        />
      </div>
      <div class="info-edit-item">
        <span>电话</span>
        <el-input 
          v-model="phone"
          size="mini"
        />
      </div>
      <te-gap
        orient="height"
        class="divide-line"
      />
      <!-- 账号信息 -->
      <div class="info-edit-item">
        <span>地区</span>
        <el-input 
          v-model="site"
          size="mini"
        />
      </div>
      <!-- 简介 -->
      <div class="info-edit-item info-edit-item-intro">
        <span>简介</span>
        <el-input 
          v-model="intro"
          size="mini"
          type="textarea"
          :autosize="false"
          :rows="3"
        />
      </div>
      <el-button 
        size="mini" 
        type="primary" 
        class="info-sub-btn"
        @click="_updateUserInfo"
      >
        提交
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import store from '@/store';
import {getPropsFromVData} from '@/utils';
import {USER_PROPS_WRITEABLE} from '@/config/user';
import {updateUserInfo} from '@/request/user';

export default {
    name: 'InfoEdit',
    data() {
        const storeUser = {...store.getters.user};

        const birthday = store.getters.user.birthday 
            ? store.getters.user.birthday
                .split('.')
                .map(item => Number(item))
            : [1, 1];

        storeUser.birthday = birthday;
        return Object.assign(
            {
                // 个人信息
                nickname: '',
                gender: '',
                age: 10,
                birthday,
                // 联系信息
                mail: '',
                phone: '',
                // 其他信息
                site: '',
                intro: ''
            },
            storeUser
        )
    },
    computed: {
        ...mapState('auth', ['user'])
    },
    methods: {
        ...mapMutations('auth', ['setUser']),
        filterNewInfo(newInfo) {
            const infoBefore = store.getters.user;
            return Object.keys(newInfo).reduce((result, key) => {
                if(newInfo[key] !== infoBefore[key]) {
                    result[key] = newInfo[key];
                }
                return result;
            }, {});
        },
        async _updateUserInfo() {
            const newInfo = getPropsFromVData(
                this,
                ...USER_PROPS_WRITEABLE
            );
            // 转化生日
            newInfo.birthday = `${newInfo.birthday[0]}.${newInfo.birthday[1]}`;

            console.log(this.filterNewInfo(newInfo));
            const res = await updateUserInfo(this.filterNewInfo(newInfo));
            this.$success(res.message);

            newInfo.birthday = this.birthday;
            this.setUser({...store.getters.user, ...newInfo});
        }
    }
}
</script>

<style lang="stylus" scoped>
.info-edit
    background white
    width 100%
    height 100%
    position absolute
    z-index 99
    top 0
    left 0 
    font-size 14px
    border .1px solid rgba(0 0 0 0.1)
    border-radius 30px 30px 0 0
    .info-edit-header
        height 40px
        width 100%
        flex-between true
        padding 0 10px
        position relative


        span
            font-size 14px
            absolute-center true
    .info-edit-main
        padding 20px 30px
        max-height calc(100% - 40px)
        overflow auto
        .info-edit-item 
            display flex
            align-item center
            margin-bottom 15px
            span
                min-width 2em
                grid-center true
                margin-right 20px
                font-weight bold
            i
                grid-center true
                font-style normal
                margin 0 5px
            >>>.el-input__inner
                max-width 15em
        .info-edit-item-intro
            span 
                display unset
        .info-sub-btn
            position absolute
            bottom 20px
            right 30px
</style>