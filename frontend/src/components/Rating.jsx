import React from 'react'
import PropTypes from 'prop-types'

export const Rating = ({ value }) => {
  return (
    <div className='text-end text-sm'>
        <span className='ml-1 text-yellowSpan '>
            <i className={
                value >= 1
                ? 'fas fa-star'
                : value >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
            ></i>
        </span>
        <span className='ml-1 text-yellowSpan'>
            <i className={
                value >= 2 
                ? 'fas fa-star' 
                : value >= 1.5 
                ? 'fas fa-star-half-alt' 
                : 'far fa-star'
                }
            ></i>
        </span>
        <span className='ml-1 text-yellowSpan'>
            <i className={
                value >= 3 
                ? 'fas fa-star' 
                : value >= 2.5 
                ? 'fas fa-star-half-alt' 
                : 'far fa-star'
                }
            ></i>
        </span>
        <span className='ml-1 text-yellowSpan'>
            <i className={
                value >= 4 
                ? 'fas fa-star' 
                : value >= 3.5 
                ? 'fas fa-star-half-alt' 
                : 'far fa-star'
                }
            ></i>
        </span>
        <span className='ml-1 text-yellowSpan'>
            <i className={
                value >= 5 
                ? 'fas fa-star' 
                : value >= 4.5 
                ? 'fas fa-star-half-alt' 
                : 'far fa-star'
                }
            ></i>
        </span>
    </div>
  )
}

Rating.prototype = {
    value: PropTypes.number.isRequired
}