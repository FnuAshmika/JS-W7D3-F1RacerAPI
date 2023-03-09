const resultContainer = document.getElementById('result')

async function getRacer(){
  let season = document.getElementById('season').value;
  let round = document.getElementById('round').value;
  try{
    const response = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    const data = await response.json()
    let driverInfo = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    let tableContent = '<thead><tr><th>Position</th><th>Name</th><th>Sponsor</th><th>Points</th></tr></thead>'
    tableContent += '<tbody>'
    for (let i = 0; i < 7; i++) {
      const position = driverInfo[i].position
      const givenName = driverInfo[i].Driver.givenName
      const familyName = driverInfo[i].Driver.familyName
      const name = `${givenName} ${familyName}`
      const sponsor = driverInfo[i].Constructors[0].name
      const points = driverInfo[i].points
      tableContent += `<tr><td>${position}</td><td>${name}</td><td>${sponsor}</td><td>${points}</td></tr>`
    }
    tableContent += '</tbody>'
    resultContainer.innerHTML = `
    <table class="table">${tableContent}</table>`
  }
  catch(error){
    resultContainer.innerHTML = `
      <p>Incorrect Season or Round entered!! Enter correct data.</p>
    `
  }

}
const searchForm = document.getElementById('racerSearch')
searchForm.addEventListener('submit', event => {
  event.preventDefault()
  getRacer()
})

// Add styles to the form
searchForm.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
searchForm.style.border = '1px solid #ced4da'
searchForm.style.padding = '10px'
searchForm.style.margin = '100px'
searchForm.style.display = 'flex'
searchForm.style.justifyContent = 'center'
searchForm.style.alignItems = 'center'

// Add styles to the result container
resultContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
resultContainer.style.border = '1px solid #ced4da'
resultContainer.style.padding = '10px'
resultContainer.style.margin = '100px'
resultContainer.style.display = 'flex'
resultContainer.style.justifyContent = 'center'
resultContainer.style.alignItems = 'center'