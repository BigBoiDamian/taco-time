const tacoUrl = "http://taco-randomizer.herokuapp.com/random/?full-taco=true";
const wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const output = document.querySelector('.output');
async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}
async function getTaco(url) {

    const tacoJSON = await getJSON(url);
    const tacoProf = tacoJSON.map( async (tacoMap) => {
        const tacoProfJSON = await getJSON(wikiUrl + tacoMap.name);
        return {...tacoJSON};
			});
      return Promise.all(tacoProf);

    }
function generateHTML(data) {
  data.map( taco => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
		section.innerHTML = `
		    <img src=${taco.thumbnail.source}>
		<span>${taco.name}</span>
		    <h2>${taco.recipe}</h2>

		  `;
  });

	}
	window.addEventListener('load', (event) => {
		getTaco(tacoUrl)
.then(generateHTML)
.catch( e => {
output.innerHTML = "<h3 class='text-center'>Something went wrong.</h3>";
console.error(e);
});
});
console.log();
