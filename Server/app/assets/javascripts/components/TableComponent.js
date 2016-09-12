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
                    cells.push(<td> </td>);
                } else if(typeof cell == 'object') {
                    switch(cell.type){
                        case 'button':
                            cells.push(<a class="btn blue btn-outline sbold" data-toggle="modal" href="javascript:;"> {cell.value} </a>);
                        break;
                        case 'label':
                        default:
                            cells.push(<td> {cell.value} </td>);
                        break;
                    }
                } else {
                    cells.push(<td> {cell} </td>);
                }
            });
            rows.push(
                <tr>{cells}</tr>
            );
        }.bind(this));


        return (
            <div class="table-scrollable">
                <table class="table table-bordered table-hover">
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
