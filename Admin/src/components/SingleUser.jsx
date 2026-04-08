import React from 'react'

export const SingleUser = ({key,name,email}) => {
  return (
    <tr>
        <td>{key}</td>
        <td>{name}</td>
        <td>{email}</td>
    </tr>
  )
}
