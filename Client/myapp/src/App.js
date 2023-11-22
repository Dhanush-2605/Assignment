import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import QuestionPaper from "./components/questionPaper";
function App() {
  const [totalMarks, setTotalMarks] = useState();
  const [easyPercent, setEasyPercent] = useState();
  const [mediumPercent, setMediumPercent] = useState();
  const [hardPercent, setHardPercent] = useState();
  const [generatedPaper, setGeneratedPaper] = useState([]);

  const generateQuestionPaper = async () => {
    try {
      const data = {
        totalmarks: totalMarks,
        easy: easyPercent,
        medium: mediumPercent,
        hard: hardPercent,
      };
      // console.log(data);
      if (!totalMarks || !easyPercent || !mediumPercent || !hardPercent){
        alert("fill all details")
      }
      else{
      const response = await axios.post(
        "http://localhost:8080/generate_paper",
        data
      );
      // console.log(response);
      setGeneratedPaper(response.data);
    } 
  }catch (error) {
      console.error("Error generating paper:", error);
    }
  
  };
  return (
    <div className="appContainer">
      <div className="appWrapper">
        {generatedPaper.length > 0 ? (
          <QuestionPaper prop={generatedPaper} />
        ) : (
          <div className="generatorDiv">
            <h2>Question Paper Generator</h2>
            <div className="inputDiv">
              <label>Total Marks:</label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
              />
            </div>

            <br />
            <div className="inputDiv">
              <label>Easy %:</label>
              <input
                type="number"
                value={easyPercent}
                onChange={(e) => setEasyPercent(e.target.value)}
              />
            </div>

            <br />
            <div className="inputDiv">
              {" "}
              <label>Medium %:</label>
              <input
                type="number"
                value={mediumPercent}
                onChange={(e) => setMediumPercent(e.target.value)}
              />
            </div>

            <br />
            <div className="inputDiv">
              <label>Hard %:</label>
              <input
                type="number"
                value={hardPercent}
                onChange={(e) => setHardPercent(e.target.value)}
              />
            </div>

            <br />
            <button className="generateButton" onClick={generateQuestionPaper}>
              Generate Paper
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
