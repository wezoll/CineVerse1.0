import { useState, useRef } from "react";
import faqData from "../../../db.json";
import "./FAQ.css";

const FAQItem = ({ question, answer, isOpen, index, toggleOpen }) => {
  const contentRef = useRef(null);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => toggleOpen(index)}>
        <span>{question}</span>
        <span className={`faq-icon ${isOpen ? "open" : ""}`}>
          {isOpen ? "-" : "+"}
        </span>
      </div>
      <div
        className="faq-answer-wrapper"
        style={{
          height: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <div className="faq-answer" ref={contentRef}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = faqData.faq;
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Часто задаваемые вопросы</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <FAQItem 
            key={index} 
            question={faq.question} 
            answer={faq.answer} 
            isOpen={openIndex === index}
            index={index}
            toggleOpen={toggleOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;