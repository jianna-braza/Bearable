import React, { Component, useEffect, useState } from 'react';

function SplashMessage() {
    return (
        <div className="splash-background">
            <h2 className="welcome-to">Welcome to</h2>
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
            console.log("rendering timeout")
            // await request
            setTimeout(() => {
                this.setState({
                    loading: false,
                });
            }, 3000);
        }

        handleAnimationEnd(event) {
            console.log("rendering end")
            if (!this.animationEndHandled && event.target.classList.contains('splash')) {
                this.animationEndHandled = true;
                this.setState({
                    fadeOut: false,
                });
            }
        }

        render() {
            const { loading, fadeOut } = this.state;

            console.log("rendering splash")
            return (
                <div className={`splash-container ${fadeOut ? 'fade-out' : 'fade-in'}`}>
                    <SplashMessage />
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