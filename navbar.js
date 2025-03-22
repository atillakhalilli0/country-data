const navbar = document.getElementById("navbar")
const mobileMenuButton = document.getElementById("mobile-menu-button")
const mobileRegionsMenu = document.getElementById("mobile-regions-menu")

mobileMenuButton.addEventListener("click", () => {
  mobileRegionsMenu.classList.toggle("hidden")
})

function showRegions() {
  fetch("https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/country.json")
    .then((response) => response.json())
    .then((countries) => {
      const uniqueRegions = [...new Set(countries.map(country => country.region).filter(region => region))]
      
      const desktopMenu = document.getElementById("desktop-regions-menu")
      desktopMenu.innerHTML = uniqueRegions.map(region => `
        <a href="http://127.0.0.1:5500/regions.html?id=${region}" class="px-3 py-2 text-gray-700 hover:text-indigo-600 hover:underline transition duration-300">${region}</a>
      `).join("")
      
      mobileRegionsMenu.innerHTML = uniqueRegions.map(region => `
        <a href="http://127.0.0.1:5500/regions.html?id=${region}" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">${region}</a>
      `).join("")
    })
    .catch(error => console.error("Error fetching regions:", error))
}

showRegions()