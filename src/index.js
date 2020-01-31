import React, { Component } from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      repos: [],
      image: ""
    };
  }

  handleEvent = e => this.setState({ username: e.target.value });

  repoList() {
    return this.state.repos.map(repo => {
      return (
        <a
          href={repo.svn_url}
          target="_blank"
          rel="noopener noreferrer"
          className="list-group-item list-group-item-action"
        >
          {repo.name}
        </a>
      );
    });
  }
  async fetchUsers() {
    let users = await fetch(
      `https://api.github.com/users/${this.state.username}/repos`
    );
    let userData = await users.json();

    await this.setState({
      repos: userData,
      image: userData[0].owner.avatar_url
    });
  }
  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };
  handleSubmit = e => {
    e.preventDefault();

    this.fetchUsers();
    this.setState({ username: "" });
  };

  render() {
    return (
      <div className="container mt-5">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="Username"
              placeholder="Enter github username"
              value={this.state.username}
              onChange={this.handleEvent}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onKeyPress={this.handleKeyPress}
          >
            Submit
          </button>
        </form>
        {this.state.image ? (
          <figure className="figure mt-5">
            <img
              src={this.state.image}
              style={{ width: "15rem" }}
              className="figure-img img-fluid rounded"
              alt="github profile"
            />
          </figure>
        ) : (
          " "
        )}

        <div className="list-group mt-5 mb-5">{this.repoList()}</div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
