import React, { Component } from 'react';


function SplashMessage() {
    return (
        <div className="splash-background">
            <h2 className="welcome-to">Stand out from the crowd</h2>
            <h2 className="the-header">be bold and proud</h2>
            <h1 className="aquapod-header">be yourself, say it loud!</h1>
        </div>
    );
}

export default function withSplashScreen(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
            };
        }

        async componentDidMount() {
            try {
                // Put here your await requests/ API requests
                setTimeout(() => {
                    this.setState({
                        loading: false,
                    });
                }, 3000)
            } catch (err) {
                console.log(err);
                this.setState({
                    loading: false,
                });
            }
        }

        render() {
            // while checking user session, show "loading" message
            if (this.state.loading) return SplashMessage();

            // otherwise, show the desired route
            return <WrappedComponent {...this.props} />;
        }
    };
}