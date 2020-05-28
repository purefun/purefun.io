import React from 'react'


const htmlOpen = '<html>'
const htmlClose = '</html>'

const NotFoundContainer = () => (
  <pre>
    <div>
      {htmlOpen}<span>404</span>{htmlClose}
    </div>
    <style jsx>{`
      pre {
        font-family: Operator, Menlo, Consolas, 'New Courier';
        min-height: calc(100vh - 200px);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        text-align: center;
        margin: 0;
      }
      span {
        display: block;
        font-size: 10rem;
      }
    `}</style>
  </pre>
)

export default NotFoundContainer
