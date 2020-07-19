import React from 'react';
import { Tab, Loader } from 'semantic-ui-react'
import Campaigns from './campaigns.js';
import '../styles/navigation.css';
import Firebase from "firebase";
import config from "../config.js";
import Strings from '../helpers/localization.js'

class Navigation extends React.Component {
    constructor(props){
        super(props);
        if (!Firebase.apps.length) {
            Firebase.initializeApp(config);
        }
        this.state = {
            value: 0,
            campaigns: [],
            loading: true
        }
        this.dateChange = this.dateChange.bind(this)
    }
    componentDidMount(){
        let campaigns = [];
        let ref = Firebase.database().ref("campaigns/");
        ref.on("value", snapshot => {
            campaigns = snapshot.val();
            campaigns = this.parseCampaigns(campaigns)
            this.setState({
                campaigns: campaigns,
                loading: false
            })
        }, function(error) {
            console.error(error);
        });
    }
    tabChange = (event, value) => {
        console.log(event)
        this.setState({
            value: value
        })
    }
    parseCampaigns(campaigns){
        return campaigns.map((campaign, index) => {
            return {
                ...campaign,
                index: index,
                dateShow: this.formatDate(campaign.createdOn),
                duration: this.getDateDuration(campaign.createdOn)
            }
        })
    }
    formatDate(date){
        date = new Date(date);
        let month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        let datePrint = month[date.getMonth()] + " " + date.getFullYear() + ", " + date.getDate();
        return datePrint;
    }
    getDateDuration(date){
        let now = new Date();
        date = new Date(date);
        return Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) ) /(1000 * 60 * 60 * 24));
        // let diffDays = now.getDate() - date.getDate();
        // return diffDays;
    }
    dateChange (date, index){
        let campaigns = [...this.state.campaigns]
        campaigns[index]['createdOn'] = Number(date)

        this.setState({
            campaigns: this.parseCampaigns(campaigns)
        })
        let campaign = {...campaigns[index]}
        delete campaign.datePrint
        delete campaign.duration
        delete campaign.index
        Firebase.database().ref('campaigns/' + index).set(campaign);
    }
    render(){
        const panes = [
            {
                menuItem: Strings.upcoming_campaigns, render: () => <Tab.Pane>
                <Campaigns campaigns={this.state.campaigns.filter((campaign) => campaign.duration < 0)}
                dateChange={this.dateChange}/>
                </Tab.Pane>
            },
            {
                menuItem: Strings.live_campaigns, render: () => <Tab.Pane>
                <Campaigns campaigns={this.state.campaigns.filter((campaign) => campaign.duration === 0)}
                dateChange={this.dateChange}/>
                </Tab.Pane>
            },
            {
                menuItem: Strings.past_campaigns, render: () => <Tab.Pane>
                <Campaigns campaigns={this.state.campaigns.filter((campaign) => campaign.duration > 0)}
                dateChange={this.dateChange}/>
                </Tab.Pane>
            },
        ]

        return(
            <div className="navigation-container">
            {
                this.state.loading
                ?
                <Loader active inline='centered' />
                :
                <Tab menu={{ color: 'orange', secondary: true, pointing: true }} panes={panes} />
            }
            </div>
        )
    }
}
export default Navigation;
