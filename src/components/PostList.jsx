import React from 'react'
import { uniq } from 'lodash'
import PropTypes from 'prop-types'

import PostListItem from './PostListItem'

import "./PostList.scss"

export default class PostList extends React.Component {

    static propTypes = {
        page: PropTypes.number.isRequired,
        postsPerPage: PropTypes.number.isRequired,
    }

    static defaultProps = {
        page: 1,
        postsPerPage: 15,
    }

    state = {
        posts: [],
        usernames: {},
        page: 1,
    }

    componentDidMount() {
        this.loadPosts()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.page !== this.props.page) {
            this.loadPosts()
        }
    }

    loadPosts = () => {
        // Fetch all posts
        fetch('http://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => {
                console.log(json)

                const { page, postsPerPage } = this.props

                // Select the posts for the current page, because jsonplaceholder doesn't
                // support pagination on its endpoints. Most APIs would provide paginated
                // results, so we're simulating that here ourselves.
                const start = postsPerPage * (page - 1)
                const posts = start < 0 ? [] : json.slice(start, Math.min(start + postsPerPage, json.length))

                // Filter for unique user IDs
                const userIds = uniq(posts.map((post) => post.userId))
                // Clone usernames cache so we don't modify the `state` object
                const usernames = { ...this.state.usernames }

                // Wait for all usernames to be fetched before continuing
                Promise.all(
                    // If a username exists in the list, just use that
                    // otherwise, fetch the data for the userId and extract username
                    userIds.map((userId) => usernames[userId]
                        ? Promise.resolve(usernames[userId])
                        : fetch(`http://jsonplaceholder.typicode.com/users/${userId}/`)
                            .then((response) => response.json())
                            .then((json) => {
                                usernames[userId] = json.username
                            })
                    )
                ).then(() => {
                    // Once all usernames are fetched, update state
                    this.setState({
                        posts,
                        usernames,
                    })
                })
            })
    }

    render() {
        const { posts, usernames } = this.state

        const postList = posts.map((post) => (
            <PostListItem
                key={post.id}
                userId={post.userId}
                title={post.title}
                body={post.body}
                usernames={usernames}
                />
        ))

        return (
            <div className="post-list">
                {postList}
            </div>
        )
    }
}
