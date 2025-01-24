import React from 'react'

interface LoadingProps {
    showed: boolean;
}

export const Loading = ({ showed }: LoadingProps) => {
    if (!showed) return null;
  return (
    <div id="loadingModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <ul className="wave-menu">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
  </div>
  )
}
