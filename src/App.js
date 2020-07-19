import React from 'react';
import './App.css';
import Header from './components/header.js';
import Navigation from './components/navigation.js';
import Strings from './helpers/localization.js'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            language: 'en'
        }
        this.setLanguage = this.setLanguage.bind(this);
    }
    componentDidMount(){
        let lang = localStorage.getItem('language')
        if(lang){
            this.setLanguage(undefined, {value:lang})
        }
    }
    setLanguage(e, data){
        Strings.setLanguage(data.value);
        localStorage.setItem('language', data.value);
        this.setState({
            language: data.value
        })
    }
    render(){
        return (
            <div className="App">
                <Header setLanguage={this.setLanguage} language={this.state.language}/>
                <div className="body-container">
                    <h1>{Strings.manage_campaigns}</h1>
                    <Navigation/>
                </div>
            </div>
        )
    };
}
export default App;
