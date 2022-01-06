import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./index.css";
import Data from "./Data.js";

const baseURL = "/azure/get-data";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loc: [],
        };
    }

    componentDidMount() {


        axios.get(baseURL)
            .then((response) => {
                //console.log(response.data)
                const locArray = response.data.map((el) => {
                    for (let i = 0; i < Data.length; i++) {
                        if (Data[i].name === el.location) {
                            //console.log("found")
                            //console.log(Data[i]);
                            return {
                                name: el.name,
                                Rname: Data[i].regionalDisplayName,
                                Plocation: Data[i].physicalLocation,
                                Ttype: el.type,
                            };
                        }
                    }
                    return {};
                });

                // If request is good...
                //console.log(response2.data.value);
                this.setState({
                    items: response.data,
                    loc: locArray,
                });
            })
            //if responce has a error...
            .catch((e) => {
                console.log("error" + e);
            });
    }

    render() {
        const { items } = this.state;
        const { loc } = this.state;
        return (
            <div className="maincard">
                <div className="card1">
                    {items.map((i) => (
                        <div key={i.name}>{i.name}</div>
                    ))}
                </div>
                <div className="card2">
                    {loc.map((e) => (
                        <div key={e.name}>
                            Display Name={e.Rname}__Physical Location={e.Plocation}__ResourceGroup/TypeOfResource={e.Ttype}.
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
