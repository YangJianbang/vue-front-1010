<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="getAll">全部</a>
                </li>
                <li v-for="(oneSubject,index) in subjectNestedList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="oneSubject.title" href="#" @click="searchOne(oneSubject.id,index)">{{
                      oneSubject.title
                    }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(twoSubject,index) in subSubjectList" :key="index">
                  <a :title="twoSubject.title" href="#" @click="searchTwo(twoSubject.id,index)"
                     :class="{active:twoIndex==index}">{{
                      twoSubject.title
                    }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="销量" href="javascript:void(0);" @click="searchBuyCount()">销量
                  <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                  <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-if="data.total!=0">
            <ul class="of" id="bna">
              <li v-for="course in data.rows" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" :alt="course.title">
                    <div class="cc-mask">
<!--                      <a :href="'/teacher/'+thacher.id" :title="thacher.name" target="_blank">-->
                      <a :href="'/course/'+course.id" :title="course.title" class="comm-btn c-btn-1">{{ course.title }}</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{ course.title }}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green" v-if="Number(course.price)===0">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">9634人学习</i>
                      |
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首</a>
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)">末</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import course from "../../api/course";

export default {
  data() {
    return {
      page: 1,//当前页
      data: {},//课程列表集合数组

      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表

      searchObj: {}, // 查询表单对象

      oneIndex: -1,
      twoIndex: -1,
      buyCountSort: "",
      gmtCreateSort: "",
      priceSort: ""
    }
  },
  created() {
    this.initCourse()
    this.initSubject()
  },
  methods: {
    //设置销量排序
    searchBuyCount(){
      this.buyCountSort="1"
      this.gmtCreateSort=""
      this.priceSort=""

      this.searchObj.buyCountSort=this.buyCountSort
      this.searchObj.gmtCreateSort=this.gmtCreateSort
      this.searchObj.priceSort=this.priceSort
      this.gotoPage(this.page)
    },
    //更新时间查询
    searchGmtCreate() {
      debugger
      this.buyCountSort = "";
      this.gmtCreateSort = "1";
      this.priceSort = "";
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(this.page)
    },
    //价格查询
    searchPrice() {
      this.buyCountSort = "";
      this.gmtCreateSort = "";
      this.priceSort = "1";
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(this.page)
    },
    getAll() {
      this.oneIndex = -1
      this.twoIndex = -1
      this.searchObj = {}
      this.initCourse()
    },
    searchTwo(twoId, index) {
      this.twoIndex = index
      this.searchObj.subjectId = twoId
      this.gotoPage(this.page)
    },
    //点击一级分类，获取二级分类以及对应课程
    searchOne(oneId, index) {
      this.searchObj.subjectId = ''
      this.subSubjectList = []
      this.oneIndex = index
      this.twoIndex = -1

      this.searchObj.subjectParentId = oneId
      this.gotoPage(this.page)
      for (var i = 0; i < this.subjectNestedList.length; i++) {
        var subjectOneId = this.subjectNestedList[i].id
        if (subjectOneId == oneId) {
          this.subSubjectList = this.subjectNestedList[i].children
        }
      }
    },
    // 查询课程列表
    initCourse() {
      course.getPageList(1, 8, this.searchObj)
        .then(response => {
          this.data = response.data.data
        })
    },
    //查询分类
    initSubject() {
      course.getAllSubject()
        .then(response => {
          //赋值给一级分类
          this.subjectNestedList = response.data.data.subjects
        })
    },
    gotoPage(page) {
      course.getPageList(page, 8, this.searchObj)
        .then(response => {
          this.data = response.data.data
        })
    }
  }
};
</script>
<style scoped>
.active {
  background: #bdbdbd;
}

.hide {
  display: none;
}

.show {
  display: block;
}
</style>
