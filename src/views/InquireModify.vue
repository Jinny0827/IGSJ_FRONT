<template>
  <div class="inquire-box">
    <header class="inquire-title">
      <h1 class="tit">나의 1:1문의내역</h1>
    </header>
    <div class="inquire-contents">
      <div class="section_form">
        <div class="area">
          <header class="n-section-title">
            <h2 class="tit">{{ this.inquireInfo.inquireNum }} 번 문의내역</h2>
          </header>
          <table class="n-table table-row">
            <tbody>
              <tr>
                <th scope="row">작성자</th>
                <td>
                  <input
                    type="text"
                    class="n-input"
                    v-model="this.inquireInfo.userId"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">작성날짜</th>
                <td>
                  <input
                    id="reg_date"
                    type="text"
                    class="n-input"
                    v-model="this.inquireInfo.inquireRegDate"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">제목</th>
                <td>
                  <input
                    type="text"
                    class="n-input"
                    name="subject"
                    v-model="this.inquireInfo.inquireTitle"
                  />
                </td>
              </tr>
              <tr class="n-same-row">
                <th scope="row">문의내용</th>
                <td>
                  <textarea
                    name="qa_msg"
                    cols="100"
                    rows="100"
                    class="textarea-input"
                    >{{ this.inquireInfo.inquireContent }}</textarea
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="btn-updatebtn">
        <router-link to="/inquire/InquireUpdate" @click="inquireUpdate(this.inquireNum)">
          <button type="button">수정완료</button>
        </router-link>
        <router-link to="/inquire/InquireList">
          <button type="button">목록으로</button>
        </router-link>
      </div>
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
    };
  },
  created() {
    this.inquireNum = this.$route.params.inquireNum;
    this.getinquireNum(this.inquireNum);
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
        })
        .catch((err) => {
          if (err.message.indexOf("Network Error") > -1) {
            alert("Error");
          }
        });
    },
    // 수정완료 갈겼을때
    inquireUpdate(inquireNum) {
      this.$axios
        .post(this.$serverUrl + "/inquire/InquireUpdate", {
          inquireNum: inquireNum,
          inquireTitle: this.inquireInfo.inquireTitle,
          inquireContent: this.inquireInfo.inquireContent,
        })
        .then((res) => {
          // 경우의 수가 2가지일때는 최소한의 보안을 위해 boolean 타입으로 진행한다.
          // int는 0과 1이 대부분이라 보안에 매우 취약하다. 반면 boolean은 true false지만 흔한 해킹 기법으로 시도시 undifined로 뜬다.
          if (res.data == true) {
            alert("수정이 완료되었습니다.");

            location.href = "/inquire/InquireList";
          } else {
            alert("수정에 실패하였습니다.");

            return false;
          }
        })
        .catch((err) => {
          if (err.message.indexOf("Network Error") > -1) {
            alert("Error");
          }
        });
    },
    // 시간변환
    convertTime(noticeTime) {
      var time = new Date(noticeTime).getTime();
      var date = new Date(time);
      let noticeYear = date.getFullYear();
      let noticeMonth = date.getMonth() + 1;
      let noticeDate = date.getDate();

      let fullDate =
        noticeYear + "년 - " + noticeMonth + "월 - " + noticeDate + "일";

      return fullDate;
    },
  },
};
</script>

<style scoped>
.inquire-contents {
  padding: 10px;
  line-height: 20px;
}
.contents-title h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.contents-title span {
  font-size: 15px;
  color: #4d4d4d;
  margin-bottom: 10px;
}

.n-btn-view {
  min-height: 32px;
  text-align: left;
  padding-top: 20px;
  clear: both;
  position: relative;
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
.n-btn.btn-wr {
  border: 1px solid #f1f1f1;
  background-color: #f1f1f1;
  color: #000000;
}
.n-btn.btn-wr:hover {
  background-color: #c3c3c3be;
  transition: background 0.3s ease-in-out;
}
.n-btn.btn-list {
  border: none;
  background-color: #000000;
}
.n-btn.btn-list:hover {
  border: none;
  background-color: #0a3bffbe;
  transition: background 0.3s ease-in-out;
}
</style>
