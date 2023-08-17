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
/*const rawStory = "In the depths of an[a] jungle, the enigmatic game of Jumanji lay dormant. Those who[v] to roll its dice found themselves thrust into a world of[a] tests and unforeseen mysteries. Conquering the challenges demanded[a] and wit, revealing[a] strengths. With each[n], Jumanji's legend grew, a testament to the indomitable spirit of those who[v] to play."
console.log(rawStory);*/

const objArr = [];

function parseStory(rawStory) {
  console.log(rawStory);
  let dot = /\./g;
  let comma = /, /g;
  let noun = /\[n\]/;
  let verb = /\[v\]/;
  let adj = /\[a\]/;

  rawStory = rawStory.replace(comma, " , ");
  rawStory = rawStory.replace(dot, " .");
  let splitArr = rawStory.split(" ");

  splitArr.forEach((a) => {
    if (noun.test(a)) {
      const obj = {};
      obj["word"] = a.slice(0, a.length - 3);
      obj["pos"] = "noun";
      objArr.push(obj);
    } else if (verb.test(a)) {
      const obj = {};
      obj["word"] = a.slice(0, a.length - 3);
      obj["pos"] = "verb";
      objArr.push(obj);
    } else if (adj.test(a)) {
      const obj = {};
      obj["word"] = a.slice(0, a.length - 3);
      obj["pos"] = "adjective"; // Corrected "adj" to "adjective"
      objArr.push(obj);
    } else {
      const obj = {};
      obj["word"] = a;
      objArr.push(obj);
    }
  });
  return objArr;
}

function madlibsEdit(processedStory) {
  const edit = document.querySelector(".madLibsEdit"); // Using querySelector to select a specific element
  const pre = document.querySelector(".madLibsPreview"); // Using querySelector to select a specific element

  for (const item of processedStory) {
    for (const [key, value] of Object.entries(item)) {
      if (key === "pos") {
        const input = document.createElement("input");
        const span = document.createElement("span");

        span.setAttribute("class", "opacity");
        
input.addEventListener("click",function(){ console.log("it works")});
        if (value === "noun" || value === "verb" || value === "adjective") {
          input.setAttribute("placeholder", value);
          span.innerHTML = ` ${value}`;
          input.addEventListener("input",(e) => (span.innerHTML = e.target.value) );
        }

        edit.appendChild(input);
        pre.appendChild(span);
      } else {
        edit.innerHTML += ` ${value}`; // Using innerHTML to add content
        pre.innerHTML += ` ${value}`;
      }
    }
  }
}

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
    madlibsEdit(processedStory);
  });
