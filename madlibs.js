/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */

const progressFill = document.querySelector(".progress-fill"),
  progressLoadNum = document.querySelector(".progress-load-num")
let progressFillWidth = 10

let id = setInterval(() => {
  if (progressFillWidth >= 300) {
    clearInterval(id);
  } else {
    progressFillWidth += 2
    progressLoadNum.innerText = parseInt(100 * progressFillWidth / 300) + "%"
    progressFill.style.width = progressFillWidth + "px";
  }
}, 11)

setTimeout(() => {
  const content = document.getElementById("content")
  content.style.opacity = 1
  content.style.display = "block"
  document.getElementById("loading").style.display = "none";
}, 4000);

///// Start btn
const startBtn = () => {
  const bab1 = document.querySelector(".bab1")
  const bab2 = document.querySelector(".bab2")
  const container = document.querySelector(".start-page")
  bab1.classList.add("bab1Anim")
  bab2.classList.add("bab2Anim")
  setTimeout(() => {
    container.style.display = 'none'
  }, 2100);
}

///// sound btn 
const soundBtn = () => {
  const icon = document.querySelector(".checkbox img")
  let opacity = icon.style.opacity
  opacity == 1 ? icon.style.opacity = "0%" : icon.style.opacity = "100%"
}




function parseStory(rawStory) {
  // Your code here.
  rawStory = rawStory.replace(/\./g, ' .')
  rawStory = rawStory.replace(/\,/g, ' ,')
  let arrWord = rawStory.split(" ")
  let storyToObj = []
  arrWord.forEach(item => {
    if (item.match(/[[a-zA-Z]]/g)) {
      let key = item.split("[")
      switch (key[1]) {
        case "n]":
          storyToObj.push({
            word: key[0],
            pos: "noun"
          })
          break;
        case "v]":
          storyToObj.push({
            word: key[0],
            pos: "verb"
          })
          break;
        default:
          break;
      }
    } else {
      storyToObj.push({
        word: item
      })
    }
  });
  return storyToObj
}
/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {

});

