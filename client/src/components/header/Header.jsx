import React from 'react'
import "./header.css"

export default function Header() {
  return (
    <div className='header'>
        <div className='headerTitles'>
          <span className='headerTitleSm'>News</span>
          <span className='headerTitleLg'>Blog</span>
        </div>
        <img className='headerImg' src='https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' alt=''/>
        
    </div>
  )
}
