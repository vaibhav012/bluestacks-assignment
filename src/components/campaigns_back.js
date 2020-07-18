import React from 'react';
import {Table, Input} from 'semantic-ui-react';
import '../styles/campaigns.css';

function Campaigns(props) {
    let inputElement = []
    let handleClick = function (event, data, index) {
        console.log(index)
        console.log(inputElement)
        // event.inputElement.click();
        inputElement[index].click()
    }

    props.campaigns.forEach((item, i) => {
        inputElement[i] = React.createRef();
    });


  return (
      <div className="campaign-container">
      <Table celled>
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
            props.campaigns.map((campaign, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <p className="campaign-date">{campaign.dateShow}</p>
                    <p className="campaign-duration">{campaign.duration} Days Ago</p>
                  </Table.Cell>
                  <Table.Cell>
                    <img src={campaign.image_url} className="campaign-image" alt="campaign-logo"/>
                    <div>
                      <p className="campaign-date">{campaign.name}</p>
                      <p className="campaign-duration">{campaign.region}</p>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span>
                        <img src="./price.png" className="campaign-inline-icons" alt="campaign-pricingicon"/>
                        View Pricing
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>
                        <img src="./file.png" className="campaign-inline-icons" alt="campaign-csvicon"/>
                        CSV
                    </span>
                    <span>
                        <img src="./statistics-report.png" className="campaign-inline-icons" alt="campaign-reporticon"/>
                        Report
                    </span>
                    <span onClick={(e, data) => handleClick(e, data, index)} name={index}>
                        <img src="./calendar.png" className="campaign-inline-icons" alt="campaign-dateicon"/>
                        <Input type="date" style={{display:''}} focus placeholder='' ref={inputElement[index]}/>
                        Schedule Again
                    </span>
                  </Table.Cell>
                </Table.Row>
            ))
        }
        </Table.Body>
  </Table>
      </div>
  )
}

export default Campaigns;
