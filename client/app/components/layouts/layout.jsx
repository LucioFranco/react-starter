import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

export default class Layout extends Component {
  render() {
    return(
      <body>
        <main>
          <RouteHandler {...this.props} />
        </main>
      </body>
    );
  }
}
