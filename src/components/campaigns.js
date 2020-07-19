import React from 'react';
import {Table, Modal, Message} from 'semantic-ui-react';
import '../styles/campaigns.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CustomDatepicker from "./custom-datepicker";
import Strings from '../helpers/localization.js'

class Campaigns extends React.Component {
    // This Component Loads Data into the Campaign Table According to the selected category of campaign.
    // The filtered campaigns are sent via props to this component.
    constructor(props){
        super(props)
        //Initial selectedCampaign set as empty
        this.state = {selectedCampaign:{price:[]}}
    }
    //Function to open pricing Popup on Click
    showPricingModal(index) {
        this.setState({
            selectedCampaign: this.props.campaigns[index],
            showPricing: true
        })
    }
    render(){
        return (
            <div className="campaign-container">
                <Table singleLine id="table-large">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{Strings.date}</Table.HeaderCell>
                            <Table.HeaderCell>{Strings.campaign}</Table.HeaderCell>
                            <Table.HeaderCell>{Strings.view}</Table.HeaderCell>
                            <Table.HeaderCell>{Strings.actions}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {
                        this.props.campaigns.map((campaign, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    <p className="campaign-date">{campaign.dateShow}</p>
                                    <p className="campaign-duration">{Math.abs(campaign.duration) + " " + (campaign.duration > 0 ? Strings.days_ago : Strings.days_ahead)} </p>
                                </Table.Cell>
                                <Table.Cell>
                                    <img src={campaign.image_url} className="campaign-image" alt="campaign-logo"/>
                                    <div>
                                        <p className="campaign-name">{campaign.name}</p>
                                        <p className="campaign-region">{campaign.region}</p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <span className="campaign-pricing" onClick={() => this.showPricingModal(index)}>
                                        <img src="./icons/price.png" className="campaign-inline-icons" alt="campaign-pricingicon"/>
                                        {Strings.viewPricing}
                                    </span>
                                </Table.Cell>
                                <Table.Cell>
                                    <span className="campaign-csv">
                                        <img src="./icons/file.png" className="campaign-inline-icons" alt="campaign-csvicon"/>
                                        {Strings.csv}
                                    </span>
                                    <span className="campaign-report">
                                        <img src="./icons/statistics-report.png" className="campaign-inline-icons" alt="campaign-reporticon"/>
                                        {Strings.report}
                                    </span>
                                    <DatePicker
                                        selected={new Date(campaign.createdOn)}
                                        onChange={date => this.props.dateChange(date, campaign.index)}
                                        customInput={<CustomDatepicker/>}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                    </Table.Body>
                </Table>
                <Table singleLine id="table-small">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <div>{Strings.campaign}</div>
                                <div>{Strings.date}</div>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <div>{Strings.view}</div>
                                <div>{Strings.actions}</div>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {
                        this.props.campaigns.map((campaign, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    <div>
                                        <img src={campaign.image_url} className="campaign-image" alt="campaign-logo"/>
                                        <div>
                                            <p className="campaign-name">{campaign.name}</p>
                                            <p className="campaign-region">{campaign.region}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="campaign-date">{campaign.dateShow}</p>
                                        <p className="campaign-duration">{Math.abs(campaign.duration) + " " + (campaign.duration > 0 ? Strings.days_ago : Strings.days_ahead)} </p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div>
                                        <span className="campaign-pricing" onClick={() => this.showPricingModal(index)}>
                                            <img src="./icons/price.png" className="campaign-inline-icons" alt="campaign-pricingicon"/>
                                            {Strings.viewPricing}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="campaign-csv">
                                            <img src="./icons/file.png" className="campaign-inline-icons" alt="campaign-csvicon"/>
                                            {Strings.csv}
                                        </span>
                                        <span className="campaign-report">
                                            <img src="./icons/statistics-report.png" className="campaign-inline-icons" alt="campaign-reporticon"/>
                                            {Strings.report}
                                        </span>
                                        <DatePicker
                                            selected={new Date(campaign.createdOn)}
                                            onChange={date => this.props.dateChange(date, campaign.index)}
                                            customInput={<CustomDatepicker/>}
                                        />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                    </Table.Body>
                </Table>
                {
                    this.props.campaigns.length === 0
                    ?
                    <Message style={{textAlign:'center'}}><Message.Header>{Strings.no_campaigns}</Message.Header></Message>
                    :
                    null
                }
                <Modal size={"mini"} open={this.state.showPricing} onClose={() => this.setState({showPricing: false})}>
                    <Modal.Content>
                        <img src={this.state.selectedCampaign.image_url} className="campaign-pricing-image" alt="campaign-logo"/>
                        <div>
                            <p className="campaign-pricing-name">{this.state.selectedCampaign.name}</p>
                            <p className="campaign-pricing-region">{this.state.selectedCampaign.region}</p>
                        </div>
                        <p className="campaign-pricing-heading">{Strings.viewPricing}</p>
                        {
                            this.state.selectedCampaign.price.map((pricing) => (
                                <div className="campaign-pricing-price-container">
                                    <p>{pricing.name}</p>
                                    <p>{"$ " + pricing.value}</p>
                                </div>
                            ))
                        }
                        <div className="campaign-pricing-close-button" onClick={() => this.setState({showPricing: false})}>{Strings.close}</div>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}
export default Campaigns;
