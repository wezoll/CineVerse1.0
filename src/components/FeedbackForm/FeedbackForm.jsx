import React, { useState } from "react";
import "./FeedbackForm.css";
import { TELEGRAM_API_URL, TELEGRAM_CHAT_ID } from "./telegramConfig";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendToTelegram = async (data) => {
    const text = `
🔔 Новое сообщение с сайта!

👤 Имя: ${data.name}
📧 Email: ${data.email}
💬 Сообщение: ${data.message}

💡Свяжитесь с пользователем как можно скорее.
    `;

    try {
      const response = await fetch(TELEGRAM_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'HTML'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Telegram API error: ${errorData.description}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log("Отправляемые данные:", formData);
      await sendToTelegram(formData);
      
      setSubmitStatus({ success: true, message: "Сообщение успешно отправлено!" });
      
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-content">
        <div className="feedback-form-container">
          <h2 className="feedback-title">Обратная связь</h2>
          <h3 className="feedback-description">
            Если у вас какие то вопросы или предложения - заполните форму ниже.
          </h3>

          {submitStatus && (
            <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Электронная почта</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Сообщение</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                required
              />
            </div>

            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </button>
          </form>
        </div>

        <div className="feedback-logo-container">
          <img
            src="/CineVerse//Feedback.svg"
            alt=""
            className="feedback-logo"
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;