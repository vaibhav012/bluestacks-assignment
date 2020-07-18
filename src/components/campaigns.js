import React from 'react';
import {Table, Modal, Message} from 'semantic-ui-react';
import '../styles/campaigns.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CustomDatepicker from "./custom-datepicker";

class Campaigns extends React.Component {
    constructor(props){
        super(props)
        this.inputElement = []
        this.state = {selectedCampaign:{price:[]}}
    }
    componentDidMount(){
    }
    shouldComponentUpdate(props, state){
        props.campaigns.forEach((item, i) => {
            this.inputElement[i] = React.createRef();
        });
        return true;
    }
    showPricingModal(index) {
        this.setState({
            selectedCampaign: this.props.campaigns[index],
            showPricing: true
        })
    }
    render(){
        return (
            <div className="campaign-container">
                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>DATE</Table.HeaderCell>
                            <Table.HeaderCell>CAMPAIGN</Table.HeaderCell>
                            <Table.HeaderCell>VIEW</Table.HeaderCell>
                            <Table.HeaderCell>ACTIONS</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {
                        this.props.campaigns.map((campaign, index) => (
                            <Table.Row key={index}>
                                <Table.Cell unstackable>
                                    <p className="campaign-date">{campaign.dateShow}</p>
                                    <p className="campaign-duration">{Math.abs(campaign.duration) + " " + (campaign.duration > 0 ? "Days Ago" : "Days Ahead")} </p>
                                </Table.Cell>
                                <Table.Cell unstackable>
                                    <img src={campaign.image_url} className="campaign-image" alt="campaign-logo"/>
                                    <div>
                                        <p className="campaign-name">{campaign.name}</p>
                                        <p className="campaign-region">{campaign.region}</p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell unstackable>
                                    <span className="campaign-pricing" onClick={() => this.showPricingModal(index)}>
                                        <img src="./price.png" className="campaign-inline-icons" alt="campaign-pricingicon"/>
                                        View Pricing
                                    </span>
                                </Table.Cell>
                                <Table.Cell stackable>
                                    <span className="campaign-csv">
                                        <img src="./file.png" className="campaign-inline-icons" alt="campaign-csvicon"/>
                                        CSV
                                    </span>
                                    <span className="campaign-report">
                                        <img src="./statistics-report.png" className="campaign-inline-icons" alt="campaign-reporticon"/>
                                        Report
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
                {
                    this.props.campaigns.length === 0
                    ?
                    <Message style={{textAlign:'center'}}><Message.Header>No campaigns in this category! CHECK BACK LATER</Message.Header></Message>
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
                        <p className="campaign-pricing-heading">Pricing</p>
                        {
                            this.state.selectedCampaign.price.map((pricing) => (
                                <div className="campaign-pricing-price-container">
                                    <p>{pricing.name}</p>
                                    <p>{"$ " + pricing.value}</p>
                                </div>
                            ))
                        }
                        <div className="campaign-pricing-close-button" onClick={() => this.setState({showPricing: false})}>CLOSE</div>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}
export default Campaigns;
