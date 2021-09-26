import "./App.css"
import { useEffect, useState } from "react"
function Info() {
  return (
    <div className="info">
      活動日期：2020/12/10 ~ 2020/12/11
      <br />
      活動地點：台北市大安區新生南路二段1號
      <div className="remind">* 必填</div>
    </div>
  )
}

function Question({
  question,
  isRequired,
  placeholderText,
  inputType,
  isRadio,
  other,
  name,
  formValue,
  setFormValue,
  onHandleChangeInput,
  notification,
  isSubmit,
}) {
  return (
    <div className="question">
      <h2>
        {question}
        {isRequired ? <span className="remind__symbol"> *</span> : <p />}
      </h2>
      {other ? (
        <div className="additional__explanation">對活動的一些建議</div>
      ) : (
        <p />
      )}
      {isRadio ? (
        <div className="question__radio">
          <input
            type={inputType}
            className="required__field radio__input"
            name={name}
            value="躺在床上用想像力實作"
            onChange={onHandleChangeInput}
          />{" "}
          躺在床上用想像力實作
          <br />
          <input
            type={inputType}
            className="required__field radio__input"
            name={name}
            value="趴在地上滑手機找現成的"
            onChange={onHandleChangeInput}
          />{" "}
          趴在地上滑手機找現成的
        </div>
      ) : (
        <input
          type={inputType}
          className="required__field text__input"
          placeholder={placeholderText}
          name={name}
          value={formValue.name}
          onChange={onHandleChangeInput}
        />
      )}
      {isSubmit && isRequired && notification ? (
        <div className="notification">此欄為必填</div>
      ) : (
        <p />
      )}
    </div>
  )
}

function SubmitBtn({ formValue, onHandleSubmit }) {
  return (
    <div className="question">
      <input type="submit" value="提交" onClick={onHandleSubmit} />
      <div className="additional__explanation">請勿透過表單送出您的密碼。</div>
    </div>
  )
}

function App() {
  const [formValue, setFormValue] = useState({
    nickname: "",
    email: "",
    phone: "",
    activity: "",
    howToKnow: "",
    other: "",
  })

  const [notification, setNotification] = useState({
    nickname: false,
    email: false,
    phone: false,
    activity: false,
    howToKnow: false,
  })

  let [isSubmit, setIsSubmit] = useState(false)

  const handleOnSubmit = (e) => {
    setIsSubmit(true)
    e.preventDefault()
    if (
      formValue.nickname &&
      formValue.email &&
      formValue.phone &&
      formValue.activity &&
      formValue.howToKnow
    ) {
      alert(`送出資料為：
      ${JSON.stringify(formValue)}`)
    } else {
      alert("資料不完整")
    }
  }

  const handleChangeInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  useEffect(() => {
    setNotification({
      nickname: Boolean(!formValue.nickname),
      email: Boolean(!formValue.email),
      phone: Boolean(!formValue.phone),
      activity: Boolean(!formValue.activity),
      howToKnow: Boolean(!formValue.howToKnow),
    })
  }, [
    formValue.nickname,
    formValue.email,
    formValue.phone,
    formValue.activity,
    formValue.howToKnow,
    isSubmit,
  ])

  return (
    <div>
      <div className="wrapper">
        <h1>新拖延運動報名表單</h1>
        <Info />
        <Question
          question="暱稱"
          isRequired={true}
          placeholderText="您的暱稱"
          inputType="text"
          name="nickname"
          formValue={formValue}
          notification={notification.nickname}
          setFormValue={setFormValue}
          onHandleChangeInput={handleChangeInput}
          isSubmit={isSubmit}
        />
        <Question
          question="電子郵件"
          isRequired={true}
          placeholderText="您的電子郵件"
          inputType="email"
          name="email"
          formValue={formValue}
          setFormValue={setFormValue}
          onHandleChangeInput={handleChangeInput}
          notification={notification.email}
          isSubmit={isSubmit}
        />
        <Question
          question="手機號碼"
          isRequired={true}
          placeholderText="您的手機號碼"
          inputType="text"
          name="phone"
          formValue={formValue}
          setFormValue={setFormValue}
          onHandleChangeInput={handleChangeInput}
          notification={notification.phone}
          isSubmit={isSubmit}
        />
        <Question
          question="報名類型"
          isRequired={true}
          isRadio={true}
          inputType="radio"
          name="activity"
          onHandleChangeInput={handleChangeInput}
          notification={notification.activity}
          isSubmit={isSubmit}
        />
        <Question
          question="怎麼知道這個活動的？"
          isRequired={true}
          placeholderText="您的回答"
          inputType="text"
          name="howToKnow"
          formValue={formValue}
          setFormValue={setFormValue}
          onHandleChangeInput={handleChangeInput}
          notification={notification.howToKnow}
          isSubmit={isSubmit}
        />
        <Question
          question="其他"
          isRequired={false}
          placeholderText="您的回答"
          inputType="text"
          name="other"
          other={true}
          formValue={formValue}
          setFormValue={setFormValue}
          onHandleChangeInput={handleChangeInput}
          isSubmit={isSubmit}
        />
        <SubmitBtn formValue={formValue} onHandleSubmit={handleOnSubmit} />
      </div>
      <footer>© 2020 © Copyright. All rights Reserved.</footer>
    </div>
  )
}

export default App
