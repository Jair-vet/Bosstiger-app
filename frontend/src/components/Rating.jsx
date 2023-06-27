import React from 'react'
import PropTypes from 'prop-types'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export const Rating = ({ value }) => {
  return (
    <div className='flex justify-end items-center text-md'>
        <span className='ml-1 text-yellowSpan'>
            {
                value >= 1
                ? (<FaStar />)
                : value >= 0.5 
                ? (<FaStarHalfAlt />)
                : (<FaRegStar />)
            }
        </span>
        <span className='ml-1 text-yellowSpan'>
            {
                value >= 1
                ? (<FaStar />)
                : value >= 1.5 
                ? (<FaStarHalfAlt />)
                : (<FaRegStar />)
            }
        </span>
        <span className='ml-1 text-yellowSpan'>
            {
                value >= 3
                ? (<FaStar />)
                : value >= 2.5 
                ? (<FaStarHalfAlt />)
                : (<FaRegStar />)
            }
        </span>
        <span className='ml-1 text-yellowSpan'>
            {
                value >= 4
                ? (<FaStar />)
                : value >= 3.5 
                ? (<FaStarHalfAlt />)
                : (<FaRegStar />)
            }
        </span>
        <span className='ml-1 text-yellowSpan'>
            {
                value >= 5
                ? (<FaStar />)
                : value >= 4.5 
                ? (<FaStarHalfAlt />)
                : (<FaRegStar />)
            }
        </span>
    </div>
  )
}

Rating.prototype = {
    value: PropTypes.number.isRequired
}