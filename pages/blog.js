import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
      <>
      <Head>
        <title>siteTitle</title>
      </Head>
      <section>
        <h2>Projects</h2>
        <ul>
        <li>
            <a href="https://desica.uk/" target="_blank">
              Desica
            </a>
            <br />
            <small>
              Ongoing
            </small>
          </li>
          <li>
            <a href="https://mac.now.sh/" target="_blank">
              MacOS Website Clone
            </a>
            <br />
            <small>
              2021
            </small>
          </li>
        </ul>
      </section>
      <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}