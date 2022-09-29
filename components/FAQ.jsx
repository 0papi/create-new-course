import { useState } from "react";
import Dropdown from "./Dropdown";

import styles from "../styles/home.module.scss";
import { faqData } from "./data";

export default function FAQs() {
  const [faq, setFaq] = useState(faqData);

  const [formData, setFormData] = useState({
    question: "",
    response: "",
  });

  const { question, response } = formData;

  function onChange(e) {
    setFormData((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  }

  function onAddNewFaq() {
    setFaq((prevFaq) => [
      ...prevFaq,
      { id: prevFaq.length + 1, question: question, response: response },
    ]);

    setFormData((prev) => ({
      ...prev,
      question: "",
      response: "",
    }));
  }

  return (
    <div>
      {/* FAQ DISPLAY HERE */}
      {faq.length !== 0 ? (
        <>
          {faq.map((faq) => (
            <div key={faq.id}>
              <p>{faq.question}</p>
              <p>{faq.response}</p>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
      {/* FAQ INPUTS */}
      <div>
        <input
          type="text"
          placeholder="write your question here"
          name="question"
          value={question}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="write your response here"
          name="response"
          value={response}
          onChange={onChange}
        />
        <p onClick={onAddNewFaq}>+Add another FAQ</p>
      </div>

      <Dropdown />
    </div>
  );
}
