"use strict";

const NUMBERS_API_URL = "http://numbersapi.com";

/** Receives a integer number input and makes a fetch request to the
 * Numbers API to receive trivia about that number. Console logs the
 * trivia.
 */
async function showNumberTrivia(num){
  const response = await fetch(`${NUMBERS_API_URL}/${num}?json`)
  // {
  //   method: 'GET',
  //   headers:{
  //     'content-type': 'application/json',
  //   }
  // });
  const numData = await response.json();
  console.log('response is:', response, 'numData is:', numData);
  console.log("Num trivia for is:", numData.text );
}

/** Receives four integer number inputs and makes a fetch request to the
 * Numbers API. Runs promise.race to console log the first trivia answer
 * that returns.
 */
async function showNumberRace(num1, num2, num3, num4){
  const response1 = fetch(`${NUMBERS_API_URL}/${num1}?json`);
  const response2 = fetch(`${NUMBERS_API_URL}/${num2}?json`);
  const response3 = fetch(`${NUMBERS_API_URL}/${num3}?json`);
  const response4 = fetch(`${NUMBERS_API_URL}/${num4}?json`);

  const answerPromise = await Promise.race(
    [response1, response2, response3, response4]);

  const answer = await answerPromise.json();
  console.log("answer=", answer.text);
}


async function showNumberAll(numList){
  const numPromises = [];
  for (let num of numList){
    const response = fetch(`${NUMBERS_API_URL}/${num}?json`);
    numPromises.push(response);
  }

  const results = await Promise.allSettled(numPromises)
  console.log(results)
}
//FIXME: random number generator?