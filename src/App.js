import React from 'react'

import './App.scss' 
import PostList from './components/PostList'

class App extends React.Component {

    state = {
        page: 1,
    }

    handleNextPage = () => {
        this.setState({
            page: this.state.page + 1,
        })
    }

    handlePreviousPage = () => {
        this.setState({
            page: this.state.page - 1,
        })
    }

    render() {
        const { page } = this.state
        return (
            <div className="app">
                <div className="buttons">
                    <button
                        type="button"
                        onClick={this.handlePreviousPage}>
                        Previous Page
                    </button>
                    <div>{page}</div>
                    <button
                        type="button"
                        onClick={this.handleNextPage}>
                        Next Page
                    </button>
                </div>
                <PostList page={page} />
            </div>
        )
    }
}

export default App
