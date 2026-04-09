export const SingleUser = ({id, name, email}) => {
  return (
    <>
      {/* Mobile card view */}
      <div className='block sm:hidden border border-gray-300 p-4 rounded'>
        <div className='mb-2'><strong>ID:</strong> {id}</div>
        <div className='mb-2'><strong>Name:</strong> {name}</div>
        <div className='mb-2'><strong>Email:</strong> {email}</div>
      </div>

      {/* Desktop table row view */}
      <tr className='hidden sm:table-row'>
        <td className='border border-gray-300 p-2'>{id}</td>
        <td className='border border-gray-300 p-2'>{name}</td>
        <td className='border border-gray-300 p-2'>{email}</td>
      </tr>
    </>
  )
}
