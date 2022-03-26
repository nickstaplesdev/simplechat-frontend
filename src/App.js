import React from 'react';
import  get  from 'lodash/get';
import Table from 'react-bootstrap/Table';
import forEach from 'lodash/forEach';

 class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        messages: {}
      };
  }

  componentDidMount() {
    document.title = "SimpleChat";
    fetch('http://localhost:3333/')
    .then(results => {
      return results.json();
    }).then(data => {
        console.log(data);
        const messages = data;
        this.setState({
          messages: messages,
        });
    });
  }

  getTableBody() {
        let tableData = [];
        forEach(this.state.messages, (data, key) => {
            tableData.push(
                <tr key={key}>
                    <td>
                            <img width="50" height="50" src={data.authorIcon} />
                    </td>
                    <td>
                            {data.authorName}
                    </td>
                    <td>
                             {data.message}
                    </td>
                </tr>
            );
    });
        return tableData;
    }

  getTable() {
        return (
            <Table>
             <thead>
                <tr>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Message</th>
                </tr>
             </thead>
             <tbody>
                 {this.getTableBody()}
             </tbody>
            </Table>
        );
    }
	
   onSubmit(e) {
        e.preventDefault();
        var newmessage = this.message.value;
		var addmessage = {
		"id": "333",
		"created": "2015-05-22T14:56:29.000Z",
		"timestamp": "2015-05-22T14:56:28.000Z",
		"message": newmessage,
		"authorName": "You",
		"authorIcon": "https://batelle.com/wp-content/uploads/2021/07/cropped-batelle-fav-1-270x270.png",
		"authorID": "3",
		
		};
		var oldmessages = this.state.messages;
		oldmessages.push(addmessage);
		this.setState({messages: oldmessages});
        console.log(this.state.messages);
    }

  render() {

    return (
      <div>
        <h1>SimpleChat</h1>
        <div className = "messages_table">
        {this.getTable()}
      </div>
		<form className="form-horizontal">
                <input type="text" placeholder="Type new chat message..." className="form-control" ref={(c) => this.message = c} name="message" />
		</form>
        <button type="button" onClick={this.onSubmit.bind(this)} className="btn">Send</button>
    </div>
    );
  }
}

export default App;