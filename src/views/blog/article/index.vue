<!--  -->
<template>
 <transition name="el-zoom-in-center">
  <div v-loading.lock="loading"
         element-loading-text="正在施工"
         element-loading-spinner="el-icon-loading"
         class="main">
       <div class="head">
        <p class="title">{{title}}</p>
        <p class="detail" v-show="publicDate"><svg-icon icon-class="calendar"></svg-icon> 发表 {{publicDate | formatDate}} |
        </p>
        <p class="detail" v-show="editDate"><svg-icon icon-class="calendar"></svg-icon> 更新 {{editDate | formatDate}} |
         <svg-icon icon-class="folder"></svg-icon> 分类
        </p>
        <p class="detail" v-for="cate in categories" :key="cate.categoryId" v-show="categories">{{cate.categoryName}} |</p>
        <p class="detail" v-show="watchCount"><svg-icon icon-class="eye"></svg-icon> 阅读次数 {{watchCount}}</p>
      </div>
      <m-d-preview :contents="content" class="content"></m-d-preview>
      <div class="tags" >
          <p v-for="tag in tags" :key="tag.tagId" size="medium" class="tag" @click="toTag(tag)">
            <svg-icon icon-class="tag1" style="color:#FF4500;"></svg-icon>
            <font style="color:#FF4500;">{{tag.tagName}}</font>
          </p>
      </div>
      <div class="comment">
        <div class="info">
          <div class="comment-top">
            <div class="comment-top-item">
              <div class="comment-top-item-text">昵称：</div><el-input placeholder="请输入昵称" size="small" v-model="comment.commentator"></el-input>
            </div>
            <div class="comment-top-item">
              <div class="comment-top-item-text">邮箱：</div>
              <el-input placeholder="请输入邮箱" size="small" v-model="comment.email" type="email"></el-input>
            </div>
          </div>
          <div class="comment-content">
            <el-input
            type="textarea"
            :autosize="{ minRows: 5}"
            :placeholder="placeholder"
            v-model="comment.content"
            class="comment-content-input"></el-input>
            <el-button type="danger" round size="small" @click="postComment">发表评论</el-button>
          </div>
          <div class="comment-list">
            <div v-if="this.comments===null || this.comments.length === 0" class="comment-list-empty">
              ╮(￣▽￣)╭ 暂无评论
            </div>
            <div v-else>
              <div v-for="comment in comments" :key="comment.id">
               <div class="comment-list-father" v-if="comment.fatherId==0"> <!-- v-if="comment.fatherId==0" -->
                  <div>
                    <div class="comment-list-father-commentatorAndDate">{{comment.commentator}}&nbsp;.&nbsp;{{comment.createDate | formatDate}}</div>
                    <!-- <div class="comment-list-father-date">{{comment.createDate | formatDate}}</div> -->
                    <div class="comment-list-father-content">{{comment.content}}</div>
                    <el-button type="text" size="mini" @click="replyComment(comment)">回复</el-button>
                    <div v-for="reply in comments" :key="reply.id" class="comment-list-reply">
                      <div v-if="(reply.fatherId!=0&&reply.fatherId==comment.id)">
                        <div class="comment-list-reply-commentatorAndDate">{{reply.commentator}}&nbsp;.&nbsp;{{reply.createDate | formatDate}}</div>
                        <div class="comment-list-reply-nickName">@{{reply.replyNickName}}：</div>
                        <div class="comment-list-reply-content">{{reply.content}}</div>
                        <el-button type="text" size="mini" @click="replyComment(reply)">回复</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
  </div>
 </transition>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import MDPreview from '@/components/MDPreview'
import {post} from '@/api/posts'
// eslint-disable-next-line no-unused-vars
import {postComment, getComments} from '@/api/comment'
import {markdown} from '@/utils/markdown'
export default {
  data () {
    return {
      content: '',
      title: '',
      postId: '',
      publicDate: null,
      editDate: null,
      tags: [],
      watchCount: null,
      categories: [],
      loading: true,
      comment: {
        email: '',
        commentator: '',
        content: '',
        postId: this.postId,
        isAuthor: false,
        fatherId: '0',
        replyId: '0'
      },
      comments: [],
      placeholder: '来一发吧，大兄弟 (>^ω^<)喵'
    }
  },

  components: {
    MDPreview
  },

  created () {
    this.getPost()
    this.getComments()
  },
  computed: {},

  methods: {
    getPost () {
      this.postId = this.$route.query.id
      post(this.postId).then(res => {
        this.content = res.data.data.content
        this.content = markdown(this.content)
        // console.log(this.content)
        this.title = res.data.data.title
        this.tags = res.data.data.tags
        this.categories = res.data.data.categories
        this.publicDate = res.data.data.publicDate
        this.editDate = res.data.data.editDate
        // // this.watchCount = res.date.data.publicDate
        this.watchCount = res.data.data.watchCount
        this.loading = false
      })
    },
    toTag (tag) {
      this.$store.dispatch('setTag', tag).then(() => {
        this.$router.push({
          path: '/tags/tag',
          query: {
            id: tag.tagId
          }
        })
      })
    },
    getComments () {
      getComments(this.postId).then(res => {
        if (res.data.code !== '200') {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        } else {
          this.comments = []
          this.comments = res.data.data
        }
      })
    },
    postComment () {
      if (this.comment.commentator === '' ||
       this.comment.email === '' ||
       this.comment.content === '') {
        console.log(this.comment.commentator + ' ' + this.comment.email + '' + this.comment.content)
        this.$message({
          message: '请输入昵称、邮箱和评论',
          type: 'error'
        })
        return
      }
      this.comment.postId = this.postId
      let comment = this.comment
      postComment(comment).then(res => {
        if (res.data.code === '200') {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.getComments()
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    replyComment (comment) {
      console.log('回复对象的id是：' + comment.id + ' 回复对象的昵称为：' + comment.commentator + ' 回复对象的父id为：' + comment.fatherId)
      this.placeholder = '@' + comment.commentator
      // this.comment = []
      if (comment.fatherId === '0') {
        this.comment.fatherId = comment.id
      } else {
        this.comment.fatherId = comment.fatherId
      }
      this.comment.replyId = comment.id
      this.comment.content = ''
      this.comment.email = ''
      this.comment.commentator = ''
    }
  }
}

</script>
<style lang='scss' scoped>
// .main {
//   background-color: #f2ebd9;
// }
.content{
  margin-left: 17%;
  width: 80%;
}
.head{
  text-align: center;
  // margin-left: 17%;
  .title {
  font-size:25px;
  padding: 2%;
  }
.detail {
  display: inline-block;
  padding-bottom: 3%;
  font-size: 14px;
  }
}
.tags {
  display: flex;
  flex-direction: row;
  margin-left: 17%;
  padding: 30px 10px;
  .tag{
  margin: 0.5%;
  cursor: pointer;
  }
}
.comment {
  // display: flex;
  // flex-direction: row;
  margin-left: 17%;
  -webkit-box-shadow:0px 3px 3px #c8c8c8 ;
  -moz-box-shadow:0px 3px 3px #c8c8c8 ;
  box-shadow:0px 3px 3px #c8c8c8 ;
  padding: 30px 10px;
  margin-bottom: 1%;
  .comment-top,.comment-top-item {
    display: flex;
    flex-direction: row;
    padding-left: 10px;
    .comment-top-item-text{
      width: 80px;
    }
  }
  .comment-content{

    padding-top: 10px;
    margin-left: 2%;
    .comment-content-input{
      width: 80%;
    }
  }
  .comment-list-empty{
    padding-top: 10px;
    margin-left: 20%;
  }
  .comment-list-father{
    padding-top: 10px;
    margin-left: 2%;
    .comment-list-father-commentatorAndDate{
      font-weight:bold;
      font-size: 15px;
      font-family: Georgia;
    }
  }
  .comment-list-reply{
    //padding-top: 5px;
    margin-left: 3%;
    .comment-list-reply-commentatorAndDate{
      font-weight:bold;
      font-size: 15px;
      font-family: Georgia;
    }
    .comment-list-reply-nickName{
      font-style:italic;
      font-weight:bold;
      font-size: 15px;
      font-family: Georgia;
    }
  }
}
</style>
