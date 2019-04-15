import React from "react";
import './Search.scss';

class Search extends React.Component {
    state = {searchQuery:''};

    search = (event)=>{
        event.preventDefault();
        const {searchQuerySet} = this.props;
        searchQuerySet({searchQuery:this.state.searchQuery});
    };

    render() {
        return (
            <article className="Search">
                <h2 className="Search__title">SEARCH FLIGHT</h2>
                <form className="Search__form">
                    <label className="Search__field">
                        <input
                            type="text"
                            placeholder="Destination or flight #"
                            className="Search__input"
                        onChange={(event)=>this.setState({searchQuery:event.target.value})}/>
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