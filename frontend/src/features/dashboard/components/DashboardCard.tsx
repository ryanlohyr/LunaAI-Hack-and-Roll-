import React from 'react'

type Props = {
    components: React.ReactNode;
}

const DashboardCard = (props: Props) => {
  return (
    <div className='border-2 border-gray-200 rounded-3xl px-6 py-4 shadow-sm'>
        {props.components}
    </div>
  )
}

export default DashboardCard