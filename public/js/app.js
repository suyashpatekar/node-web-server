console.log('Browser script running !')

const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading ...!'
    message2.textContent = ''
    const location = searchLocation.value
    console.log(location)
    getWeather(location)
})

const getWeather = (location) => {
    const url = "http://localhost:3000/weather?address="+location
    fetch(url).then((response) => {
        response.json().then((data) => {          
            if(data.error){
                message1.textContent = data.error                
            }else if(data.forecast){                
                message1.textContent = data.address
                message2.textContent = data.forecast
            }
        })
    })
}