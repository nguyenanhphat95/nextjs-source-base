import React from "react"

interface IProps {
  statusCode: number
}

function Error({ statusCode }: IProps) {
  return (
    <div>
      500
    </div>
  )
}

/**
 * Server side rendering
 */
Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
