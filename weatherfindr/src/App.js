import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather"

const API_KEY = "fe095c85812ba7b076d2f8747857ed86";


class App extends React.Component{

  // arrows allow u to use this keyword independently without binding
  // you can leave out constructor 
  // arrow means its bound to this component
  // aynsc
  state = {
    temperature: undefined,
    city: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    // prevent default behaviour of refreshing page
    //signifies SPAs
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    // JAVASCRIPT OBJECT NOTATION (JSON) -- converts data to a readable format
    const data = await api_call.json();
    // pass in the variable and call the json METHOD 
    console.log(data);

    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });
  }
  render(){
    return(
      <div> 
        <Titles/>
        {/* setting a prop and making it value as getweather */}
        <Form getWeather={this.getWeather}/>
        <Weather temperature={this.state.temperature}
                 city={this.state.city}
                 country={this.state.country}
                 humidity={this.state.humidity}
                 description={this.state.description}
                 error={this.state.error}
                 />
      </div>
    );
  }
};

export default App;