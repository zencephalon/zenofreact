import { Link, graphql } from 'gatsby';
import { formatPostDate, formatReadingTime } from '../utils/helpers';

import Bio from '../components/Bio';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Panel from '../components/Panel';
import React from 'react';
import SEO from '../components/SEO';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';

class BlogIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const langKey = this.props.pageContext.langKey;

    const posts = get(this, 'props.data.allSitePage.edges');

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        <aside>
          <Bio />
        </aside>
        <main>
          {posts.map(({ node }) => {
            const title =
              get(node, 'context.frontmatter.title') || node.context.slug;
            return (
              <article key={node.context.slug}>
                <header>
                  <h3
                    style={{
                      fontFamily: 'Vollkorn, sans-serif',
                      fontSize: rhythm(1),
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link
                      style={{ boxShadow: 'none' }}
                      to={node.context.slug}
                      rel="bookmark"
                    >
                      {title}
                    </Link>
                  </h3>
                  <small>
                    {formatPostDate(node.context.frontmatter.date, langKey)}
                    {` • ${formatReadingTime(node.context.timeToRead)}`}
                  </small>
                </header>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.context.frontmatter.spoiler,
                  }}
                />
              </article>
            );
          })}
        </main>
        <Footer />
      </Layout>
    );
  }
}

export default BlogIndexTemplate;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allSitePage(
      sort: { fields: [context___frontmatter___date], order: DESC }
      filter: { context: { isPost: { eq: true } } }
    ) {
      edges {
        node {
          context {
            slug
            frontmatter {
              date
              title
              spoiler
            }
            timeToRead
          }
        }
      }
    }
  }
`;
