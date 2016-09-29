import React, {Component, PropTypes} from 'react';

class TableComponent extends Component{
    render(){
        let columns = [];
        let rows = [];

        this.props.columns.forEach(function(column, index){
            columns.push(
                <th key={index}> {column.text} </th>
            );
        });

        this.props.data.forEach(function(item, index){
            let cells = [];
            this.props.columns.forEach(function(column, index){
                let name = column.name;
                let val = item[name];
                cells.push(<td key={index}> {val} </td>);
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
                            {columns}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

TableComponent.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })),
    data: PropTypes.array
};

export {TableComponent};