import React, { Component, useEffect, useState } from 'react';

function SplashMessage() {
    return (
        <div className="splash-background">
            <h2 className="welcome-to">Welcome to</h2>
            <h1 className="psycare-header">Psycare</h1>
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