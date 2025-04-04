import { getData } from "./service.js";

let data
async function verData() {
    data = await getData()
    detailCountry()
}
verData()   

const countryDetails = document.getElementById("countryDetails");

function detailCountry() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("id");
      const country = data.find((item) => item.alpha3Code == code);

      if (!country) {
        countryDetails.innerHTML = `
                        <div class="flex items-center justify-center h-64">
                            <div class="text-center">
                                <i class="fas fa-map-marker-alt text-red-600 text-5xl mb-4"></i>
                                <h2 class="text-xl text-black">Country not found. Please select a country from the <a href="index.html" class="text-blue-700 underline">list</a></h2>
                            </div>
                        </div>
                    `;
        return;
      }

      const formattedPopulation = new Intl.NumberFormat().format(
        country.population
      );

      const formattedArea = country.area
        ? `${new Intl.NumberFormat().format(country.area)} km²`
        : "N/A";

      const languages = country.languages.map((lang) => lang.name).join(", ");

      const currencies = country.currencies
        .map((curr) => `${curr.name} (${curr.symbol || "N/A"})`)
        .join(", ");

      const timezones = country.timezones.join(", ");

      const borders =
        country.borders && country.borders.length > 0
          ? country.borders
              .map(
                (border) =>
                  `<a href="https://country-explorer-by-atilla.vercel.app/details.html?id=${border}" class="text-purple-700 hover:underline">${border}</a>`
              )
              .join(", ")
          : "None (Island or no land borders)";

      countryDetails.innerHTML = `
                    <div class="bg-blue-950 border-[3px] border-red-900 rounded-lg shadow-xl overflow-hidden">
                        <!-- Country Header -->
                        <div class="relative h-48 md:h-64 w-full">
                            <img src="${country.flag}" alt="${
        country.name
      } flag" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-black bg-opacity-40"></div>
                            <div class="absolute bottom-0 left-0 p-6 z-20 w-full">
                                <div class="flex flex-col text-center  items-center">
                                    <img src="${country.flag}" alt="${
        country.name
      } flag" class="h-16 md:h-20 rounded shadow-lg border border-gray-600">
                                    <div class="ml-4">
                                        <h1 class="text-3xl md:text-4xl font-bold text-white">${
                                          country.name
                                        }</h1>
                                        <p class="text-gray-300">${
                                          country.nativeName
                                        }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Country Content -->
                        <div class="p-4 md:p-6">
                            <!-- Quick Facts -->
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                                <div class="bg-gray-800 p-3 rounded-lg shadow-md border border-gray-700 transform hover:-translate-y-1 transition duration-300">
                                    <div class="flex items-center">
                                        <div class="rounded-full bg-blue-500 bg-opacity-20 p-2 mr-2">
                                            <i class="fas fa-city text-blue-400"></i>
                                        </div>
                                        <div>
                                            <p class="text-xs text-gray-400">Capital</p>
                                            <p class="font-semibold text-sm md:text-base">${
                                              country.capital || "N/A"
                                            }</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-800 p-3 rounded-lg shadow-md border border-gray-700 transform hover:-translate-y-1 transition duration-300">
                                    <div class="flex items-center">
                                        <div class="rounded-full bg-green-500 bg-opacity-20 p-2 mr-2">
                                            <i class="fas fa-users text-green-400"></i>
                                        </div>
                                        <div>
                                            <p class="text-xs text-gray-400">Population</p>
                                            <p class="font-semibold text-sm md:text-base">${formattedPopulation}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-800 p-3 rounded-lg shadow-md border border-gray-700 transform hover:-translate-y-1 transition duration-300">
                                    <div class="flex items-center">
                                        <div class="rounded-full bg-purple-500 bg-opacity-20 p-2 mr-2">
                                            <i class="fas fa-globe-americas text-purple-400"></i>
                                        </div>
                                        <div>
                                            <p class="text-xs text-gray-400">Region</p>
                                            <p class="font-semibold text-sm md:text-base">${
                                              country.region
                                            }</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-800 p-3 rounded-lg shadow-md border border-gray-700 transform hover:-translate-y-1 transition duration-300">
                                    <div class="flex items-center">
                                        <div class="rounded-full bg-yellow-500 bg-opacity-20 p-2 mr-2">
                                            <i class="fas fa-map-marker-alt text-yellow-400"></i>
                                        </div>
                                        <div>
                                            <p class="text-xs text-gray-400">Subregion</p>
                                            <p class="font-semibold text-sm md:text-base">${
                                              country.subregion
                                            }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Detailed Information -->
                            <div class="flex flex-col md:flex-row gap-4">
                                <div class="w-full md:w-1/2 space-y-4">
                                    <!-- General Info -->
                                    <div class="bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700 hover:bg-gray-750 transition duration-300">
                                        <h2 class="text-lg font-bold mb-3 border-b border-gray-700 pb-2">
                                            <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                                            General Information
                                        </h2>
                                        <div class="space-y-2 text-sm md:text-base">
                                            <div class="flex justify-between">
                                                <span class="text-gray-400">Alpha Code:</span>
                                                <span class="font-medium">${
                                                  country.alpha3Code
                                                }</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-gray-400">Area:</span>
                                                <span class="font-medium">${formattedArea}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-gray-400">Calling Code:</span>
                                                <span class="font-medium">+${
                                                  country.callingCodes[0]
                                                }</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-gray-400">Top Level Domain:</span>
                                                <span class="font-medium">${
                                                  country.topLevelDomain[0]
                                                }</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Cultural Info -->
                                    <div class="bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700 hover:bg-gray-750 transition duration-300">
                                        <h2 class="text-lg font-bold mb-3 border-b border-gray-700 pb-2">
                                            <i class="fas fa-language text-green-400 mr-2"></i>
                                            Cultural
                                        </h2>
                                        <div class="space-y-2 text-sm md:text-base">
                                            <div class="flex justify-between">
                                                <span class="text-gray-400 mb-1">Languages:</span>
                                                <span class="font-medium">${languages}</span>
                                            </div>
                                            <div class="flex justify-between mt-2">
                                                <span class="text-gray-400 mb-1">Currencies:</span>
                                                <span class="font-medium">${currencies}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="w-full md:w-1/2 space-y-4">
                                    <!-- Geographical Info -->
                                    <div class="bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700 hover:bg-gray-750 transition duration-300">
                                        <h2 class="text-lg font-bold mb-3 border-b border-gray-700 pb-2">
                                            <i class="fas fa-map text-purple-400 mr-2"></i>
                                            Geographical
                                        </h2>
                                        <div class="space-y-2 text-sm md:text-base">
                                            <div class="flex justify-between">
                                                <span class="text-gray-400">Latitude/Longitude:</span>
                                                <span class="font-medium">${country.latlng.join(
                                                  ", "
                                                )}</span>
                                            </div>
                                            <div class="flex justify-between mt-2">
                                                <span class="text-gray-400 mb-1">Borders:</span>
                                                <span class="font-medium">${borders}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Time Info -->
                                    <div class="bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700 hover:bg-gray-750 transition duration-300">
                                        <h2 class="text-lg font-bold mb-3 border-b border-gray-700 pb-2">
                                            <i class="fas fa-clock text-yellow-400 mr-2"></i>
                                            Time
                                        </h2>
                                        <div class="space-y-2 text-sm md:text-base">
                                            <div class="flex flex-col">
                                                <span class="text-gray-400 mb-1">Timezones:</span>
                                                <span class="font-medium">${timezones}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Actions -->
                                    <div class="bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700">
                                        <h2 class="text-lg font-bold mb-3 border-b border-gray-700 pb-2">
                                            <i class="fas fa-link text-red-400 mr-2"></i>
                                            Actions
                                        </h2>
                                        <div class="grid grid-cols-2 gap-3">
                                            <a href="#" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-center transition duration-300 flex items-center justify-center">
                                                <i class="fas fa-map-marked-alt mr-2"></i> Map
                                            </a>
                                            <a href="#" class="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md text-center transition duration-300 flex items-center justify-center">
                                                <i class="fas fa-chart-line mr-2"></i> Statistics
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
}