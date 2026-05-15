import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa6";

function FAQItem({ question, answer, answers,answerTwo }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  const answerId = `faq-answer-${question.toLowerCase().replace(/\s+/g, '-')}`;

  return ( 
    <div className="bg-[#D9E8F4] rounded-xl">
      <div className="p-3 md:p-5 xl:px-[50px] xl:py-[22px] flex justify-between items-center">
        <p className="text-[15px] md:text-[24px] font-semibold">{question}</p>
        <button
          onClick={toggleAnswer}
          className="bg-[#002748] w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-xl flex items-center justify-center cursor-pointer transition-transform duration-200"
          aria-expanded={isOpen}
          aria-controls={answerId}
          type="button"
        >
          <span className={`text-white text-xl md:text-2xl transition-transform duration-1000 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <FaChevronDown />
          </span>
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`} id={answerId}>
        <div className="py-1 px-3 md:p-5 xl:px-[50px] xl:py-[22px] text-[16px] md:text-[24px] font-medium">
          {answer && <p>{answer}</p>}
          {answers && (
            <ul className="list-decimal pl-5 space-y-2">
              {answers.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
          {answerTwo && <p>{answerTwo}</p>}
        </div>
      </div>
    </div>
  );
}

export default FAQItem;
