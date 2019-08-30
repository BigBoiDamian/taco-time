const tacoUrl = "http://taco-randomizer.herokuapp.com/random/?full-taco=true";
const tacoSection = document.getElementById('taco');
const output = document.querySelector('.output');
async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

function generateHTML(tacoRecipe) {

    const section = document.createElement('section');
    output.appendChild(section);

    section.innerHTML = `

		<h2 class="text-center">${tacoRecipe.name}</h2>
		<p>${tacoRecipe.recipe}</p>

		  `;

}
window.addEventListener('load', (event) => {
	output.innerHTML = "<h3 class='text-center temp'>Loading...</h3>";
	const temp = document.querySelector(".temp");
getJSON(tacoUrl)
    .then(generateHTML)
    .catch(e => {
      output.innerHTML = "<h3 class='text-center'>Something went wrong.</h3>";
      console.error(e);
    })
		.finally(temp.remove()) ;
});
