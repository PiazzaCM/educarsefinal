import React from 'react'

const LoadingButton = () => {
    return (
        <>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span className="visually-hidden">Loading...</span>
        </>
    )
}

export default LoadingButton