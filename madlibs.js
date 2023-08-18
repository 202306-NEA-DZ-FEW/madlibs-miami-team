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
function parseStory(rawStory) {
  // Your code here.
  rawStory = rawStory.replace(/\./g, " .");
  rawStory = rawStory.replace(/\,/g, " ,");
  let arrWord = rawStory.split(" ");
  let storyToObj = [];
  arrWord.forEach((item) => {
    if (item.match(/[[a-zA-Z]]/g)) {
      let key = item.split("[");
      switch (key[1]) {
        case "n]":
          storyToObj.push({
            word: key[0],
            pos: "noun",
          });
          break;
        case "v]":
          storyToObj.push({
            word: key[0],
            pos: "verb",
          });

          break;
        case "a]":
          storyToObj.push({
            word: key[0],
            pos: "adjective",
          });
        default:
          break;
      }
    } else {
      storyToObj.push({
        word: item,
      });
    }
  });
  return storyToObj;
}
/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 *
 */

function madlibsEdit(processedStory) {
  const edit = document.querySelector(".madLibsEdit"); // Using querySelector to select a specific element
  const pre = document.querySelector(".madLibsPreview"); // Using querySelector to select a specific element

  for (const item of processedStory) {
    if (item.pos) {
      const input = document.createElement("input");
      const span = document.createElement("span");

      span.setAttribute("class", "opacity");
      edit.appendChild(input);
      pre.appendChild(span);

      input.setAttribute("placeholder", item.pos);
      input.setAttribute("maxlength", "20");
      span.innerHTML = ` ${item.pos}`;

      input.addEventListener("input", (e) => {
        (span.innerHTML = ` ${e.target.value}`),
          span.classList.add("noopacity");
      });
    } else {
      edit.append(` ${item.word} `);
      pre.append(` ${item.word} `);
    }
  }
}

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    madlibsEdit(processedStory);
  });
