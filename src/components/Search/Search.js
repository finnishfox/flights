import React from "react";
import './Search.scss';

class Search extends React.Component {
    render() {
        return (
            <article className="Search">
                <h2 className="Search__title">SEARCH FLIGHT</h2>
                <form className="Search__form">
                    <label className="Search__field">
                        <input
                            type="text"
                            placeholder="Destination or flight #"
                            className="Search__input"/>
                    </label>
                    <button
                        type="submit"
                        className="Search__submit-button">
                        Search
                    </button>
                </form>
            </article>
        );
    }
}

export default Search;