import React from 'react';

const GridComponent = () => {
    const rows = [];
    for (let i = 0; i < 6; i++) { // create 6 rows
        const boxes = [];
        for (let j = 0; j < 5; j++) { // create 5 columns
            boxes.push(<div className="letter-box" tabIndex="0" key={j}></div>);
        }
        rows.push(<div className="row" key={i}>{boxes}</div>);
    }

    return (
        <div id="box-container">
            {rows}
        </div>
    );
};

export default GridComponent;
