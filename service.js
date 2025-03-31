const BASE_URL = "https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/country.json"

async function getData() {
    try {
        const res = await fetch(BASE_URL)
        if (!res.ok) {
            throw new Error('There is an error in Elvin"s link')
        }
        const data = await res.json()
        return data
    } 
    catch (err) {
        console.log(err);
    }
}


export { 
    getData
}