import React, { Component } from "react";

class ListGroupHeader extends Component {
    raiseSort = (path) => {
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path)
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn);
    };

    renderSortIcon = (column) => {
        const { sortColumn } = this.props;
        console.log("column",column )
        console.log("sortColumn",sortColumn)

        if (column.path !== sortColumn.path) return null;
        if (sortColumn.order === "asc") return <i className="fa fa-sort-down "  />;
        return <i className="fa fa-sort-up"></i>;    
           
    };

    render() {
        return (
            <div className="row bg-secondary text-white ml-4 " >
                {this.props.columns.map((column) => (
                <div
                    className={this.getColumnClasses(column.width)}
                    key={column.path || column.key}
                    onClick={() => this.raiseSort(column.path)}
                >
                    {column.label} {this.renderSortIcon(column)}
                </div>
                ))}
            </div>
        );
    }

    getColumnClasses(width) {
        let classes = "clickable col-";
        classes += width;
        return classes;
    }
}

export default ListGroupHeader;