"use strict";

const NUMBERS_API_URL = "http://numbersapi.com";

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
  console.log("Num trivia for is:", numData.text )
}