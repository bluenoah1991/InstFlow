import React from 'react';

/**
 * this.props.headers = [
 *      {name: 'firstName', text: 'First Name'},
 *      {name: 'lastName', text: 'Last Name'},
 *      {name: 'username', text: 'Username'},
 *      {name: 'action', text: 'Action'},
 * ];
 * 
 * this.props.rows = [
 *      {
 *          firstName: 'Mark', 
 *          lastName: 'Otto', 
 *          username: 'makr124', 
 *          action: {type: 'button', value: 'View'}
 *      }
 * ];
 */
export var BorderedTableComponent = React.createClass({
    render: function(){
        let heads = [];
        let rows = [];

        this.props.headers.forEach(function(header, index){
            heads.push(
                <th key={index}> {header.text} </th>
            );
        });
        this.props.rows.forEach(function(row, index){
            let cells = [];
            this.props.headers.forEach(function(header, index){
                let name = header.name;
                let cell = row[name];
                if(cell == undefined){
                    cells.push(<td key={index}> </td>);
                } else if(typeof cell == 'object') {
                    switch(cell.type){
                        case 'button':
                            cells.push(
                                <td key={index}>
                                    <a className="btn blue btn-outline sbold" data-toggle="modal" href=""> {cell.value} </a>
                                </td>
                                );
                        break;
                        case 'label':
                        default:
                            cells.push(<td key={index}> {cell.value} </td>);
                        break;
                    }
                } else {
                    cells.push(<td key={index}> {cell} </td>);
                }
            });
            rows.push(
                <tr key={index}>{cells}</tr>
            );
        }.bind(this));

        return (
            <div className="table-scrollable">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            {heads}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
});
