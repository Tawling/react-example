import React from 'react'
import PropTypes from 'prop-types'
import classNameGenerator from 'classnames'

import './PostListItem.scss'

export default class PostListItem extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired,
        usernames: PropTypes.object.isRequired,
    }

    static defaultProps = {
        usernames: {},
    }

    state = {
        isCollapsed: true,
    }

    handleClick = () => {
        this.setState({
            isCollapsed: !this.state.isCollapsed,
        })
    }
    
    render() {
        const { title, body, userId, usernames } = this.props
        const { isCollapsed } = this.state

        const className = classNameGenerator("post-list-item", {
            collapsed: isCollapsed,
        })

        return (
            <div className={className}>
                <div className="post-username">
                    {usernames[userId]}
                </div>
                <div className="post-title" onClick={this.handleClick}>
                    {title}
                </div>
                {isCollapsed ? null : <div className="post-body">{body}</div>}
            </div>
        )
    }
}