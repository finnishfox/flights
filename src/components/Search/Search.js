import React from "react";
import './Search.scss';

class Search extends React.Component {
    state = {searchQuery: ''};

    search = (event) => {
        event.preventDefault();
        const {searchQuerySet} = this.props;
        searchQuerySet({searchQuery: this.state.searchQuery});
    };

    handleInput = (event) => {
        if (event.keyCode === 13) {
            this.search(event);
        }
    };

    render() {
        return (
            <article className="Search">
                <h2 className="Search__title">SEARCH FLIGHT</h2>
                <form className="Search__form">
                    <label className="Search__field">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="-512.053 29 44 43"
                             className="Search__icon">
                            <g transform="translate(-512.053 29)">
                                <rect width="44"
                                      height="43"
                                      fill="none"></rect>
                                <path
                                    d="M317.717,70.708H316.25l-.55-.538a11.072,11.072,0,0,0,2.933-7.525,11.92,11.92,0,1,0-11.917,11.646,11.628,11.628,0,0,0,7.7-2.867l.55.538V73.4l9.167,8.958,2.75-2.687Zm-11,0a8.065,8.065,0,1,1,8.25-8.063A8.124,8.124,0,0,1,306.717,70.708Z"
                                    transform="translate(-289.3 -45.625)"
                                    fill="#95989A"></path>
                            </g>
                        </svg>
                        <input
                            type="text"
                            placeholder="Destination or flight #"
                            className="Search__input"
                            onChange={(event) => this.setState({searchQuery: event.target.value})}
                            onKeyDown={(event) => this.handleInput(event)}/>
                    </label>
                    <button
                        type="submit"
                        className="Search__submit-button"
                        onClick={(event) => this.search(event)}>
                        Search
                    </button>
                </form>
            </article>
        );
    }
}

export default Search;