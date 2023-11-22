import React from "react";
import "./questionPaper.css";
const QuestionPaper = (data) => {
  console.log(data);
  let questions = data.prop;
  // console.log(q)
  let easyQues = questions.filter((obj) => obj.difficulty === "Easy");
  let mediumQues = questions.filter((obj) => obj.difficulty === "Medium");
  let hardQues = questions.filter((obj) => obj.difficulty === "Hard");
  return (
    <div className="questionContainer">
      <div className="questionWrapper">
        <div className="heading">
          <h2>Question Paper</h2>
        </div>
        {easyQues.length > 0 && (
          <div className="Section">
            <div className="sectionHeader">
              <p>{easyQues[0].difficulty}</p>
              <p>{easyQues.length * easyQues[0].marks}</p>
            </div>
            <div className="questionSection">
              {easyQues.map((item, index) => (
                <p>
                {`${index+1}) ${item.question}`}
                </p>
              ))}
            </div>
          </div>
        )}
        <hr className="border"></hr>
        {mediumQues.length > 0 && (
          <div className="Section">
            <div className="sectionHeader">
              <p>{mediumQues[0].difficulty}</p>
              <p>{mediumQues.length * mediumQues[0].marks}</p>
            </div>
            <div className="questionSection">
              {mediumQues.map((item, index) => (
                <p>
                {`${index+1}) ${item.question}`}
                </p>
              ))}
            </div>
          </div>
        )}
        <hr className="border"></hr>
        {/* {hardQues.length > 0  */}
        {hardQues.length > 0 && (
          <div className="Section">
            <div className="sectionHeader">
              <p>{hardQues[0].difficulty}</p>
              <p>{hardQues.length * hardQues[0].marks}</p>
            </div>
            <div className="questionSection">
              {hardQues.map((item, index) => (
                <p>
                  {`${index+1}) ${item.question}`}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPaper;
