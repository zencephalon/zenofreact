import React from 'react';
import profilePic from '../assets/profile-pic.jpg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
        }}
      >
        <img
          src={profilePic}
          alt={`Matthew Bunday`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p style={{ maxWidth: rhythm(24) }}>
          A React and Gatsby blog by{' '}
          <a href="https://zencephalon.com">Matthew Bunday</a>. <br />
          Seeking the Zen of React and Gatsby.
        </p>
      </div>
    );
  }
}

export default Bio;
