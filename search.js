import { getData } from "./service.js";

let data
async function verData() {
    data = await getData()
    searchCountries()
}
verData()


window.searchCountries = function() {
    document.getElementById("search").addEventListener("input", searchCountries);
    allCards.innerHTML = ""
        let output = ""
        data.filter((country) => country.name.toLowerCase().startsWith(search.value.toLowerCase()))
        .forEach(country => {
            output+= `
                <a href="https://country-explorer-by-atilla.vercel.app/details.html?id=${country.alpha3Code}" class="w-full max-w-sm flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 bg-white dark:bg-gray-800">
                <div class="relative w-full h-48">
                    <img class="w-full h-full object-cover" src="${country.flag}" alt="${country.name} flag">
                    <div class="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white px-2 py-1 rounded text-xs font-semibold">
                        ${country.region}
                    </div>
                </div>
                <div class="p-4 flex-grow">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${country.name}</h2>
                    <div class="space-y-2">
                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span class="text-gray-700 dark:text-gray-300">${country.capital || 'No capital'}</span>
                        </div>
                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="text-gray-700 dark:text-gray-300">${new Intl.NumberFormat().format(country.population)} people</span>
                        </div>
                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            <span class="text-gray-700 dark:text-gray-300">${country.area ? `${new Intl.NumberFormat().format(country.area)} km²` : 'Area unknown'}</span>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex justify-end">
                    <span class="text-sm text-blue-600 dark:text-blue-400 font-medium">View details →</span>
                </div>
            </a>
            `            
        })

        allCards.innerHTML = output
        loadBtn.style.display = "none"
}