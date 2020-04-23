import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Renders static text received from a query. Supports markdown
 * Props:
 * query - query string to fetch information
 */

type Props = {
  query: any;
};

const StaticBlock: React.FC<Props> = props => {
  const [state, setState] = useState({ info: '' });

  useEffect(() => {
    sendQuery();
  }, []);

  const sendQuery = () => {
    fetch(props.query)
      .then(res => res.json())
      .then(res => setState({ info: res.text }));
  };

  return (
    <div>
      <ReactMarkdown source={state.info} />
    </div>
  );
};

export default StaticBlock;
