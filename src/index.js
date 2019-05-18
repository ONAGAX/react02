import React from "react";
import { render } from "react-dom";
import axios from "axios";
import { Search } from "./components/Search";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  renderImageList(list) {
    const imageList = list.map(url => {
      return (
        <li className="item">
          <img className="image" src={url} />
        </li>
      );
    });
    return imageList;
  }

  render() {
    return (
      <div>
        <Search search={this.giphyApi} />
        <ul>{this.renderImageList(this.state.gifUrlList)}</ul>
      </div>
    );
  }

  giphyApi = target => {
    const key = "bgVLYS1CzOZtGSXZkp4D6eONtJlSTCmy";
    const search = target;
    const limit = 10;

    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    axios.get(url).then(res => {
      const data = res.data.data;
      const imageUrlList = data.map(item => item.images.downsized.url);

      this.setState({ gifUrlList: imageUrlList });
    });
  };
}

render(<App />, document.getElementById("root"));
