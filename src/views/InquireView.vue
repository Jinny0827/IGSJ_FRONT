<template>
  <div class="inquire-box">
    <header class="inquire-title">
      <h4 class="inquire-tit">나의 1:1문의내역</h4>
      <hr>
    </header>
    <div class="inquire-contents">
      <div class="section_form">
        <div class="area">
          <header class="n-section-title">
            <h4 class="tit">{{ this.inquireInfo.inquireNum }}. 문의내역</h4>
          </header>
          <!-- 문의내용 -->
          <div class="inq-con">
          <table class="n-table table-row">
            <tbody>
              <tr>
                <th scope="row">작성자</th>
                <td>
                  <input type="text" class="n-input" v-model="this.inquireInfo.userId" readonly />
                </td>
              </tr>
              <tr>
                <th scope="row">작성날짜</th>
                <td>
                  <input id="reg_date" type="text" class="n-input" v-model="this.inquireInfo.inquireRegDate" readonly />
                </td>
              </tr>
              <tr>
                <th scope="row">제목</th>
                <td>
                  <input type="text" class="n-input" name="subject" v-model="this.inquireInfo.inquireTitle" readonly />
                </td>
              </tr>
              <tr class="n-same-row">
                <th scope="row">문의내용</th>
                <td>
                  <textarea name="qa_msg" cols="100" rows="100" class="textarea-input"
                  readonly>{{ this.inquireInfo.inquireContent }}</textarea>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          <!-- 문의내용 -->
          
          <!-- 답글내용 -->
          <div class="ans-content" v-if="this.answerInfo.ansContent != undefined">
            <h4 class="tit">{{ this.inquireInfo.inquireNum }}. 문의 답변</h4>
            <table class="n-table table-row">
              <tbody>
                <tr class="n-same-row">
                  <th scope="row">답변내용</th>
                  <td>
                    <textarea name="qa_msg" cols="100" rows="100" class="textarea-input"
                    readonly>{{ answerInfo.ansContent }}</textarea>
                  </td>
                </tr>
                <tr>
                  <th scope="row">작성날짜</th>
                  <td>
                    <span id="reg_date" type="text" class="n-input" readonly>
                      {{ convertTime(answerInfo.ansRegDate) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="ans-x" v-else>
            <h4>답변 내역이 없습니다.</h4>
          </div>
        </div>
      </div>
    </div>
    <!-- 답글내용 -->
    <div class="btn-gr">
      <router-link :to="{ name: 'AnswerWrite', params: { inquireNum: this.inquireInfo.inquireNum } }">
        <button type="button" class="n-btn btn-ans">답변하기</button>
      </router-link>

      <router-link :to="{ name: 'InquireModify', params: { inquireNum: this.inquireInfo.inquireNum } }">
        <button type="button" class="n-btn btn-mo">문의수정</button>
      </router-link>

      <button type="button" class="n-btn btn-del" @click="inquireDel()">삭제하기</button>

      <router-link to="/inquire/InquireList">
        <button type="button" class="n-btn btn-mo">목록으로</button>
      </router-link>
    </div>
  </div>

  
</template>

<script>
export default {
  data() {
    return {

      inquireInfo: {
        userId: "",
        inquireNum: "",
        pno: "",
        inquireTitle: "",
        inquireContent: "",
        inquireRegDate: "",
      },

      answerInfo: {
        ansContent: '',
        ansRegDate: ''
      }
    };
  },
  created() {
    this.inquireNum = this.$route.params.inquireNum;
    this.getinquireNum(this.inquireNum);
    this.answerList(this.inquireNum);
  },
  methods: {
    // 게시글 불러오기위해 List에서 넘겨준 데이터를 받아내야함
    getinquireNum(inquireNum) {
      this.$axios
        .get(this.$serverUrl + "/inquire/InquireView?inquireNum=" + inquireNum)
        .then((res) => {
          this.inquireInfo = res.data;
          this.inquireInfo.inquireRegDate = this.convertTime(
            this.inquireInfo.inquireRegDate
          );

          console.log(this.convertTime(
            this.inquireInfo.inquireRegDate
          ));
        })
        .catch((err) => {
          if (err.message.indexOf("Network Error") > -1) {
            alert("Error");
          }
        });
    },
    // 답글내역
    answerList(inquireNum) {
      this.$axios
        .get(this.$serverUrl + "/answer/AnswerList?inquireNum=" + inquireNum)

        .then((res) => {
          this.answerInfo = res.data;
          console.log(this.answerInfo.ansContent)

        })
        .catch((err) => {
          this.error = err.message;

        });
    },
    // 문의 삭제
    inquireDel() {
      if (confirm("문의사항을 삭제하시겠습니까?\n삭제된정보는 복구되지 않습니다.")) {
        this.$axios.post(this.$serverUrl + '/inquire/InquireDelete/' + this.inquireInfo.inquireNum)
          .then((res) => {
            if (res.data == true) {
              alert("문의사항 삭제가 완료되었습니다.")

              location.href = "/inquire/InquireList";
            } else {
              alert("삭제에 실패하였습니다.")

              return false;
            }

          }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
              alert('Error')
            }
          })
      } else {
        alert("삭제를 취소하셨습니다.");

        return false;
      }
    },
    // 시간변환
    convertTime(noticeTime) {
      var time = new Date(noticeTime).getTime();
      var date = new Date(time);
      let noticeYear = date.getFullYear();
      let noticeMonth = date.getMonth() + 1;
      let noticeDate = date.getDate();
      let noticeHour = date.getHours();
      let noticeMin = date.getMinutes();
      let noticeSec = date.getSeconds();

      let fullDate =
        noticeYear + "-" + noticeMonth + "-" + noticeDate + " " + noticeHour + ":" + noticeMin + ":" + noticeSec;

      return fullDate;
    }
  },
};
</script>

<style scoped>
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: top;
  background: transparent;
}

ul {
  padding: 0;
  list-style: none;
}

hr {
  margin: 0;
}

body {
  margin: 0;
}

.inquire-tit {
  margin: 0;
  padding: 20px;
  font-weight: 600;
}

.inquire-box {
  min-height: 800px;
  display: flex;
  flex-direction: column;
}

.inquire-contents {
  padding: 20px;
  line-height: 20px;
}

.n-section-title {
  border-bottom: 2px solid #ccc;
  padding: 10px 0;
  line-height: 1.5;
  font-size: 14px;
  position: relative;
}

.n-table {
  width: 100%;
  line-height: 1.5;
  font-size: 14px;
  border-collapse: collapse;
  table-layout: fixed;
  border-bottom: 2px solid #ccc;
}

.n-table th {
  width: 170px;
  padding-top: 22px;
  padding-right: 20px;

}

.n-table.table-row th {
  text-align: left;
  font-weight: normal;
  vertical-align: top;
}

.n-table.table-row th,
.n-table.table-row td {
  height: auto;
  padding: 15px 0;
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
  border-bottom: none;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
}

.n-input {
  width: 100%;
  height: 32px;
  padding: 5px 6px;
  border: none;
  background-color: #ffffff;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  transition: border 0.2s ease-in-out;
  pointer-events: none;
}

.n-input:focus {
  outline: none;
}

.textarea-input {
  width: 100%;
  height: 150px;
  padding: 5px 6px;
  border: none;
  background-color: #ffffff;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  transition: border 0.2s ease-in-out;
  pointer-events: none;
}

.inq-con {
}

.ans-x {
  height: 90px;
  background-color: #f1f1f1;
}

.ans-x h4  {
  margin: 0;
  padding: 30px 0;
  text-align: center;
}

.ans-content {
  background-color: #f2f2f2;
}

.ans-content h4 {
  margin: 0;
  padding: 10px 0;
}

.ans-content .textarea-input {
  background-color: #f2f2f2;
}

.ans-content .n-input {
  background-color: #f2f2f2;
}

.ans-content .n-same-row {
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.ans-content > .n-table.table-row th  {
  text-align: center;
  vertical-align: inherit;
}


.btn-gr {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}


.n-btn {
  display: inline-block;
  min-width: 100px;
  height: 40px;
  line-height: 36px;
  color: #ffffff;
  box-sizing: border-box;
  padding: 2px 8px 0 8px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  vertical-align: middle;
}

.n-btn.btn-mo {
  border: 1px solid #f1f1f1;
  background-color: #f1f1f1;
  color: #000000;
}

.n-btn.btn-mo:hover {
  background-color: #c3c3c3be;
  transition: background 0.3s ease-in-out;
}

.n-btn.btn-del {
  border: none;
  background-color: #000000;
}

.n-btn.btn-del:hover {
  border: none;
  background-color: #0a3bffbe;
  transition: background 0.3s ease-in-out;
}

.n-btn.btn-ans{
  border: none;
  background-color: #000000;
}

.n-btn.btn-ans:hover {
  border: none;
  background-color: #0a3bffbe;
  transition: background 0.3s ease-in-out;
}

textarea{
  resize: none;
}
  

</style>
