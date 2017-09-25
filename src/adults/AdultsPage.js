import React, { Component } from 'react';
import AdultsViewer from './AdultsViewer';
import { Link } from 'react-router-dom';

class AdultsPage extends Component {
    render() {
        return (
            <div>
                <h1>Family adults list</h1>
                <AdultsViewer/>
                <Link to="/household/">
                    <button>
                        back
                    </button>
                </Link>
            </div>
        );
    }
}

export default AdultsPage;