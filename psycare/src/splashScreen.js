import React, { Component } from 'react';

function SplashMessage() {
  return (
    <div className="splash-background">
      <h2 className="welcome-to">Welcome</h2>
      <h2 className="the-header">to</h2>
      <h1 className="aquapod-header">Psycare</h1>
    </div>

  )

}

export default function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        fadeOut: false,
      };
      this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    }

    async componentDidMount() {
      // await request
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 3000);
    }

    handleAnimationEnd(event) {
      if (!this.animationEndHandled && event.target.classList.contains('splash')) {
        this.animationEndHandled = true;
        this.setState({
          fadeOut: false,
        });
      }
    }

    render() {
      const { loading, fadeOut } = this.state;

      return (
        <div className={`splash-container ${fadeOut ? 'fade-out' : 'fade-in'}`}>
          <div className={`splash-background ${fadeOut ? 'fade-out' : 'fade-in'}`}>
            <h2 className="welcome-to">Welcome</h2>
            <h2 className="the-header">to</h2>
            <h1 className="aquapod-header">Psycare</h1>
          </div>
          <div className={`splash ${fadeOut ? 'fade-out' : 'fade-in'}`} onAnimationEnd={this.handleAnimationEnd}>
            {!fadeOut && (
              <div>
                <WrappedComponent {...this.props} />
              </div>
            )}
          </div>
        </div>
      );
    }
  };
}