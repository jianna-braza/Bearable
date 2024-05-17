import React, { Component } from 'react';

let QUOTES = [
    {
        line1: "Stand out from the crowd,",
        line2: "be bold and proud,",
        line3: "be yourself, say it loud!"

    },
    {
        line1: "Hello!",
        line2: "Today is another day",
        line3: "full of new possibilities!"
    },
    {
        line1: "Every small step counts!",
        line2: "Let's begin by knocking out",
        line3: "those first few tasks"
    }
]

//tutorial: https://edtech.drhafizhanif.net/react-native-tutorial-custom-javascript-splash-screen-5a62d2392d8a
function SplashMessage() {
    let quoteNum = Math.floor(Math.random() * 3);
    let quote = QUOTES[quoteNum];

    return (
        <div className="splash-background">
            <h2 className="line1">{quote.line1}</h2>
            <h2 className="line2">{quote.line2}</h2>
            <h1 className="line3">{quote.line3}</h1>
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