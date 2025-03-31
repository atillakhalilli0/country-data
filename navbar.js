import { getData } from "./service.js";

let data
async function verData() {
    data = await getData()
    showRegions()
}
verData()  

const navbar = document.getElementById("navbar")
const mobileMenuButton = document.getElementById("mobile-menu-button")
const mobileRegionsMenu = document.getElementById("mobile-regions-menu")

mobileMenuButton.addEventListener("click", () => {
  mobileRegionsMenu.classList.toggle("hidden")
})

function showRegions() {
      const uniqueRegions = [...new Set(data.map(country => country.region).filter(region => region))]
      
      const desktopMenu = document.getElementById("desktop-regions-menu")
      desktopMenu.innerHTML = uniqueRegions.map(region => `
        <a href="https://country-explorer-by-atilla.vercel.app/regions.html?id=${region}" class="px-3 py-2 text-gray-700 hover:text-indigo-600 hover:underline transition duration-300">${region}</a>
      `).join("")
      
      mobileRegionsMenu.innerHTML = uniqueRegions.map(region => `
        <a href="https://country-explorer-by-atilla.vercel.app/regions.html?id=${region}" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">${region}</a>
      `).join("")
}