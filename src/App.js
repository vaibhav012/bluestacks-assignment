import React from 'react';
import './App.css';
import Header from './components/header.js';
import Navigation from './components/navigation.js';
import Strings from './helpers/localization.js'

class App extends React.Component {
    constructor(props){
        super(props);
        //Initial Default Language Initialised
        this.state = {
            language: 'en'
        }
        this.setLanguage = this.setLanguage.bind(this);
    }
    componentDidMount(){
        //Check if previously stored language is stored in storage. If YES? Change language accordingly.
        let lang = localStorage.getItem('language')
        if(lang){
            this.setLanguage(undefined, {value:lang})
        }
    }
    //Function to Change Language when selected from dropdown.
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
                    <Navigation/>
                </div>
            </div>
        )
    };
}
export default App;
