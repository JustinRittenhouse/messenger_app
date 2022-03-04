import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export const Message = ( props ) =>
{
    const m = props.message
    return (
        <li className="list-group-item">
            <div>
                <p>{m.body}</p>
                <span className="float-right">
                    <small>
                        {moment(m.timeCreated.toDate()).fromNow()}
                    </small>
                </span>
            </div>
            <div>
                <cite> &mdash; { `${ m.user.name }`}</cite>
            </div>
        </li>
    )
}
