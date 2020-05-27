import React from 'react'
import { graphql, Link } from 'gatsby'
import css from 'styled-jsx/css'
import Layout from '../theme/Layout'

const topicAsideWidth = '6.4rem'

export const Topic: React.FC<{ topic: TopicProps }> = ({ children, topic }) => {
  return (
    <div className="topic">
      <header>
        <div className="icon">
          <img src={topic.icon.childImageSharp.original.src} alt={topic.name} />
        </div>
        <span>{topic.name}</span>
      </header>
      <div className="posts">
        {children}
      </div>
      <style jsx>{`
        .topic {
          break-inside: avoid;
          margin-bottom: 5rem;
        }
        header {
          background: #EDF2F6;
          border-top: 1px solid ${topic.color};
          display: flex;
          align-items: center;
          padding: 1rem 0;
        }
        .icon {
          flex: 0 0 ${topicAsideWidth};
        }

        img {
          width: 2rem;
          height: 2rem;
          object-fit: cover;
          margin: 0 auto;
          display: block;
        }
        span {
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

const linkCSS = css.resolve`
  a {
    text-decoration: none;
    color: black;
    font-weight: normal;
    line-height: 1.3;
  }
  a:hover {
    border-bottom: 1px solid black;
  }
`

const Post: React.FC<{ date: string, to: string, title: string }> = ({ date, to, title }) => (
  <div className="post">
    <span className="date">{date}</span>
    <h4 className="title">
      <Link to={to} className={linkCSS.className}>{title}</Link>
    </h4>
    {linkCSS.styles}
    <style jsx>{`
      .post {
        display: flex;
        margin: 2rem 0;
      }
      .date {
        font-family: 'IBM Plex Mono';
        font-size: 1.2rem;
        color: #afafaf;
        flex: 0 0 ${topicAsideWidth};
        text-align: center;
        line-height: 1.8;
      }
      .title {
        margin: 0;
      }
    `}</style>
  </div>
)

const IndexPage: React.FC<IndexProps> = ({ data }) => {
  const { topics, posts } = data
  return (
    <Layout>
      <div className="topics">
        {topics.nodes.map(topic => (
          <Topic key={topic.id} topic={topic}>
              <ul>
            {posts.nodes.filter(post => post.topic === topic.name).map(post => (
                <li key={post.id}>
                  <Post to={post.slug} title={post.title} date={post.date} />
                </li>
            ))}
              </ul>
          </Topic>
        ))}
      </div>
      <style jsx>{`
        .topics {
          column-width: 40rem;
          column-gap: 2rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style-type: none;
        }
      `}</style>
    </Layout>
  )
}

export default IndexPage

export const homeQuery = graphql`
  query HomePageQuery {
    topics: allTopicsYaml {
      nodes {
        id
        name
        icon {
          childImageSharp {
            original {
              src
            }
          }
        }
        color
      }
    }
    posts: allBlogPost(sort: {fields: date, order: DESC}) {
      nodes {
        id
        slug
        title
        topic
        date(formatString: "YYYY-MM")
      }
    }
  }
`
