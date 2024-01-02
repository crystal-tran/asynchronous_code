"use strict";

const NUMBERS_API_URL = "http://numbersapi.com";

/** Receives a integer number input and makes a fetch request to the
 * Numbers API to receive trivia about that number. Console logs the
 * trivia.
 */
async function showNumberTrivia(num) {
  const response = await fetch(`${NUMBERS_API_URL}/${num}?json`);
  // {
  //   method: 'GET',
  //   headers:{
  //     'content-type': 'application/json',
  //   }
  // });
  const numData = await response.json();
  console.log('response is:', response, 'numData is:', numData);
  console.log("Num trivia for is:", numData.text);
}

/** Receives four integer number inputs and makes a fetch request to the
 * Numbers API. Runs promise.race to console log the first trivia answer
 * that returns.
 */
async function showNumberRace(num1, num2, num3, num4) {
  const response1 = fetch(`${NUMBERS_API_URL}/${num1}?json`);
  const response2 = fetch(`${NUMBERS_API_URL}/${num2}?json`);
  const response3 = fetch(`${NUMBERS_API_URL}/${num3}?json`);
  const response4 = fetch(`${NUMBERS_API_URL}/${num4}?json`);

  const answerPromise = await Promise.race(
    [response1, response2, response3, response4]);

  const answer = await answerPromise.json();
  console.log("answer=", answer.text);
}


async function showNumberAll(numList) {
  const numPromises = [];
  for (let num of numList) {
    const response = fetch(`${NUMBERS_API_URL}/${num}?json`);
    numPromises.push(response);
  }

  const results = await Promise.allSettled(numPromises);
  console.log("results:", results);

  const numData = [];
  for(let result of results){
    const data = await result.value.json();
    numData.push(data);
  }

  // const numData = results.map( r => r.json())

  console.log('numData is', numData);

  const okResponses = results.filter(r => r.status === "fulfilled" && r.value.ok === true)
  const trivias = okResponses.map(r => r.value.json());
  console.log('trivias is:', trivias);



  console.log('okResponses', okResponses);
  // const test = await Promise.all(okResponses);
  // return test;
  // const promiseResolved = results.filter( x => x.value.status = 200);
  // const promiseRejected = results.filter( x => x.value.status = 404);

  // console.log('showNumber All fulfilled:', promiseResolved,
  // 'showNumber All rejected:', )
}
//FIXME: random number generator?