const express = require("express");
const bodyParser = require("body-parser"); 

var cors = require("cors");
const questions = require("./questionStore.json"); // Load questions from a JSON file

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//filtering questions based on difficulty
let easyQues = questions.filter((obj) => obj.difficulty == "Easy");
let mediumQues = questions.filter((obj) => obj.difficulty == "Medium");
let hardQues = questions.filter((obj) => obj.difficulty == "Hard");

app.post("/generate_paper", async (req, res) => {
  const totalScore = req.body.totalmarks;
  const easyPercent = req.body.easy;
  const mediumPercent = req.body.medium;
  const hardPercent = req.body.hard;

  const easyMarks = (easyPercent / 100) * totalScore;
  const mediumMarks = (mediumPercent / 100) * totalScore;
  const hardMarks = (hardPercent / 100) * totalScore;

  const easyCount = Math.floor(easyMarks / 5);
  const mediumCount = Math.floor(mediumMarks / 10);
  const hardCount = Math.floor(hardMarks / 20);

  const randomEasyQues = getQuestions(easyQues, easyCount);
  const randomMediumQues = getQuestions(mediumQues, mediumCount);

  const randomHardQues = getQuestions(hardQues, hardCount);

  let finalScore =easyCount * 5 + mediumCount * 10 + hardCount * 20;
  let result = [];
  result = [...randomEasyQues, ...randomMediumQues, ...randomHardQues];
  
  console.log(finalScore)
  let diff = totalScore - finalScore;
  console.log(diff);

  //handling edge cases

  if (diff == 10) {
    console.log(diff);
    if (easyPercent > mediumPercent) {
      let extraQuestion = getQuestions(easyQues, 2);
      if (easyQues.includes(extraQuestion[0]) || easyQues.includes(extraQuestion[1])) extraQuestion=getQuestions(easyQues,2);
      result = [...extraQuestion, ...result];
    } else {
      let extraQuestion = getQuestions(mediumQues, 1);
      if (mediumQues.includes(extraQuestion)) extraQuestion=getQuestions(mediumQues,1);  
      result = [...extraQuestion, ...result];
    }
  
  }
  if (diff==5){
    let extraQuestion = getQuestions(easyQues, 1);
    if (easyQues.includes(extraQuestion)) extraQuestion=getQuestions(easyQues,1);  
  }

  res.json(result);
});



const getQuestions = (arr, count) => {
  const shuffledArray = arr.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, count);
};

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
